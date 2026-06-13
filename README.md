<div align="center">

# Task Management website

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

[Онцлогууд](#-гол-онцлогууд) •
[Tech Stack](#-ашигласан-технологиуд) •
[Эхлүүлэх](#-суулгах-ба-ажиллуулах) •
[API](#-api-endpoints) •
[Images](#-Images)
</div>

---

## Танилцуулга

**Task management** нь хувь хүн болон багийн даалгавруудыг үр дүнтэй удирдах, хянах, зохион байгуулах зориулалттай бүрэн хэмжээний вэб аппликейшн юм. Олон Workspace үүсгэх, даалгавар хуваарилах, хугацаа хянах, мөн дэлгэрэнгүй статистик харах боломжийг нэг дор олгоно.

---

## ✨ Гол онцлогууд

### 📊 Dashboard & Overview
- **Бүх Workspace-ийн тойм** — Нийт даалгаврын тоо, дууссан, хийгдэж буй, хугацаа дууссан статистик
- **Өнөөдөр дуусах (Due Today)** — Өнөөдөр хугацаа нь дуусах даалгавруудыг шууд харах
- **High Priority** — Яаралтай чухал даалгавруудын тусгай хэсэг
- **Overdue Alert** — Хугацаа нь хэтрэн даалгавруудыг тодотгон сануулах

### 📋 Task Management
- **2 төрлийн харагдац:**
  - **List View** — Хүснэгт хэлбэртэй, бүх баганын мэдээлэлтэй
  - **Board View** — Kanban самбар (To do → In progress → Completed)
- **Drag & Drop** — `@dnd-kit` ашиглан task-уудыг чирж дарааллыг өөрчлөх
- **Smart Filters** — Priority, Status, Category-ээр шүүх
- **Advanced Sorting** — Шинэ, хуучин, Priority, Deadline-ээр эрэмбэлэх
- **Real-time Search** — Нэр, тайлбараар хайх
- **Deadline Counter** — "Өнөөдөр", "Маргааш", "3 өдрийн дараа" гэх мэт хугацааны харуулалт

### 🗂️ Workspace Management
- Олон Workspace үүсгэх, засах, устгах
- Workspace тус бүрээр даалгавруудыг тусгаарлах
- **Resizable Sidebar** — Зүүн цэсний өргөнийг чирж тохируулах
- **Custom Icons** — Workspace бүрт өөрийн icon сонгох

### 🔐 Security
- JWT-based Authentication
- Password hashing (bcrypt)
- Protected API routes
- Role-based access control

---

## 🛠️ Ашигласан технологиуд

### Frontend
| Технологи | Хэрэглээ |
|-----------|----------|
| **React 18** | UI framework (Vite build tool) |
| **Tailwind CSS** | Utility-first CSS framework |
| **@dnd-kit** | Drag and Drop функц |
| **Axios** | HTTP хүсэлт |
| **Socket.IO Client** | Бодит цагийн мэдэгдэл |
| **React Hooks** | Custom hooks архитектур |

### Backend
| Технологи | Хэрэглээ |
|-----------|----------|
| **Node.js 22** | Runtime |
| **Express** | Web framework |
| **MongoDB 7 + Mongoose** | NoSQL өгөгдлийн сан |
| **Socket.IO** | Бодит цагийн сервер |
| **JWT (jsonwebtoken)** | Authentication |
| **bcrypt** | Password hashing |
| **dotenv** | Environment variables |
| **CORS** | Cross-Origin Resource Sharing |

### DevOps & Infrastructure
| Технологи | Хэрэглээ |
|-----------|----------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Nginx** | Production web server & reverse proxy |
| **Git** | Version control |

---

## 📁 Проектын бүтэц

```
Task_Management/
├── frontend/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Sidebar.jsx      # Resizable sidebar
│   │   │   ├── TopBar.jsx       # Top navigation
│   │   │   ├── TaskTable.jsx    # List view table
│   │   │   ├── TaskModal.jsx    # Create/Edit modal
│   │   │   ├── WorkspaceModal.jsx
│   │   │   └── ConfirmModal.jsx # Delete confirmation
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── components/  # Overview, BoardView, EmptyState
│   │   │   │   └── hooks/       # useTasks, useWorkspaces, useOverviewTasks
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── authcontext.jsx  # Auth state management
│   │   └── api/
│   │       └── axios.js         # Axios instance + interceptors
│   ├── Dockerfile               # Multi-stage Docker build
│   ├── nginx.conf               # Nginx тохиргоо (SPA routing)
│   └── package.json
│
├── backend/                     # Node.js Backend
│   ├── modules/
│   │   ├── auth/                # Auth routes, controllers
│   │   ├── workspace/           # Workspace CRUD
│   │   └── task/                # Task CRUD
│   ├── middleware/
│   │   └── Authorization.js     # JWT middleware + Socket auth
│   ├── routers.js               # Route aggregator
│   ├── app.js                   # Entry point
│   ├── Dockerfile               # Multi-stage Docker build
│   └── package.json
│
├── docker-compose.yml           # Production Docker setup
├── .gitignore
└── README.md
```

---

## Images

<table>
  <tr>
    <td align="center">
      <img src="Images/Login.png   " /><br>
    </td>
    <td align="center">
      <img src="Images/Register.png   "/><br>
    </td>
    <td align="center">
      <img src="Images/Dashboard.png   "/><br>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="Images/Workspace-list.png   " /><br>
    </td>
    <td align="center">
      <img src="Images/Workspace-board.png   "/><br>
    </td>
    <td align="center">
      <img src="Images/Create-Task.png   "/><br>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="Images/Create-Workspace.png   " /><br>
    </td>
    <td align="center">
      <img src="Images/Delete-Task.png   "/><br>
    </td>
    <td align="center">
      <img src="Images/Delete-Worksapce.png   "/><br>
    </td>
  </tr>
</table>
---

## Суулгах ба ажиллуулах

Танд **2 арга** байна. Хэрэглэх тохиолдлоос хамаарч сонгоно уу:

### 📋 Шаардлагатай урьдчилсан нөхцөлүүд

| Арга | Шаардлагатай зүйлс |
|------|-------------------|
| **🐳 Docker** | Docker 20.10+, Docker Compose V2, Git |
| **💻 Local Dev** | Node.js 18+, MongoDB 6+, npm/yarn, Git |

---

### 🐳 Арга 1: Docker Compose ашиглах (ЗӨВЛӨМЖ)

**Хамгийн хурдан, найдвартай арга.** MongoDB, Backend, Frontend (Nginx) бүгд нэг командаар ажиллана.

#### Алхам 1: Repository-г татах

```bash
git clone https://github.com/enkush-3/Task-Management.git
cd opm
```

#### Алхам 2: Environment тохиргоо үүсгэх

Backend хавтас дотор `.env` файл үүсгэнэ:

```bash
cd backend
cat > .env << 'EOF'
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/taskdb
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLIENT_URL=http://localhost:8080
NODE_ENV=production
EOF
cd ..
```

> ⚠️ **ЧУХАЛ:** Production-д `JWT_SECRET`-г заавал өөрчил!

#### Алхам 3: Docker Compose-оор ажиллуулах

```bash
# Бүх service-ийг build хийж эхлүүлэх
docker compose up -d --build
```

#### Алхам 4: Статус шалгах

```bash
docker compose ps
```

**Ийм харагдах ёстой:**
```
NAME           SERVICE   STATUS    PORTS
opm-mongodb    mongodb   running   0.0.0.0:27017->27017/tcp
opm-backend    backend   running   0.0.0.0:3000->3000/tcp
opm-frontend   frontend  running   0.0.0.0:8080->80/tcp
```

#### Алхам 5: Аппликейшн руу орох

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:8080 |
| **Backend API** | http://localhost:3000 |
| **MongoDB** | mongodb://localhost:27017 |

#### 📦 Хэрэгтэй Docker командууд

```bash
# Логуудыг харах (real-time)
docker compose logs -f

# Зөвхөн backend-ийн лог
docker compose logs -f backend

# Service-г дахин эхлүүлэх
docker compose restart backend

# Бүхнийг зогсоох
docker compose down

# Volume устгах (бүх MongoDB data устна!)
docker compose down -v

# Бүхнийг цэвэрлэж дахин эхлүүлэх
docker compose down -v --rmi all
docker compose up -d --build
```

---

### 💻 Арга 2: Local Development (Hot Reload)

**Хөгжүүлэлт хийхэд тохиромжтой.** Код өөрчлөхөд автоматаар шинэчлэгдэнэ.

#### Алхам 1: Урьдчилсан шаардлагуудыг суулгах

**Ubuntu/Debian дээр:**

```bash
# Node.js 22 суулгах (NVM ашиглавал илүү дээр)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22

# MongoDB 7 суулгах
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# MongoDB service эхлүүлэх
sudo systemctl start mongod
sudo systemctl enable mongod

# Шалгах
mongosh --eval "db.runCommand({ ping: 1 })"
```

**macOS дээр (Homebrew):**

```bash
# Node.js
brew install node@22

# MongoDB
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows дээр:**
- [Node.js](https://nodejs.org/) татаж суулгах
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) татаж суулгах

#### Алхам 2: Repository-г татах

```bash
git clone https://github.com/enkush-3/Task-Management.git
cd opm
```

#### Алхам 3: Backend тохируулах

**Terminal 1:**
```bash
cd backend
npm install

# .env файл үүсгэх
cat > .env << 'EOF'
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=dev_secret_key_123
CLIENT_URL=http://localhost:5173
NODE_ENV=development
EOF

# Backend эхлүүлэх
npm start
```

**Амжилттай гарвал:**
```
 Mongodb connected
 Server running on port 3000
```

#### Алхам 4: Frontend тохируулах

**Terminal 2 (шинэ цонх):**
```bash
cd frontend
npm install

# .env файл үүсгэх
cat > .env << 'EOF'
VITE_API_URL=http://localhost:3000/api
EOF

# Frontend эхлүүлэх
npm run dev
```

**Амжилттай гарвал:**
```
  VITE v8.0.16  ready in 476 ms

  ➜  Local:   http://localhost:5173/
```

#### Алхам 5: Аппликейшн руу орох

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:3000 |
| **MongoDB** | mongodb://localhost:27017 |

---

## 🔧 Troubleshooting

### ❌ Port 27017 аль хэдийн ашиглагдаж байна

```bash
# Локал MongoDB-г зогсоох
sudo systemctl stop mongod

# Эсвэл Docker-д өөр порт ашиглах
# docker-compose.yml дотор: ports: "27018:27017"
```

### ❌ `docker-compose: command not found`

```bash
# Docker Compose V2 plugin суулгах
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose

# Зөв бичих: docker compose (зайтай)
docker compose up -d --build
```

### ❌ `Cannot find module '/app/app.js'` (Frontend container)

Frontend-ийн Dockerfile production stage-д Nginx биш Node.js тохируулга орсон байна. `frontend/Dockerfile`-г шалга:

```dockerfile
FROM nginx:alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### ❌ `unknown directive "cat" in nginx.conf`

`frontend/nginx.conf` файлын дотор `cat`, `EOF` гэх мэт shell командууд орчихсон байна. Зөвхөн nginx config-г л хуул:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### ❌ MongoDB `ECONNREFUSED` алдаа

`backend/app.js`-д `MONGODB_URI`-г env-ээс уншиж байгаа эсэхийг шалга:

```javascript
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/taskdb";
await mongoose.connect(mongoUri);
```

Docker-д `docker-compose.yml`-д заавал оруул:
```yaml
environment:
  MONGODB_URI: mongodb://mongodb:27017/taskdb
```

### ❌ CORS алдаа

`backend/app.js`-д `CLIENT_URL`-г зөв тохируулсан эсэхийг шалга:

```javascript
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(url => url.trim())
    : ['http://localhost:5173', 'http://localhost:8080'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Тайлбар |
|--------|----------|---------|
| POST | `/api/auth/register` | Шинэ хэрэглэгч бүртгэх |
| POST | `/api/auth/login` | Нэвтрэх (JWT буцаана) |

### Workspace
| Method | Endpoint | Тайлбар |
|--------|----------|---------|
| GET | `/api/workspace/getall` | Хэрэглэгчийн бүх workspace |
| POST | `/api/workspace/create` | Шинэ workspace үүсгэх |
| PATCH | `/api/workspace/update/:id` | Workspace засах |
| DELETE | `/api/workspace/:id` | Workspace устгах |
| GET | `/api/workspace/getlazy/:id` | Workspace-ийн task-ууд (pagination, filter) |
| GET | `/api/workspace/getlazyall` | Бүх workspace-ийн task-ууд (Overview) |

### Task
| Method | Endpoint | Тайлбар |
|--------|----------|---------|
| POST | `/api/task/create?workspaceId=` | Шинэ task үүсгэх |
| PATCH | `/api/task/update/:id` | Task засах |
| DELETE | `/api/task/:id` | Task устгах |

### Query Parameters (getlazy, getlazyall)

| Parameter | Type | Тайлбар |
|-----------|------|---------|
| `page` | number | Хуудасны дугаар (default: 1) |
| `limit` | number | Нэг хуудасны task тоо (default: 10) |
| `sortBy` | string | `newest` \| `oldest` \| `priority` \| `deadline` |
| `priority` | string | `all` \| `High` \| `Medium` \| `Low` |
| `status` | string | `all` \| `To do` \| `In progress` \| `Completed` |
| `search` | string | Хайлтын keyword |

---
