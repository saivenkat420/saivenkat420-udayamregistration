# Database Setup Instructions

## PostgreSQL Setup

### Option 1: Local PostgreSQL Installation

1. **Install PostgreSQL**
   - Windows: Download from https://www.postgresql.org/download/windows/
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`

2. **Start PostgreSQL Service**
   - Windows: Start via Services or pg_ctl
   - macOS/Linux: `sudo systemctl start postgresql`

3. **Create Database and User**
   ```sql
   -- Connect to PostgreSQL as superuser
   sudo -u postgres psql
   
   -- Create database
   CREATE DATABASE udyam_registration;
   
   -- Create user (optional, can use postgres user)
   CREATE USER udyam_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE udyam_registration TO udyam_user;
   ```

### Option 2: Docker PostgreSQL (Recommended for Development)

1. **Run PostgreSQL in Docker**
   ```bash
   docker run --name udyam-postgres \
     -e POSTGRES_DB=udyam_registration \
     -e POSTGRES_USER=udyam_user \
     -e POSTGRES_PASSWORD=udyam123 \
     -p 5432:5432 \
     -d postgres:15
   ```

2. **Connection String for Docker**
   ```
   DATABASE_URL="postgresql://udyam_user:udyam123@localhost:5432/udyam_registration?schema=public"
   ```

## Environment Setup

1. **Create .env file**
   ```bash
   cp database.env .env
   ```

2. **Update DATABASE_URL in .env**
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/udyam_registration?schema=public"
   ```

## Database Migration

1. **Run Prisma Migration**
   ```bash
   npx prisma migrate dev --name init
   ```

2. **Generate Prisma Client** (if not done already)
   ```bash
   npx prisma generate
   ```

## Verification

1. **Check Database Connection**
   ```bash
   npx prisma db push
   ```

2. **View Database Schema**
   ```bash
   npx prisma studio
   ```
   - Opens web interface at http://localhost:5555

## Troubleshooting

- **Connection refused**: Ensure PostgreSQL is running
- **Authentication failed**: Check username/password in DATABASE_URL
- **Database not found**: Create the database first
- **Port conflict**: Change port in DATABASE_URL if 5432 is occupied
