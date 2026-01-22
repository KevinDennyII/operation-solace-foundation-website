# Operation Solace Foundation

## Overview

Operation Solace Foundation is a nonprofit website for a veteran-focused organization that provides psychedelic-assisted therapy and healing programs. The application is a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence. The site features informational pages about the organization's mission, programs, and story, along with a contact form for visitor inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom design tokens (CSS variables for theming)
- **UI Components**: shadcn/ui component library (Radix UI primitives with custom styling)
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Build Tool**: Vite for development and production builds

The frontend follows a page-based architecture with shared layout components (Navbar, Footer). Pages are located in `client/src/pages/` and reusable components in `client/src/components/`.

### Backend Architecture
- **Framework**: Express 5 running on Node.js
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Design**: REST endpoints defined in `server/routes.ts`
- **Validation**: Zod schemas shared between client and server via `shared/` directory

The backend serves both the API and static files in production. In development, Vite handles the frontend with HMR.

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Migrations**: Managed via `drizzle-kit push` command

Current schema includes a `contact_messages` table for storing contact form submissions.

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database table definitions and Zod validation schemas
- `routes.ts`: API route definitions with type-safe input/output schemas

This pattern ensures type safety across the full stack and eliminates duplication.

### Build Process
- Development: `tsx` runs the server directly, Vite provides frontend HMR
- Production: `script/build.ts` uses esbuild to bundle server code and Vite to build the frontend
- Output: `dist/` contains `index.cjs` (server) and `public/` (frontend assets)

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for PostgreSQL (available but not currently configured)

### Payment/Donations
- External PayPal fundraiser links (no direct integration, just outbound links)
- PayPal Fundraiser URL: https://www.paypal.com/us/fundraiser/charity/5511140

### Social Media
- Instagram: https://www.instagram.com/operation_solace/

### Brand Assets
The following branded images are used throughout the site (located in `attached_assets/`):
- **Main Logo**: Soldier walking through mushroom field (d34f41fde710d99d1cd70ae67b4575765f161d6d-1_1769068811822.jpeg) - Used in navbar, footer, and hero
- **Skull Logo**: Psychedelic skull with helmet (4c0ee530559d5b38f9067c618b160608a1c9dfad-2_1769068811822.jpeg) - Used on Our Story page
- **Event Photo**: Community outreach booth (8e38bf695a18c8490a2e3cb64268d6c6af063942-1_1769068811823.jpeg) - Used on Our Story page

### Third-Party UI Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **date-fns**: Date formatting utilities

### Fonts
- Google Fonts: Libre Baskerville (display), DM Sans (body)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Development error overlay
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development banner