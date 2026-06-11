# Хөгжүүлэгдэж дуусаагүй болно

---
# Demo images

<table>
  <tr>
    <td align="center">
      <img src="Demo-images/Screenshot%20From%202026-06-12%2000-09-40.png"/><br>
      <b>Нүүр хуудас</b>
    </td>
    <td align="center">
      <img src="Demo-images/Screenshot%20From%202026-06-12%2000-09-46.png"/><br>
      <b>Task-ын жагсаалт</b>
    </td>
    <td align="center">
      <img src="Demo-images/Screenshot%20From%202026-06-12%2000-09-53.png"/><br>
      <b>Task-ын kanban</b>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">
      <img src="Demo-images/Screenshot%20From%202026-06-12%2000-10-18.png"/><br>
      <b>Task засах, үүсгэх</b>
    </td>
    <td align="center">
      <img src="Demo-images/Screenshot%20From%202026-06-12%2000-10-25.png"/><br>
      <b>Workspace засах, үүсгэх</b>
    </td>
  </tr>
</table>

---

# Task Management

**Task Management** нь хувь хүн болон багийн даалгавруудыг (Tasks) үр дүнтэй удирдах, хянах, зохион байгуулах зориулалттай орчин үеийн веб аппликейшн юм. Workspace үүсгэх, даалгавар хуваарилах, хугацаа хянах, мөн дэлгэрэнгүй статистик харах боломжийг олгоно.

---

## Гол онцлогууд (Features)

### Dashboard & Overview
- **Бүх Workspace-ийн тойм:** Нийт даалгаврын тоо, дууссан, хийгдэж буй, хугацаа дууссан даалгавруудын статистик.
- **Өнөөдөр дуусах (Due Today):** Өнөөдөр хугацаа нь дуусах даалгавруудыг шууд харах.
- **High Priority:** Яаралтай чухал даалгавруудын жагсаалт.
- **Хугацаа дууссан сануулга (Overdue Alert):** Хугацаа нь хэтрсэн даалгавруудыг тодотгон харуулна.

### Task Management
- **2 төрлийн харагдац (View Modes):** 
  - **List View:** Хүснэгт хэлбэртэй, багануудыг (Нэр, Статус, Хугацаа, Priority гэх мэт) харж болно.
  - **Board View:** Kanban самбар хэлбэрээр (To do, In progress, Completed) харах.
- **Фильтр, Эрэмбэлэлт, Хайлт:** Priority, Status-ээр шүүх; Шинэ, хуучин, Priority, Deadline-ээр эрэмбэлэх; Нэр эсвэл тайлбараар хайх.
- **Deadline Counter:** Даалгавар дуусах хугацааг тоолж харуулах (Өнөөдөр, Маргааш, Хэдэн өдрийн дараа гэх мэт).

### ️ Workspace Management
- Олон Workspace үүсгэх, засах, устгах.
- Workspace тус бүрээр даалгавруудыг тусгаарлах.
- Resizable Sidebar: Зүүн цэсний өргөнийг чирж тохируулах боломжтой.

---

## Ашигласан технологиуд (Tech Stack)

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (UI дизайн)
- **@dnd-kit/core & @dnd-kit/sortable** (Drag and Drop)
- **Axios** (API хүсэлт)
- **React Hooks** (Custom hooks: `useTasks`, `useWorkspaces`, `useOverviewTasks`)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Өгөгдлийн сан)
- **Socket.IO** (Бодит цагийн мэдэгдэл)
- **JWT** (Хэрэглэгчийн баталгаажуулалт)
- **dotenv** (Орчны хувьсагчид)

---

## Проектын бүтэц (Project Structure)

```
opm/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # Нийтлэг компонентууд (Sidebar, Modals, TaskTable)
│   │   ├── pages/
│   │   │   └── dashboard/    # Үндсэн Dashboard хуудас
│   │   │       ├── components/ # Dashboard-ийн компонентууд (TopBar, BoardView, Overview)
│   │   │       └── hooks/      # Custom hooks (useTasks, useWorkspaces)
│   │   ├── context/          # Auth Context
│   │   └── api/              # Axios тохиргоо
│   ── package.json
│
└── backend/                  # Node.js Backend
    ├── modules/
    │   ├── auth/             # Auth logic
    │   ├── workspace/        # Workspace CRUD & Routes
    │   └── task/             # Task CRUD & Routes
    ├── middleware/           # JWT & Auth middleware
    └── app.js                # Server entry point
```

---

## Суулгах ба ажиллуулах (Installation & Setup)

### 1. Repository-г татах
```bash
git clone https://github.com/your-username/opm.git
cd opm
```

### 2. Backend тохируулах
```bash
cd backend
npm install
```
`.env` файл үүсгэж дараах утгуудыг бичнэ үү:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/opm_db
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```
Backend-ийг ажиллуулах:
```bash
npm start
```

### 3. Frontend тохируулах
```bash
cd ../frontend
npm install
```
`.env` файл үүсгэх (хэрэв шаардлагатай бол):
```env
VITE_API_URL=http://localhost:3000/api
```
Frontend-ийг ажиллуулах:
```bash
npm run dev
```

---

##  API Endpoints (Товч тойм)

| Method | Endpoint | Тайлбар |
|--------|----------|---------|
| **POST** | `/api/auth/register` | Бүртгэл үүсгэх |
| **POST** | `/api/auth/login` | Нэвтрэх |
| **GET** | `/api/workspace/getall` | Бүх workspace авах |
| **POST** | `/api/workspace/create` | Шинэ workspace үүсгэх |
| **GET** | `/api/workspace/getlazy/:id` | Тодорхой workspace-ийн task-ууд (Pagination-тай) |
| **GET** | `/api/workspace/getlazyall` | Бүх workspace-ийн task-ууд (Overview-д зориулсан) |
| **POST** | `/api/task/create` | Шинэ task үүсгэх |
| **PATCH** | `/api/task/update/:id` | Task засах |
| **DELETE** | `/api/task/:id` | Task устгах (Soft delete) |

 