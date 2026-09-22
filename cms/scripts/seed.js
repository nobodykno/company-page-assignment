'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const { categories, authors, articles, global, about } = require('../data/data.json');

async function seedExampleApp() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up the template...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      'Seed data has already been imported. We cannot reimport unless you clear your database first.'
    );
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats['size'];
  return fileSizeInBytes;
}

function getFileData(fileName) {
  const filePath = path.join('data', 'uploads', fileName);
  // Parse the file metadata
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry }) {
  try {
    return await strapi
      .documents(`api::${model}.${model}`)
      .create({
        data: entry,
        status: 'published',
      });
  } catch (error) {
    console.error(`Failed to create ${model}:`, error);
    throw error;
  }
}

async function checkFileExistsBeforeUpload(files) {
  const existingFiles = [];
  const uploadedFiles = [];
  const filesCopy = [...files];

  for (const fileName of filesCopy) {
    // Check if the file already exists in Strapi
    const fileWhereName = await strapi.query('plugin::upload.file').findOne({
      where: {
        name: fileName.replace(/\..*$/, ''),
      },
    });

    if (fileWhereName) {
      // File exists, don't upload it
      existingFiles.push(fileWhereName);
    } else {
      // File doesn't exist, upload it
      const fileData = getFileData(fileName);
      const fileNameNoExtension = fileName.split('.').shift();
      const [file] = await uploadFile(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }
  const allFiles = [...existingFiles, ...uploadedFiles];
  // If only one file then return only that file
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

async function updateBlocks(blocks) {
  const updatedBlocks = [];
  for (const block of blocks) {
    if (block.__component === 'shared.media') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.file]);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file name on the block with the actual file
      blockCopy.file = uploadedFiles;
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'shared.slider') {
      // Get files already uploaded to Strapi or upload new files
      const existingAndUploadedFiles = await checkFileExistsBeforeUpload(block.files);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file names on the block with the actual files
      blockCopy.files = existingAndUploadedFiles;
      // Push the updated block
      updatedBlocks.push(blockCopy);
    } else {
      // Just push the block as is
      updatedBlocks.push(block);
    }
  }

  return updatedBlocks;
}

async function importArticles() {
  for (const article of articles) {
    const cover = await checkFileExistsBeforeUpload([`${article.slug}.jpg`]);
    const updatedBlocks = await updateBlocks(article.blocks);

    await createEntry({
      model: 'article',
      entry: {
        ...article,
        cover,
        blocks: updatedBlocks,
        // Make sure it's not a draft
        publishedAt: Date.now(),
      },
    });
  }
}

async function importGlobal() {
  const favicon = await checkFileExistsBeforeUpload(['favicon.png']);
  const shareImage = await checkFileExistsBeforeUpload(['default-image.png']);
  return createEntry({
    model: 'global',
    entry: {
      ...global,
      favicon,
      // Make sure it's not a draft
      publishedAt: Date.now(),
      defaultSeo: {
        ...global.defaultSeo,
        shareImage,
      },
    },
  });
}

async function importAbout() {
  const updatedBlocks = await updateBlocks(about.blocks);

  await createEntry({
    model: 'about',
    entry: {
      ...about,
      blocks: updatedBlocks,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    },
  });
}


