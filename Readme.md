# Next.js + Strapi CMS

A Next.js application demonstrating **SSG, ISR, and SSR using Strapi CMS as the backend.

## Tech Stack

* Next.js 16
* pnpm
* Strapi CMS
* Nginx
* Docker

## Starting the Project

Install the dependencies:


pnpm install


Build the Docker containers:


docker compose build


Start the application:


docker compose up


## Concepts

* `force-static` → SSG
* `revalidate` → ISR
* `force-dynamic` → SSR

### SSG

Stores the data at **build time**. Changes made in the backend will not be reflected until the application is rebuilt.

### ISR

Stores the data at **build time** and updates it after the specified **revalidation interval**.

### SSR

Fetches and renders the data **on every request**, allowing the latest backend data to be displayed.
