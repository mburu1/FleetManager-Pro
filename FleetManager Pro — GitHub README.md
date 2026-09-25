# 🚚 FleetManager Pro

### Modern Multi-Tenant Fleet Management & Telematics Platform

FleetManager Pro is a production-oriented fleet management platform built with Next.js, TypeScript, React, Node.js, Fastify, PostgreSQL, Prisma, Redis, Docker, and Traefik. The platform provides businesses with centralized visibility into vehicles, drivers, routes, GPS telemetry, maintenance, operational performance, and fleet analytics.

> **Track. Manage. Optimize.**

---

## 🎯 Problem

Fleet operators often work with fragmented systems for:

- Vehicle management
- Driver management
- GPS tracking
- Route planning
- Maintenance
- Fuel monitoring
- IoT telemetry
- Operational reporting
- Alerts and notifications

FleetManager Pro brings these capabilities together through a secure, multi-tenant web platform.

---

# 🚀 Core Features

## Real-Time GPS Tracking

- Vehicle location tracking
- GPS telemetry ingestion
- Current vehicle status
- Historical trips
- Geofencing
- Location history
- Speed monitoring
- Ignition status
- Distance tracking

## Fleet Management

- Vehicle registration
- Vehicle types
- Vehicle status
- Driver assignment
- Vehicle documents
- Maintenance schedules
- Service history

## Driver Management

- Driver profiles
- Driver-to-vehicle assignment
- Driver activity
- Driver performance
- License/document tracking

## Route & Trip Management

- Route creation
- Trip planning
- Trip history
- Route deviation detection
- Distance and duration analytics
- Geofence events

## Analytics

Fleet dashboards provide:

- Total vehicles
- Active vehicles
- Vehicles in maintenance
- Active trips
- Distance travelled
- Fleet utilization
- Driver performance
- Fuel consumption
- GPS events
- Maintenance costs

## Multi-Tenant SaaS

Organizations are isolated through tenant-aware access control.

```text
Platform
   │
   ├── Tenant A
   │    ├── Users
   │    ├── Vehicles
   │    ├── Drivers
   │    └── Trips
   │
   ├── Tenant B
   │    ├── Users
   │    ├── Vehicles
   │    ├── Drivers
   │    └── Trips
   │
   └── Tenant C
```

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      Next.js         │
                         │ React + TypeScript   │
                         └──────────┬───────────┘
                                    │
                               REST / HTTPS
                                    │
                         ┌──────────▼───────────┐
                         │       Traefik        │
                         │ Reverse Proxy / TLS  │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │     Fastify API      │
                         │ Node.js + TypeScript │
                         └───────┬───────┬──────┘
                                 │       │
                 ┌───────────────┘       └────────────────┐
                 │                                        │
        ┌────────▼────────┐                     ┌─────────▼────────┐
        │    PostgreSQL   │                     │      Redis       │
        │   Prisma ORM    │                     │ Cache / Queues   │
        └─────────────────┘                     └─────────┬────────┘
                                                          │
                                                   ┌──────▼──────┐
                                                   │   Workers   │
                                                   │ Background  │
                                                   │ Processing  │
                                                   └──────┬──────┘
                                                          │
                            ┌─────────────────────────────┼──────────────┐
                            │                             │              │
                     ┌──────▼──────┐              ┌──────▼──────┐ ┌─────▼─────┐
                     │ GPS Provider│              │ IoT Platform│ │ Scheduler │
                     │ / Telematics│              │ / Sensors   │ │ / Jobs    │
                     └─────────────┘              └─────────────┘ └───────────┘
```

---

# 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| UI | React |
| Language | TypeScript |
| Backend | Node.js |
| API Framework | Fastify |
| API Style | REST |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis |
| Queues | Redis |
| Containers | Docker |
| Reverse Proxy | Traefik |
| Server | Ubuntu Linux |
| Version Control | Git / GitHub |
| CI/CD | GitHub Actions |
| Authentication | JWT / secure session architecture |
| Integrations | GPS / IoT / third-party REST APIs |

---

# 📁 Repository Structure

```text
fleet-manager/
│
├── apps/
│   │
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   └── types/
│   │
│   └── api/
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── tenants/
│       │   │   ├── vehicles/
│       │   │   ├── drivers/
│       │   │   ├── trips/
│       │   │   ├── tracking/
│       │   │   ├── geofences/
│       │   │   ├── maintenance/
│       │   │   ├── analytics/
│       │   │   └── integrations/
│       │   │
│       │   ├── plugins/
│       │   ├── middleware/
│       │   ├── workers/
│       │   ├── jobs/
│       │   ├── config/
│       │   └── server.ts
│       │
│       └── tests/
│
├── packages/
│   ├── shared/
│   ├── validation/
│   ├── api-client/
│   └── types/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── infrastructure/
│   ├── docker/
│   ├── traefik/
│   ├── nginx/
│   └── ubuntu/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   ├── deployment/
│   └── security/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── test.yml
│       └── deploy.yml
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── traefik.yml
├── .env.example
├── package.json
└── README.md
```

---

# 🗄️ Database Domain

Core entities include:

```text
Tenant
 │
 ├── User
 │
 ├── Vehicle
 │     ├── VehicleTelemetry
 │     ├── MaintenanceRecord
 │     └── Trip
 │
 ├── Driver
 │
 ├── Route
 │
 ├── Geofence
 │
 └── Alert
