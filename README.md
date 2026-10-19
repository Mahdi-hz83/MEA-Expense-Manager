# MEA — Tower Installation Expense Manager

A modern, Persian-language expense management application designed for tower installation projects. MEA helps manage project records, track expenses, organize payees, store receipts securely, and export financial reports to Excel through a responsive web interface.

## Overview

MEA is built to simplify expense tracking for tower installation operations. Each project maintains its own expense records, allowing users to review project costs, manage payments, and access supporting receipts from a centralized dashboard.

The application is designed with a mobile-first approach, making it practical to use on both desktop and mobile devices.

## Features

- **Project Management** — Create projects, search existing projects, and update project information.
- **Expense Tracking** — Record expenses with amounts, dates, descriptions, payment methods, payees, and reference details.
- **Payee Management** — Search and reuse payee information when recording transactions.
- **Receipt Management** — Upload, access, and manage expense receipts with a maximum file size of 25 MB.
- **Excel Export** — Export project expense records to Excel for reporting and further analysis.
- **Persian Date Support** — Work with Jalali dates in the user interface and exported reports.
- **Amount in Words** — Include the written representation of monetary amounts in exported reports.
- **Audit Logging** — Record important application activities for traceability.
- **Secure Authentication** — Password-based authentication, protected sessions, and authenticated API endpoints.
- **Responsive Interface** — An interface designed for convenient use on mobile devices and desktop screens.
- **MySQL Database** — Persistent relational data storage powered by Prisma ORM.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Full-stack application framework |
| React 19 | User interface |
| TypeScript | Type-safe development |
| Prisma ORM 6 | Database access and schema management |
| MySQL | Relational database |
| ExcelJS | Excel report generation |
| Argon2id | Password hashing |
| CSS | Responsive interface styling |

## Architecture

The application uses Next.js App Router for its pages and API endpoints. Prisma manages database access, while MySQL stores application data, including projects, expenses, payees, receipts metadata, sessions, and audit events.

Uploaded receipt files are stored privately on the local filesystem, while their associated metadata is maintained in the database.

The current deployment approach does not require Docker or Docker Compose.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js compatible with your Next.js setup
- npm
- MySQL Server

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd MEA-Prj
```

Replace `<YOUR_REPOSITORY_URL>` with your GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a local `.env` file based on the provided example:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Configure the required variables in `.env`:

```env
DATABASE_URL="mysql://expense_user:YOUR_PASSWORD@localhost:3306/mea_expenses"
AUTH_SECRET="YOUR_LONG_RANDOM_SECRET"
UPLOAD_DIR="./storage/receipts"
```

Update the database credentials to match your local MySQL configuration. Use a strong, randomly generated authentication secret.

### 4. Create the MySQL Database

Create the database specified in your connection string. For example:

```sql
CREATE DATABASE mea_expenses
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Ensure the configured MySQL user has the necessary permissions to access the database and apply migrations.

### 5. Generate Prisma Client and Apply Migrations

Generate the Prisma Client:

```bash
npx prisma generate --schema prisma/app.prisma
```

Apply the existing database migrations:

```bash
npx prisma migrate deploy --schema prisma/app.prisma
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

On a fresh installation, complete the initial owner account setup through the application's setup page before signing in.

## Project Structure

```text
.
├── prisma/
│   ├── app.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── projects/
│   │   └── setup/
│   ├── components/
│   └── lib/
├── storage/
│   └── receipts/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

## Security and Data Storage

- Passwords are hashed using Argon2id rather than stored as plaintext.
- Authentication sessions use secure token handling and HTTP-only cookies.
- Receipt access is handled through authenticated endpoints.
- Environment secrets and uploaded receipt files are excluded from version control.
- Database migrations are maintained in the repository to support consistent database setup.

**Important:** Back up the MySQL database and receipt storage directory together. Database records and uploaded files are stored separately.

## Production Build

Build the application for production:

```bash
npm run build
```

Start the production server using the configured package scripts:

```bash
npm run start
```

The Next.js configuration uses standalone output, which can support a more streamlined production deployment. The database and receipt storage directory must still be configured appropriately for the target environment.

## Current Scope

MEA focuses on project-based expense tracking and receipt management. It does not currently include project budgeting, revenue management, contractor advances, or project account balance management.

## License

No license has been specified yet. All rights reserved unless a license is added to this repository.