async function importBlogPosts() {
  const blogPosts = [
    {
      title: 'Getting Started with Modern Web Development',
      slug: 'modern-web',
      author: 'John Carter',
      date: '23/12/2026',
      content: `Modern web development has changed significantly with the introduction of powerful frameworks, reusable components, and improved development tools. Businesses can now build websites and web applications that are faster, more responsive, accessible, and easier to maintain.

A successful modern website starts with a strong foundation. Developers need to consider performance, responsive design, accessibility, security, and user experience from the beginning. Technologies such as React, Next.js, TypeScript, and modern CSS frameworks provide developers with the tools needed to create reliable digital experiences.

Another important aspect of modern development is maintainability. Writing reusable components and keeping business logic separate from presentation logic makes applications easier to update and scale.

Whether you are building a small business website or a large enterprise application, following modern development practices can help create a better experience for both users and developers.`,
      image: 'web_0e43d31241.jpg',
    },

    {
      title: 'Why Businesses Need a Strong Digital Presence',
      slug: 'why-businesses-need-strong-digital-presence',
      author: 'Sarah Mitchell',
      date: '24/12/2026',
      content: `A strong digital presence has become an essential part of running a successful business. Customers increasingly use search engines, websites, social media, and online reviews to discover and evaluate companies before making a decision.

A professional website provides businesses with a central place to communicate their services, values, and expertise. It also allows customers to learn about products, contact the business, and understand what makes the company different from its competitors.

However, having a website alone is not enough. Businesses should focus on providing useful content, maintaining consistent branding, optimizing performance, and making their websites accessible across different devices.

A well-planned digital strategy can help businesses reach new audiences, improve customer trust, and create opportunities for long-term growth.`,
      image: '0x0_cec8535c60.webp',
    },

    {
      title: 'Building Better User Experiences with UI/UX Design',
      slug: 'building-better-user-experiences-ui-ux',
      author: 'Emily Johnson',
      date: '24/12/2026',
      content: `UI and UX design play an important role in how people interact with digital products. While visual design focuses on how an interface looks, user experience focuses on how easily and effectively users can accomplish their goals.

Good design starts with understanding the target audience. Designers need to identify user needs, expectations, challenges, and common behaviors before creating an interface. This information can then be used to create simple navigation, clear layouts, and intuitive interactions.

Consistency is another important part of good UI design. Using consistent typography, spacing, colors, buttons, and components helps users understand how a product works.

A successful design should not only look attractive but should also be accessible, responsive, and easy to use. When businesses invest in good UI/UX design, they can improve customer satisfaction and create stronger digital products.`,
      image: 'cyberblog_4383ec0614.webp',
    },

    {
      title: 'The Benefits of Cloud Technology for Businesses',
      slug: 'benefits-of-cloud-technology-for-businesses',
      author: 'Michael Anderson',
      date: '26/12/2026',
      content: `Cloud technology has transformed the way businesses build, deploy, and manage their digital applications. Instead of relying entirely on physical infrastructure, companies can use cloud platforms to access computing resources when they need them.

One of the biggest benefits of cloud technology is scalability. Businesses can increase or decrease resources based on demand without making significant changes to their physical infrastructure.

Cloud platforms can also improve collaboration by allowing teams to access applications and data from different locations. This is particularly useful for distributed teams and organizations that operate across multiple regions.

When implemented correctly, cloud technology can help businesses improve flexibility, simplify infrastructure management, and support digital growth.`,
      image: 'uiux_8d70151c30.jpeg',
    },

    {
      title: 'How APIs Connect Modern Applications',
      slug: 'ow-apis-connect-modern-applications',
      author: 'David Wilson',
      date: '26/12/2026',
      content: `Application Programming Interfaces, commonly known as APIs, allow different software systems to communicate with each other. They are an important part of modern application architecture and are commonly used to connect frontend applications with backend services.

For example, a web application may request customer information from a backend API. The API processes the request, communicates with a database, and returns the required information to the frontend.

Well-designed APIs make applications easier to maintain and integrate with other systems. They can also allow different teams to work independently on frontend and backend applications.

Modern applications often use REST APIs, GraphQL, or other API technologies depending on their requirements. Choosing the right approach and designing clear API contracts can make applications more reliable and scalable.`,
      image: 'web_0e43d31241.jpg',
    },
  ];

  for (const blog of blogPosts) {
    const image = await importImage(blog.image, blog.title);

    await createEntry({
      model: 'blog-post',
      entry: {
        title: blog.title,
        slug: blog.slug,
        author: blog.author,
        date: blog.date,
        content: blog.content,
        image,
        publishedAt: Date.now(),
      },
    });
  }
}

async function importCategories() {
  for (const category of categories) {
    await createEntry({ model: 'category', entry: category });
  }
}

