# Full-Stack Docker Deployment with CI/CD

Built with modern DevOps practices for automated, reliable deployments 🚀

🏗️ Architecture
Microservices Architecture:

Frontend: React (Vite) served via Nginx

Backend: Node.js/Express API server

Containerization: Docker with separate images for each service

Orchestration: Docker Compose for local development

📁 Project Structure
```
project-root/
├── backend/
│   ├── server.js
│   ├── server.test.js
│   ├── package.json
│   ├── Dockerfile
│   └── eslint.config.mjs
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   └── setupTests.js
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   └── eslint.config.mjs
├── compose.yaml
└── .github/
    └── workflows/
        └── ci-cd.yml
```

project board: https://www.notion.so/Deploy-Node-App-w-Docker-AWS-2aa62cf00b7680f0a15de34681d9e69f?source=copy_link

<img width="1257" height="857" alt="image" src="https://github.com/user-attachments/assets/62b05af6-df3e-49b0-8f2f-4bc3f5dc932e" />

🔄 Deployment Workflow
```
Developer pushes code to GitHub
         ↓
GitHub Actions triggered
         ↓
    ┌────┴────┐
    ↓         ↓
Backend    Frontend
Tests      Tests
    ↓         ↓
    └────┬────┘
         ↓
  All tests pass?
         ↓ YES
Docker images built
         ↓
Pushed to Docker Hub
         ↓
Ready for deployment - (IP)
    (Elastic Beanstalk / Lightrail / Render)
```


⚙️ CI/CD Pipeline Automation
Automated Workflow Triggers

On Push to main: Full pipeline execution
On Pull Request: Test and lint validation
Manual Trigger: Via GitHub Actions UI

Pipeline Stages
1. Parallel Testing (Runs Simultaneously)
```
Job: test-backend
├─ Install dependencies (npm ci)
├─ Run ESLint
└─ Run Vitest / Jest tests with coverage

Job: test-frontend  
├─ Install dependencies (npm ci)
├─ Run ESLint
├─ Run Vitest / Jest tests with coverage
└─ Build production bundle
```
2. Docker Build & Push (Only if first tests pass)
```
Job: docker-build-and-push
├─ Authenticate to Docker Hub
├─ Build backend image
├─ Build frontend image
├─ Push backend:latest to Docker Hub
└─ Push frontend:latest to Docker Hub
```
<img width="1349" height="813" alt="image" src="https://github.com/user-attachments/assets/d03ca18d-20e2-42a9-b1a6-d3031433f0da" />


# Key Automation Features
✅ Fail-Fast Testing: Backend and frontend tests run in parallel; Docker builds only if ALL tests pass

✅ Automated Image Builds: Every push to main triggers new Docker image builds

✅ Zero Manual Deployment Steps: Push code → GitHub Actions handles the rest

✅ Code Quality Gates: ESLint must pass before builds proceed

✅ Test Coverage Reports: Vitest generates coverage for both services (IP)

✅ Dependency Caching: npm ci ensures reproducible builds from lock files

# Docker Specific Features
```
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
```
In my Dockerfiles, I decided to: 

🔒 Incorporate Bind Mounts for Lock Files (--mount=type=bind)
    - this temporarily mounts package.json and package-lock.json without copying them. 
    - Docker can detect if these files changed WITHOUT invalidating the cache layer
    - This layer only rebuilds when the dependencies change.

📦 I also use BuildKit Cache Mounts (--mount=type=cache)
    - This creates a persistent cache directory at /root/.npm so it survives across builds (not part of final image)
    - Optimization: we can reuse packages instead of reinstalling everytime we run this file. 

# 📝 Environment Variables

Backend:

PORT - Server port (default: 4000)

NODE_ENV - Environment mode (development/production)

Frontend:

VITE_API_URL - Backend API URL (configurable per environment)

# 🔐 Security Considerations

✅ Non-root user in Docker containers

✅ CORS configured for specific origins

✅ Dependencies scanned during npm ci

✅ Minimal base images (Alpine Linux)

✅ Secrets managed via GitHub Secrets (not committed)


# Local Testing
- verify containers are working as intended:

---------------------------
Pull images from Docker Hub
---------------------------

$docker pull cchinothai/deploy-web-app-backend:latest

$docker pull cchinothai/deploy-web-app-frontend:latest

--------------
Run containers
--------------

$ docker run -d -p 4000:4000 --name backend-container cchinothai/deploy-web-app-backend:latest

$ docker run -d -p 3000:80 --name frontend-container cchinothai/deploy-web-app-frontend:latest

```
# Pull latest images from Docker Hub
$ docker-compose pull

#Check current running containers
$ docker ps

# Start all services
$ docker-compose up

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:4000
```
<img width="1918" height="1610" alt="docker desktop container" src="https://github.com/user-attachments/assets/1bb9250c-34c1-4d6b-8895-aca5f532ecd7" />

🎓 Key Learnings


1. Infrastructure as Code: Dockerfiles and compose.yaml define entire stack

2. Automated Quality Checks: Tests and linting prevent bad code from deploying

3. Parallel Execution: Speeds up CI/CD pipeline significantly

4. Container Networking: Services communicate via Docker network in production

5. Immutable Deployments: Docker images ensure consistency across environments





