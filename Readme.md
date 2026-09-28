# Next.js + Strapi CMS

A Next.js application demonstrating **SSG, ISR using Strapi CMS as the backend.


## Concepts

* `force-static` → SSG
* `revalidate` → ISR
* `force-dynamic` → SSR

### SSG

Stores the data at **build time**. Changes made in the backend will not be reflected until the application is rebuilt.

### ISR

Stores the data at **build time** and updates it after the specified **revalidation interval**.

# Next.js + Strapi CMS

## Tech Stack

* Next.js 16
* pnpm
* Strapi CMS
* Nginx
* Docker
* Docker Compose

## Project Start

Install dependencies:


pnpm install


Build Docker containers:


docker compose build


Start the application:


docker compose up -d


Check containers:


docker compose ps


## Persistent Directory for Self-Hosted Certificates

The Nginx container needs access to the SSL certificates stored on the host machine.

### 1. Create a persistent certificate directory

On the self-hosted machine:


mkdir -p ~/company-page-certs


Example:


/Users/paramjitj/company-page-certs


### 2. Copy the certificates into the directory

For example:


company-page-certs/
├── fullchain.pem
└── privkey.pem


### 3. Configure the certificate directory

Set the directory in the deployment environment:

TLS_CERT_DIR=/Users/paramjitj/company-page-certs


### 4. Mount the directory in Docker Compose


nginx:
  volumes:
    - ${TLS_CERT_DIR}:/etc/nginx/certs:ro


The certificates are therefore stored on the host machine rather than inside the Docker container.

### 5. Build and start Nginx


docker compose up -d --build nginx


### 6. Verify


docker compose ps


Test HTTPS:


curl -k https://localhost:3443
\

### Important

Do **not** store the certificates inside the Git repository.

The certificate directory remains persistent even when containers are recreated:

docker compose down
docker compose up -d


The host directory:


~/company-page-certs