async function importAuthors() {
  for (const author of authors) {
    const avatar = await checkFileExistsBeforeUpload([author.avatar]);

    await createEntry({
      model: 'author',
      entry: {
        ...author,
        avatar,
      },
    });
  }
}

 function getFileData(fileName) {
  const filePath = path.join(__dirname, '../public/uploads', fileName);

  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function importImage(fileName, name) {
  const files = await checkFileExistsBeforeUpload([fileName]);

  return files;
}


async function importSiteSetting() {
  const companyBanner = await importImage(
    'web_solutions_009d80d7e7.png',
    'Digital Solutions company banner',
  );

  await createEntry({
    model: 'site-setting',
    entry: {
      companyName: 'DIGITAL SOLUTIONS',
      footerText: 'Made in India',
      companyBanner,
      publishedAt: Date.now(),
    },
  });
}


async function importAboutData() {
  await createEntry({
    model: 'about',
    entry: {
      about: `About Digital Solutions

At Digital Solutions, we help businesses transform their ideas into reliable, scalable, and modern digital experiences. We combine technology, creativity, and business understanding to build solutions that solve real-world challenges and create long-term value.

Our team works closely with clients to understand their goals, identify the right technology approach, and deliver solutions that are practical, secure, and easy to maintain. From web applications and cloud solutions to custom software development, we focus on delivering quality at every stage of the development process.`,
      publishedAt: Date.now(),
    },
  });
}


async function importServices() {
  const services = [
    {
      title: 'Web Development',
      description:
        'We build modern, responsive, and scalable websites and web applications tailored to your business goals, delivering excellent performance, security, and user experience across all devices.',
      price: '$500',
      image: 'web_0e43d31241.jpg',
    },
    {
      title: 'Mobile App Development',
      description:
        'We create fast, secure, and user-friendly mobile applications that help businesses engage customers, improve operations, and deliver seamless experiences across modern mobile platforms.',
      price: '$700+',
      image: 'mobile_3b2dd77f2b.jpg',
    },
    {
      title: 'UI/UX Design',
      description:
        'We design intuitive and engaging digital experiences that combine attractive visuals, simple navigation, and user-focused interfaces aligned with your brand and business objectives.',
      price: '$300+',
      image: 'uiux_8d70151c30.jpeg',
    },
    {
      title: 'E-Commerce Solutions',
      description:
        'We build secure and scalable e-commerce platforms with smooth shopping experiences, product management, payment integration, and features designed to support your online business growth.',
      price: '$800+',
      image: 'solutions_01d8f5e50c.webp',
    },
    {
      title: 'API Development & Integration',
      description:
        'We build reliable APIs and integrate third-party services to connect applications, automate workflows, securely exchange data, and create seamless communication between your digital systems.',
      price: '$400+',
      image: 'What_is_an_API_Integration_c0400b8983.png',
    },
  ];

  for (const service of services) {
    const image = await importImage(
      service.image,
      service.title,
    );

    await createEntry({
      model: 'service',
      entry: {
        title: service.title,
        description: service.description,
        price: service.price,
        image,
        publishedAt: Date.now(),
      },
    });
  }
}

async function importVisionData() {
  await createEntry({
    model: 'vision',
    entry: {
      vision: `At Digital Solutions, our vision is to empower businesses through innovative and reliable technology. We aim to create digital solutions that simplify complex processes, improve efficiency, enhance customer experiences, and help organizations achieve sustainable growth.

We believe in combining modern technologies, thoughtful design, and business expertise to build scalable, secure, and future-ready solutions. Our goal is to continuously innovate and help businesses confidently adapt to an evolving digital world.`,
    },
  });
}

async function importTeamMembers() {
  const teamPhoto = await importImage(
    'joelcoffman_01ffe0ba0b.jpg',
    'Digital Solutions team member',
  );

  const teams = [
    {
      name: 'John Carter',
      designation: 'Chief Executive Officer',
      bio: 'John leads the company with a focus on innovation, business growth, and building long-term relationships with clients and partners.',
    },
    {
      name: 'Sarah Mitchell',
      designation: 'Project Manager',
      bio: 'Sarah manages projects from planning to delivery, ensuring clear communication, smooth execution, and successful outcomes for clients.',
    },
    {
      name: 'Emily Johnson',
      designation: 'UI/UX Designer',
      bio: 'Emily creates clean, intuitive, and user-friendly interfaces that combine strong visual design with excellent user experiences.',
    },
    {
      name: 'Sophia Brown',
      designation: 'Backend Developer',
      bio: 'Sophia develops secure and scalable APIs and backend services while focusing on performance, reliability, and maintainable code.',
    },
    {
      name: 'Daniel Thomas',
      designation: 'Mobile App Developer',
      bio: 'Daniel specializes in creating high-quality mobile applications with smooth user experiences and reliable functionality across platforms.',
    },
    {
      name: 'James Taylor',
      designation: 'QA Engineer',
      bio: 'James ensures product quality by designing test strategies, identifying issues, and validating applications across different environments.',
    },
    {
      name: 'Michael Anderson',
      designation: 'Senior Full Stack Developer',
      bio: 'Michael specializes in developing scalable web applications and backend systems using modern technologies and best development practices.',
    },
  ];

  for (const team of teams) {
    await createEntry({
      model: 'team-member',
      entry: {
        name: team.name,
        designation: team.designation,
        bio: team.bio,
        photo: teamPhoto,
        publishedAt: Date.now(),
      },
    });
  }
}
async function importSeedData() {
  await setPublicPermissions({
    'site-setting': ['find', 'findOne'],
    about: ['find', 'findOne'],
    service: ['find', 'findOne'],
    'team-member': ['find', 'findOne'],
    'about-page': ['find', 'findOne'],
    'blog-post': ['find', 'findOne'],
    'vision': ['find', 'findOne']
  });

  await importSiteSetting();
  await importAboutData();
  await importServices();
  await importTeamMembers();
  await importBlogPosts();
  await importVisionData();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedExampleApp();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
