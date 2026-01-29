## Job Portal Web App

### What this project does

- Simple job portal made for practice.
- You can:
  - Create an account.
  - Log in with email and password.
  - See a list of jobs.
  - Open a job and see details.
  - Apply to a job when logged in.

### Tech stack

- **Frontend**
  - React.js
  - React Router DOM
  - Axios
  - Plain CSS (flexbox layout)

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Token (JWT) for auth
  - bcrypt for password hashing
  - CORS

---

### Folder structure (short)

```text
ca1/
  backend/
    config/
    models/
    routes/
    middleware/
    seed/
  frontend/
    public/
    src/
      components/
      pages/
      routes/
      services/
  .env.example
```

---

### Setup: environment files

1. Go to the project root.
2. Copy `.env.example` into:
   - `backend/.env`
   - `frontend/.env` (optional, only if you want to change API URL)
3. Basic values:

```bash
# backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job_portal
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000

# frontend/.env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

Make sure MongoDB is running and `MONGO_URI` is correct for your machine.

---

### How to run backend

```bash
cd backend
npm install
npm run seed   # optional, adds sample jobs
npm start
```

The API runs on `http://localhost:5000`.

---

### How to run frontend

```bash
cd frontend
npm install
npm start
```

The React app runs on `http://localhost:3000`.
It calls the backend at `http://localhost:5000/api` (or the URL in `REACT_APP_API_BASE_URL`).

---

### Basic flow

- Open `http://localhost:3000`.
- Register a new user.
- Log in.
- Browse jobs.
- Open a job page.
- Click apply and confirm.

