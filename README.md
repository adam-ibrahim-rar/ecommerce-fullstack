E-Commerce Platform

A full-stack e-commerce platform built from scratch with a React/TypeScript frontend and a Node.js/Express backend.

The project includes a complete customer-facing shopping experience, persistent user and product data, authentication, product reviews, cart and wishlist functionality, order management, media uploads, and an administrative dashboard for managing the platform's content and resources.

Overview

This project was built as an independent full-stack application with a focus on modular architecture, separation of responsibilities, reusable components, and maintainable code.

The application is divided into two main parts:

- "Client" — React frontend
- "Server" — Node.js/Express backend

The backend exposes a versioned REST API under "api/v1" and uses PostgreSQL with Prisma for data persistence.

Features

Customer Features

- Browse products and categories
- View product details
- Add products to cart
- Manage wishlist
- Place and manage orders
- View order details
- Submit and view product reviews
- User registration and login
- Google Sign-In
- User profile management
- Address management
- Account settings
- Protected authenticated routes
- Responsive product and content interfaces
- Loading skeletons for major pages and components

Admin Dashboard

The application includes a dedicated admin area for managing the platform.

Administrators can manage:

- Products
- Product images
- Categories
- Homepage banners
- Homepage content
- Orders
- Users
- Product reviews

The dashboard allows content to be managed dynamically rather than relying entirely on hard-coded frontend data.

Tech Stack

Frontend

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Redux Persist
- TanStack React Query
- Axios
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui
- Radix UI
- Lucide React
- React Icons
- Swiper
- Sonner

Backend

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- Prisma ORM
- "pg"
- Zod
- Axios-compatible REST API architecture

Authentication & Security

- JSON Web Tokens (JWT)
- Google Authentication
- bcrypt
- Express Session
- Cookie Parser
- Express Rate Limit
- Authentication middleware
- Admin authorization middleware
- Request validation middleware

Media Management

- Cloudinary
- "@cloudinary/react"
- "@cloudinary/url-gen"

Cloudinary is used for product image upload and media management.

Architecture

Frontend Architecture

The frontend follows a feature-oriented structure.

Major features are separated into their own modules:

src/
├── features/
│   ├── admin/
│   ├── auth/
│   ├── Cart/
│   ├── home/
│   ├── order/
│   ├── Products/
│   └── Wishlist/
│
├── components/
├── pages/
├── reduxtoolkit/
├── lib/
└── assets/

Each major feature can contain its own:

- Components
- API functions
- React Query queries
- Types
- Schemas
- Feature-specific logic

This keeps related functionality together and makes the frontend easier to extend as the project grows.

Backend Architecture

The backend follows a layered architecture:

Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Prisma
   ↓
PostgreSQL

The API is organized under:

src/
└── api/
    └── v1/
        ├── controller/
        ├── middlewares/
        ├── repositories/
        ├── routes/
        ├── services/
        ├── types/
        └── utils/

Routes

Responsible for defining API endpoints and connecting them to the appropriate controllers.

Controllers

Handle HTTP requests and responses while delegating business logic to services.

Services

Contain application and business logic.

Repositories

Handle data-access operations and communicate with Prisma.

Middlewares

The project includes dedicated middleware for:

- Authentication
- Admin authorization
- Request validation
- Error handling

Database

The application uses PostgreSQL as its primary database with Prisma ORM.

The current schema contains models for core e-commerce entities including:

- User
- Product
- Category
- Cart
- CartItem
- Wishlist
- WishlistItem
- Order
- OrderItem
- Review
- Banner

Database changes are managed through Prisma migrations.

prisma/
├── schema.prisma
└── migrations/

This allows the database schema to evolve alongside the application as new functionality is introduced.

Authentication

The application supports multiple authentication mechanisms.

JWT Authentication

JSON Web Tokens are used to authenticate users and protect private resources.

Google Sign-In

Users can authenticate through Google using Google's authentication libraries.

Authorization

Authenticated resources are protected through middleware, with additional authorization for administrative operations.

The frontend also includes protected route handling to prevent unauthorized access to restricted pages.

State Management

The application uses different tools depending on the type of state being managed.

Redux Toolkit

Used for client-side application state such as:

- Authentication state
- Cart state
- Wishlist state

Redux Persist is used to persist selected client-side state between sessions.

TanStack Query

Used for server state and API data fetching, including:

- Products
- Categories
- Orders
- Users
- Reviews
- Banners
- Other API resources

