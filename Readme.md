# FixItNow Backend

## Table Of Content
- [Project Overview](#project-overview)
- [API Documentation](#api-documentation)
- [Tech Stack](#tech-stack)
- [ER Diagram](#er-diagram)
- [Live API URL](#live-api-url)
- [Project Folder Architecture](#project-folder-architecture)

## Project Overview
FixItNow is a backend API for a home services marketplace. Customers can browse available services (plumbing, electrical, cleaning, painting, etc.), book qualified technicians, and leave reviews. Technicians can create service profiles, manage their availability, and handle job bookings. Admins oversee the platform, manage users, and moderate service categories.

## API Documentation
- Postman Docs: https://documenter.getpostman.com/view/48233467/2sBY4LQ1ph

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API |
| TypeScript | Type safety |
| Postgres + Prisma | Database + ORM |
| JWT | Authentication |
| BcryptJS | Password Hashing |

### Deployment
| Service | Purpose |
|---------|---------| 
| Vercel / Render | Backend API deployment |

## ER Diagram
ER Diagram: https://drawsql.app/teams/sajib-hasan/diagrams/fix-it-now-backend

## Live API URL
- vercel: https://fix-it-now-backend-beta.vercel.app/
- render: https://fix-it-now-backend-6zo5.onrender.com/

## Project Folder Architecture

```txt
fix-it-now-backend/
├── .env.example
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── prisma/
│   ├── migrations/
│   │   ├── 20260705182845_init/
│   │   │   └── migration.sql
│   │   ├── 20260706175223_initial_model_design/
│   │   │   └── migration.sql
│   │   ├── 20260710023340_update_models/
│   │   │   └── migration.sql
│   │   ├── 20260711025436_add_stripe_account_id/
│   │   │   └── migration.sql
│   │   ├── 20260711041449_add_checkout_session/
│   │   │   └── migration.sql
│   │   ├── 20260711051351_add_payment_intent/
│   │   │   └── migration.sql
│   │   ├── 20260711093618_add_payment_model/
│   │   │   └── migration.sql
│   │   ├── 20260711094431_map_payment_fields/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema/
│       ├── availability_slot.prisma
│       ├── booking.prisma
│       ├── category.prisma
│       ├── enum.prisma
│       ├── payment.prisma
│       ├── review.prisma
│       ├── schema.prisma
│       ├── service.prisma
│       ├── technician_profile.prisma
│       └── user.prisma
├── prisma.config.ts
├── Readme.md
├── src/
│   ├── app.ts
│   ├── config/
│   │   └── index.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── stripe.ts
│   ├── middlewares/
│   │   └── auth.ts
│   ├── modules/
│   │   ├── admin/
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.repository.ts
│   │   │   ├── admin.route.ts
│   │   │   └── admin.service.ts
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   ├── booking/
│   │   │   ├── booking.controller.ts
│   │   │   ├── booking.interface.ts
│   │   │   ├── booking.repository.ts
│   │   │   ├── booking.route.ts
│   │   │   └── booking.service.ts
│   │   ├── category/
│   │   │   ├── category.controller.ts
│   │   │   ├── category.repository.ts
│   │   │   └── category.route.ts
│   │   ├── payment/
│   │   │   ├── payment.controller.ts
│   │   │   ├── payment.interface.ts
│   │   │   ├── payment.repository.ts
│   │   │   ├── payment.route.ts
│   │   │   └── payment.service.ts
│   │   ├── review/
│   │   │   ├── review.controller.ts
│   │   │   ├── review.interface.ts
│   │   │   ├── review.repository.ts
│   │   │   ├── review.route.ts
│   │   │   └── review.service.ts
│   │   ├── service/
│   │   │   ├── service.controller.ts
│   │   │   ├── service.interface.ts
│   │   │   ├── service.repository.ts
│   │   │   ├── service.route.ts
│   │   │   └── service.service.ts
│   │   └── technician/
│   │       ├── technician.controller.ts
│   │       ├── technician.interface.ts
│   │       ├── technician.repository.ts
│   │       ├── technician.route.ts
│   │       └── technician.service.ts
│   ├── server.ts
│   └── utils/
│       ├── errorHandler.ts
│       ├── formatZodError.ts
│       ├── getCookieConfig.ts
│       ├── jwt.ts
│       ├── logger.ts
│       └── sendResponse.ts
└── tsconfig.json
```