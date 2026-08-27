# Career Copilot — Local Development Guide

This document describes the instructions and configuration rules required to build, run, and debug the Career Copilot application on a local development workspace and access it from mobile devices on the same Wi-Fi network.

---

## 1. Getting Started

### 1.1 Prerequisites
*   Node.js (v18+)
*   Docker (for running the local PostgreSQL database)

### 1.2 Local Database Setup
Ensure that the local PostgreSQL Docker container is running on port 5432:
```bash
docker start careercopilot-db
```
If the container does not exist yet, you can create it using:
```bash
docker run --name careercopilot-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Apply database migrations using Prisma:
```bash
npx prisma migrate dev
```

### 1.3 Running the Application
To run the joint Express backend + Vite frontend development server:
```bash
npm run dev
```
The server will boot and begin listening on:
*   Local: [http://localhost:3000](http://localhost:3000)
*   Network: `http://<MAC-LAN-IP>:3000`

---

## 2. Environment Variables Configuration

Create a `.env` file in the root directory. Required environment variable keys:

```ini
# Database Connection URL (Server-Only)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/careercopilot?schema=public

# Backend JWT Token Verification Secret (Server-Only)
SUPABASE_JWT_SECRET=your-supabase-jwt-secret

# Gemini AI Platform API Key (Server-Only)
GEMINI_API_KEY=your-gemini-api-key

# Client-Facing Supabase Credentials (Safe to expose to client)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

*Note: If `VITE_SUPABASE_URL` is left as a placeholder or empty, the application automatically runs in local offline development auth mode using the local PostgreSQL database.*

---

## 3. Network & Mobile Access Configuration

### 3.1 Listening Host
The backend Express server is configured to listen on `0.0.0.0` (all network interfaces), making it reachable from other devices connected to the same Wi-Fi LAN:
```typescript
app.listen(PORT, "0.0.0.0", () => { ... });
```

### 3.2 Dynamic CORS Rules
Cross-Origin Resource Sharing is configured to allow local machine hosts and local subnets in development mode. The middleware accepts request headers from:
*   `localhost` and `127.0.0.1` (on ports 3000 and 5173)
*   LAN subnets: `192.168.x.x`, `172.x.x.x`, and `10.x.x.x`

---

## 4. Troubleshooting Login Errors

### 4.1 "Email already registered"
*   *Cause*: The email you typed during registration already exists in the `User` table.
*   *Solution*: Sign in with the registered email, or use a different email address.

### 4.2 "Invalid credentials"
*   *Cause*: The password does not match the hashed record stored in PostgreSQL.
*   *Solution*: Re-enter your credentials or clear your browser's local storage session:
    ```javascript
    localStorage.removeItem("mock_session");
    ```

### 4.3 Mobile connection timeout
*   *Cause*: The macOS firewall is blocking port 3000.
*   *Solution*: Allow incoming connections for Node.js or `tsx` in System Settings -> Network -> Firewall.