```

### Main tables

```text
tenants
users
roles
permissions
vehicles
vehicle_types
drivers
driver_assignments
trips
routes
gps_positions
geofences
geofence_events
vehicle_telemetry
maintenance_records
fuel_records
alerts
notifications
integration_accounts
audit_logs
```

---

# 🔐 Security

Security is treated as a first-class concern.

- Authentication
- Authorization
- Tenant isolation
- Role-based access control
- JWT/session validation
- Password hashing
- API input validation
- Rate limiting
- Secure HTTP headers
- CORS configuration
- Environment-based secrets
- Audit logging
- Sensitive data protection

Example authorization model:

```text
Platform Admin
      │
      ├── Tenant Admin
      │      │
      │      ├── Fleet Manager
      │      │
      │      ├── Dispatcher
      │      │
      │      └── Driver
      │
      └── Support
```

---

# 🔌 REST API

Example API surface:

```http
POST   /api/auth/login
POST   /api/auth/refresh

GET    /api/vehicles
POST   /api/vehicles
GET    /api/vehicles/:id
PATCH  /api/vehicles/:id
DELETE /api/vehicles/:id

GET    /api/drivers
POST   /api/drivers

GET    /api/trips
POST   /api/trips

GET    /api/tracking/vehicles
GET    /api/tracking/vehicles/:id/history

GET    /api/geofences
POST   /api/geofences

GET    /api/maintenance
POST   /api/maintenance

GET    /api/analytics/fleet
GET    /api/analytics/drivers

POST   /api/integrations/gps/webhook
POST   /api/integrations/iot/webhook
```

---

# 📡 GPS / IoT Integration

The integration layer is designed to support external providers.

```text
GPS Provider
     │
     ▼
Webhook / REST API
     │
     ▼
Integration Service
     │
     ▼
Validation
     │
     ▼
Redis Queue
     │
     ▼
Background Worker
     │
     ├── PostgreSQL
     │
     ├── Redis
     │
     └── Analytics
```

This makes external integrations replaceable rather than coupling the core domain to one provider.

---

# ⚡ Redis

Redis is used for:

- API caching
- Session-related workloads
- Rate limiting
- Background job queues
- GPS event processing
- Temporary telemetry state
- Scheduled tasks
- Distributed coordination

Example:

```text
GPS Event
   ↓
Redis Queue
   ↓
Tracking Worker
   ↓
PostgreSQL
   ↓
Dashboard
```

---

# 🧪 Testing Strategy

Testing covers the complete application lifecycle.

### Unit Tests

- Domain logic
- Services
- Validation
- Utility functions

### Integration Tests

- Fastify API
- Prisma/PostgreSQL
- Redis
- Authentication
- External integrations

### End-to-End Tests

```text
Login
  ↓
Create Vehicle
  ↓
Assign Driver
  ↓
Create Trip
  ↓
Receive GPS Event
  ↓
Process Telemetry
  ↓
View Dashboard
```

---

# 🐳 Docker

Production services are containerized.

```text
Docker Compose
│
├── web
├── api
├── worker
├── postgres
├── redis
└── traefik
```

Development:

```bash
docker compose up -d
```

Production:

```bash
docker compose -f docker-compose.prod.yml up -d
```

---

# 🌐 Traefik

Traefik provides:

- Reverse proxy
- HTTPS termination
- Domain routing
- Automatic service discovery
- TLS certificates
- Container-based routing

Example:

```text
https://fleet.example.com
        │
        ▼
     Traefik
     /      \
    /        \
   ▼          ▼
Next.js     Fastify
```

---

# 🐧 Linux / Ubuntu Deployment

Target production environment:

```text
Ubuntu Server
│
├── Docker
├── Traefik
├── FleetManager Web
├── FleetManager API
├── Worker
├── PostgreSQL
└── Redis
```

Production configuration is supplied through environment variables.

```env
NODE_ENV=production
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
GPS_PROVIDER_URL=
GPS_PROVIDER_API_KEY=
```

Secrets are never committed to Git.

---

# 🔄 CI/CD

GitHub Actions handles:

```text
Push / Pull Request
        ↓
