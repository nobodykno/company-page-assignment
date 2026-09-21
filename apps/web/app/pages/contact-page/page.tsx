import ContactForm from '@/components/contact/contact-form';

export default function ContactPage() {
  return (
    <main
      className="min-h-screen"
      aria-labelledby="contact-title"
    >
      <section
        aria-labelledby="contact-title"
        className="mx-auto max-w-3xl px-6 py-16"
      >
        <h1
          id="contact-title"
          className="text-4xl font-bold"
        >
          Contact Us
        </h1>

        <p
          aria-label="Contact page description"
          className="mt-3 text-[var(--color-text-secondary)]"
        >
          Have a question? Send us a message.
        </p>

        <ContactForm />
      </section>
    </main>
  );
}