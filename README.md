# DroneTV AI Support & Lead Assistant

A full-stack web application for DroneTV visitors to explore services
and courses, use a rule-based chatbot, and submit enquiries. Admins can
sign in and manage enquiries through a dashboard.

> **Live demo:** Not deployed yet.

## Features

-   Responsive home, services, courses, and contact pages.
-   Rule-based chatbot with predefined answers.
-   Enquiry form with validation.
-   MongoDB persistence for enquiries.
-   Admin token login.
-   Admin enquiry list, search, visitor-type/status filters, detail
    retrieval, status updates, and deletion.
-   API validation and centralized error handling.

## Technologies

-   **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, React
    Router, Axios, Lucide React.
-   **Backend:** Node.js, Express 5, TypeScript, Mongoose, MongoDB,
    CORS, dotenv.
-   **Tools:** Git, GitHub, Postman or Thunder Client.

## Project structure

``` text
FullStack_Chatbot_Task_Naina_Kumari/
├── backend/
│   ├── src/
│   │   ├── config/db.ts
│   │   ├── controllers/
│   │   │   ├── admin.controller.ts
│   │   │   └── enquiry.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validateEnquiry.ts
│   │   ├── models/Enquiry.ts
│   │   ├── routes/
│   │   │   ├── admin.routes.ts
│   │   │   └── enquiry.routes.ts
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/chatbotResponses.ts
│   │   ├── hooks/useChatbot.ts
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/AppRoutes.tsx
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── docs/
│   └── screenshots/
├── API_Documentation.md
└── README.md
```

## Prerequisites

Install Node.js (LTS recommended), npm, and MongoDB (local) or create a
MongoDB Atlas database.

## Setup and run instructions

### 1. Clone the repository

.

``` bash
git clone https://github.com/Naina-World/FullStack_Chatboat_Task_Naina_Kumari.git
cd FullStack_Chatbot_Task_Naina_Kumari
```

### 2. Configure MongoDB

For a local MongoDB installation, you can use:

``` text
mongodb://127.0.0.1:27017/dronetv_assistant
```

For MongoDB Atlas, create a cluster and database user, allow your
development IP in Network Access, and use the Atlas connection string as
`MONGODB_URI`.

### 3. Configure and start the backend

``` bash
cd backend
npm install
```

Create `backend/.env`:

``` env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/dronetv_assistant
ADMIN_TOKEN=624c4c9fe40c9a0725d1e8807801e32f904acdb05b962858aacf3f2890fb0d68

```

Use your own strong, private admin token. Never commit `.env` or share
its values.

Start the backend:

``` bash
npm run dev
```

The backend runs at `http://localhost:5000`.

Health check: `GET http://localhost:5000/`

Production build commands:

``` bash
npm run build
npm start
```

### 4. Configure and start the frontend

Open a second terminal from the repository root:

``` bash
cd frontend
npm install
```

Create `frontend/.env`:

``` env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

``` bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.
Restart Vite after changing environment variables.

## Environment variables

### Backend (`backend/.env`)

  -----------------------------------------------------------------------------------------------
  Variable                Purpose                 Example
  ----------------------- ----------------------- -----------------------------------------------
  `PORT`                  Express port            `5000`

  `CLIENT_URL`            Allowed frontend origin `http://localhost:5173`
                          for CORS                

  `MONGODB_URI`           MongoDB connection      `mongodb://127.0.0.1:27017/dronetv_assistant`
                          string                  

  `ADMIN_TOKEN`           Secret for current      Use a private random value
                          admin token login       
  -----------------------------------------------------------------------------------------------

### Frontend (`frontend/.env`)

  Variable         Purpose                Example
  ---------------- ---------------------- -----------------------------
  `VITE_API_URL`   Backend API base URL   `http://localhost:5000/api`

Variables prefixed with `VITE_` are exposed to browser code. Do not put
secrets in frontend environment variables.

## Database schema