This separation helps distinguish local application state from data that belongs to the backend.

Forms & Validation

Forms are implemented using:

- React Hook Form
- Zod
- "@hookform/resolvers"

The backend also uses Zod-based validation schemas for incoming requests.

Validation schemas are organized by feature, for example:

src/schemas/
├── cart.schema.ts
├── category.schema.ts
├── order.schema.ts
├── product.schema.ts
├── review.schema.ts
├── user.schema.ts
└── wishlist.schema.ts

Media Management

Product images are handled through Cloudinary.

The project contains dedicated Cloudinary configuration and upload utilities on the backend, as well as frontend integration for displaying Cloudinary-managed media.

Relevant areas include:

Server/src/api/v1/utils/cloudinary.ts
Server/src/config/cloudinary.ts
Client/src/features/admin/products/api/uploadToCloudinary.ts

Error Handling

The backend includes centralized error-handling utilities and middleware.

The project also includes:

- Custom application error utilities
- Async request handling
- Request validation
- Centralized error middleware

This keeps error handling consistent across API endpoints.

Pagination

Pagination utilities are implemented on the backend and integrated into relevant resources.

Server/src/api/v1/utils/pagination.util.ts

This allows large collections such as products and other resources to be retrieved in manageable pages rather than loading the entire dataset at once.

Loading & User Experience

The frontend contains reusable loading skeletons for different parts of the application.

Examples include:

- Home
- Products
- Product details
- Cart
- Orders
- Authentication forms
- Wishlist
- Contact
- About
- User details

The project also uses:

- Toast notifications with Sonner
- Responsive UI components
- Swiper for interactive sliders
- Reusable UI components
- Protected routes
- Loading states

Project Structure

E-Commerce Project/
│
├── Client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── Helpers/
│   │   │   ├── Skeletons/
│   │   │   └── ui/
│   │   │
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── Cart/
│   │   │   ├── home/
│   │   │   ├── order/
│   │   │   ├── Products/
│   │   │   └── Wishlist/
│   │   │
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── reduxtoolkit/
│   │   ├── App.tsx
│   │   ├── Router.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── Server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── controller/
│   │   │       ├── middlewares/
│   │   │       ├── repositories/
│   │   │       ├── routes/
│   │   │       ├── services/
│   │   │       ├── types/
│   │   │       └── utils/
│   │   │
│   │   ├── config/
│   │   ├── generated/
│   │   ├── schemas/
│   │   └── index.ts
│   │
│   └── package.json
│
└── README.md

Getting Started

Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL

You will also need accounts/configuration for services used by the project, such as Cloudinary and Google authentication.

Clone the Repository

git clone <repository-url>
cd <project-directory>

Client Setup

cd Client
npm install
npm run dev

The frontend will start using Vite.

Server Setup

Open another terminal:

cd Server
npm install
npm run dev

The backend will start using the development script configured in the server package.

Environment Variables

The exact environment variable names should be taken from the project's environment configuration files and "Server/src/config/env.ts".

Typical configuration includes values for:

Client

- API base URL
- Authentication-related configuration
- Cloudinary configuration where applicable
- Google authentication configuration where applicable

Server

- PostgreSQL database connection
- JWT configuration
- Session configuration
- Google authentication credentials
- Cloudinary credentials
- Application port
- Other environment-specific configuration

Do not commit ".env" files or expose private credentials in the repository.

Available Scripts

Client

npm run dev
npm run build
npm run lint
npm run format
npm run format:watch
npm run preview

Server

npm run dev
npm run build
npm start

Development Approach

The project was developed with an emphasis on:

- Separation of concerns
- Reusable components
- Feature-based organization
- Layered backend architecture
- Type safety with TypeScript
- Schema validation
- Persistent database storage
- Clear API boundaries
- Authentication and authorization
- Maintainable data-access patterns

Future Improvements

Potential future improvements include:

- Expanding the admin analytics dashboard
- Improving search and filtering capabilities
- Adding automated testing
- Adding CI/CD workflows
- Improving caching strategies
- Expanding monitoring and logging
- Further optimizing performance
- Adding additional payment and delivery integrations

Status

In active development.

The project continues to evolve as new features, improvements, and architectural refinements are introduced.

Author

Built independently as a full-stack development project, with the goal of gaining practical experience building and maintaining a complete web application from frontend to database.
AI tools were used as a development assistant to accelerate implementation of repetitive and boilerplate features.