Install Dependencies
        ↓
Lint
        ↓
Type Check
        ↓
Unit Tests
        ↓
Integration Tests
        ↓
Build
        ↓
Docker Image
        ↓
Security Checks
        ↓
Deploy
        ↓
Health Check
```

---

# 📊 Observability

Production troubleshooting is supported through:

- Structured application logs
- Request correlation IDs
- API error tracking
- Worker/job failure logging
- Health endpoints
- Database monitoring
- Redis monitoring
- Container health checks

Example:

```http
GET /health
GET /health/database
GET /health/redis
```

---

# 📈 Performance

Performance considerations include:

- PostgreSQL indexes
- Pagination
- Efficient Prisma queries
- Redis caching
- Background processing
- Batch telemetry ingestion
- Database connection pooling
- API rate limiting
- Lazy-loaded dashboard components
- Next.js server-side rendering where appropriate

Large telemetry datasets are processed asynchronously rather than blocking API requests.

---

# 🧩 Production Incident Workflow

```text
Alert
  ↓
Inspect Logs
  ↓
Identify Correlation ID
  ↓
Reproduce
  ↓
Check Database / Redis
  ↓
Check External Integration
  ↓
Apply Fix
  ↓
Automated Tests
  ↓
Deploy
  ↓
Health Check
  ↓
Monitor
```

---

# 📚 Documentation

The repository documents:

- System architecture
- Domain model
- Database architecture
- ERD
- API contracts
- Authentication model
- Authorization model
- Integration architecture
- Deployment architecture
- CI/CD
- ADRs
- Testing strategy
- Operational runbooks

---

# 🧠 Engineering Principles

FleetManager Pro follows:

- Separation of concerns
- Modular architecture
- Strong typing
- API-first development
- Secure-by-default configuration
- Automated testing
- Infrastructure as code
- Twelve-factor application principles
- Observability
- Database-first performance considerations
- Stateless API design where practical
- Replaceable third-party integrations

---

# ⚖️ Architectural Trade-offs

### PostgreSQL + Prisma

Provides relational integrity and developer productivity while retaining PostgreSQL's mature indexing and querying capabilities.

### Redis

Introduces operational complexity but provides substantial benefits for caching and asynchronous processing.

### Fastify

Chosen for a lightweight, high-performance Node.js API layer.

### Next.js

Provides a unified React application framework with server-side capabilities and strong TypeScript integration.

### Docker

Adds container management overhead while providing reproducible environments between development and production.

---

# 🎯 Portfolio Objectives

This project demonstrates practical experience with:

- TypeScript
- React
- Next.js
- Node.js
- Fastify
- PostgreSQL
- Prisma
- Redis
- REST APIs
- Multi-tenant SaaS
- GPS/IoT integrations
- Authentication
- Authorization
- Background workers
- Queues
- Caching
- Docker
- Linux/Ubuntu
- Traefik
- CI/CD
- Automated testing
- Production troubleshooting
- Performance optimization

---

# 🚀 Getting Started

```bash
git clone https://github.com/mburu1/fleet-manager.git

cd fleet-manager

npm install
```

Create environment configuration:

```bash
cp .env.example .env
```

Start infrastructure:

```bash
docker compose up -d
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the application:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Run production build:

```bash
npm run build
```

---

# 🗺️ Roadmap

- [x] Multi-tenant architecture
- [x] Vehicle management
- [x] Driver management
- [x] REST API
- [x] PostgreSQL + Prisma
- [x] Redis infrastructure
- [ ] Real-time GPS streaming
- [ ] Geofencing
- [ ] IoT telemetry ingestion
- [ ] Advanced analytics
- [ ] Predictive maintenance
- [ ] PWA support
- [ ] Mobile companion application
- [ ] Additional telematics provider integrations

---

# 📌 Why This Project?

FleetManager Pro intentionally mirrors a real production environment rather than a CRUD-only portfolio application.

It combines **frontend engineering, backend development, relational database design, distributed background processing, third-party integrations, security, infrastructure, CI/CD, Linux deployment, and production operations** in one system.

---

## 👨‍💻 Author

**Mwangi Wa Mburu**

Full-Stack Software Developer

**Focus:** TypeScript • Next.js • React • Node.js • Fastify • PostgreSQL • Prisma • Redis • Docker • Linux • CI/CD

---

## ⭐ Support

If this project is useful, consider giving the repository a ⭐.