Mongoose connects to MongoDB using `MONGODB_URI`. Enquiry documents
contain:

  -----------------------------------------------------------------------
  Field                               Type / allowed values
  ----------------------------------- -----------------------------------
  `_id`                               MongoDB ObjectId

  `name`                              String, required, 2--100 characters

  `email`                             String, required, stored lowercase

  `phone`                             String, required, up to 25
                                      characters

  `userType`                          `Student`, `Customer`, or `Other`

  `interest`                          String, required, up to 150
                                      characters

  `message`                           String, required, 5--2000
                                      characters

  `status`                            `New`, `Contacted`, `In Progress`,
                                      or `Closed`; defaults to `New`

  `createdAt`, `updatedAt`            Mongoose timestamps
  -----------------------------------------------------------------------

No seed data is required. Submit an enquiry to create the first
document.

## API endpoints

Base URL: `http://localhost:5000/api`

Protected endpoints require:

``` http
Authorization: Bearer YOUR_ADMIN_TOKEN
```

  Method     Endpoint                            Access   Purpose
  ---------- ----------------------------------- -------- ---------------------------
  `GET`      `/` (base server URL, not `/api`)   Public   Health check
  `POST`     `/admin/login`                      Public   Verify admin token
  `POST`     `/enquiries`                        Public   Submit enquiry
  `GET`      `/enquiries`                        Admin    List and filter enquiries
  `GET`      `/enquiries/:id`                    Admin    Get one enquiry
  `PATCH`    `/enquiries/:id`                    Admin    Update enquiry
  `PUT`      `/enquiries/:id`                    Admin    Update enquiry
  `DELETE`   `/enquiries/:id`                    Admin    Delete enquiry

### Admin login

`POST /admin/login`

``` json
{
  "token": "YOUR_ADMIN_TOKEN"
}
```

### Create enquiry

`POST /enquiries`

``` json
{
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "userType": "Student",
  "interest": "General Enquiry",
  "message": "I would like more information."
}
```

### List and filter enquiries

`GET /enquiries`

Optional query parameters: - `userType`: `Student`, `Customer`, or
`Other` - `status`: `New`, `Contacted`, `In Progress`, or `Closed` -
`q`: searches name, email, and interest

Example: `/api/enquiries?userType=Student&status=New&q=Rahul`

**Frontend note:** The backend currently reads the text-search parameter
as `q`. Update the frontend service to send `q` rather than `search` if
you want the dashboard text search to work.

### Update status

`PATCH /enquiries/:id`

``` json
{
  "status": "Contacted"
}
```

Common status codes: `200` success, `201` created, `400` invalid input,
`401` missing/invalid admin token, `404` not found, `500` server error.

See [`API_Documentation.md`](./API_Documentation.md) for more request
and response details. Add that file to the repository before submission
if it is not already present.

## Screenshots

Save screenshots of the running application in `docs/screenshots/`.
Replace these example paths with the actual files you add:

  Page              Screenshot path
  ----------------- ----------------------------------------
  Home              `docs/screenshots/home.png`
  Services          `docs/screenshots/services.png`
  Courses           `docs/screenshots/courses.png`
  Chatbot           `docs/screenshots/chatbot.png`
  Contact form      `docs/screenshots/contact-form.png`
  Admin login       `docs/screenshots/admin-login.png`
  Admin dashboard   `docs/screenshots/admin-dashboard.png`

Example Markdown image syntax after adding the file:

``` md
![Home page](docs/screenshots/home.png)
```

## Live demo

Not deployed yet. After deployment, replace this text with the public
frontend URL and, if useful, the backend API URL. Never publish admin
tokens or database credentials.

## Before pushing to GitHub

-   Create the repository named
    `FullStack_Chatbot_Task_FirstName_LastName`, replacing the
    placeholders with your actual first and last name.
-   Add this README, `API_Documentation.md`, and real screenshots.
-   Add `.env.example` files with placeholder values only.
-   Ensure `.env`, `node_modules`, and build output are excluded.
-   Run `git status` and inspect all staged files before committing.

Example commands from the project root:

``` bash
git init
git add .
git status
git commit -m "Initial project submission"
git branch -M main
git remote add origin https://github.com/Naina-World/FullStack_Chatboat_Task_Naina_Kumari.git
git push -u origin main
