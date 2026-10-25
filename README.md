# TopFly ✈️

A full-stack trip booking website: travelers browse destinations by category, search trips and contact the agency, while managers run the catalog, users and newsletter from an admin area.

Built with **Node.js, Express and MongoDB**, with a REST API and a vanilla JavaScript client.

## Features

**Travelers**
- Browse trip categories and destinations, view trip details (dates, hotel, description)
- Free-text search across trip names and descriptions
- Sign up / log in with JWT authentication
- Personal area: update profile and send messages
- Contact form that emails the agency

**Managers**
- Role-based admin area (`manager` / `user`)
- Create, update and delete categories and trips, with image upload
- Manage users
- Send a newsletter email to subscribed users

## Tech stack

| Layer | Technologies |
|---|---|
| Server | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT), Express middleware |
| Files & email | Multer (image upload), Nodemailer |
| Client | HTML, CSS, JavaScript (Fetch API) |

## Architecture

```
server/
├── app.js           # Express setup, DB connection, route mounting
├── routes/          # REST endpoints per resource
├── controller/      # Request handling and business logic
├── model/           # Mongoose schemas (User, Category, Trip)
├── middlewares/     # JWT verification, image upload
└── email/           # Nodemailer transport
client/
├── html/  css/  js/ # Pages and client-side logic
```

Categories and trips are linked in both directions: a trip references its `parentCategory`, and the category keeps a list of its trips, which is updated whenever a trip is created or deleted.

## API overview

| Resource | Endpoints |
|---|---|
| `/User` | register, login, get user from token, update profile, messages, contact email, newsletter subscribers |
| `/Category` | list, get by id, create, update, delete |
| `/Trip` | list, get by id, list by category, search, create, update, delete |

Protected routes expect an `Authorization: Bearer <token>` header.

## Getting started

```bash
git clone https://github.com/lea9466/Top-fly.git
cd Top-fly
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

Environment variables (see `.env.example`):

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Server port |
| `SECRETKEY` | Secret for signing JWTs |
| `EMAIL_USE` / `EMAIL_PASS` | Gmail address and app password for sending email |

Then open the client pages from `client/html/` (e.g. with VS Code Live Server).

## Author

**Lea Lev** · [GitHub](https://github.com/lea9466) · [leatech.dev](https://leatech.dev)
