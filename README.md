***Career-Connect***

A full-stack MERN job portal connecting candidates and employers with role-based authentication, job management, applications, and application tracking.

**Features**

*Candidate*
1.Register and login
2.Browse jobs
3.View job details
4.Apply for jobs
5.Prevent duplicate applications
6.View applied jobs
7.Track application status

*Employer*
1.Register and login
2.Add jobs
3.Edit own jobs
4.Delete own jobs
5.View applicants
6.Accept or reject applications
7.Employer ownership protection

*Authentication & Security*
1.JWT-based authentication
2.Password hashing using bcrypt
3.Role-based authorization
4.Protected API routes
5.Employer ownership verification
6.Environment variables for sensitive data

**Tech Stack**

*Frontend*
1.React
2.React Router
3.Tailwind CSS
4.React Toastify
5.React Icons
6.Vite

*Backend*
1.Node.js
2.Express.js
3.MongoDB
4.Mongoose
5.JWT
6.bcryptjs

**Project Structure**

Career-Connect/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── seeders/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       └── utils/
│
└── README.md

**Application Flow**

User
 ↓
Register / Login
 ↓
JWT Authentication
 ↓
Role-based Access
 ├── Candidate
 │   ├── Browse Jobs
 │   ├── Apply
 │   └── Track Applications
 │
 └── Employer
    ├── Add Jobs
    ├── Edit/Delete Own Jobs
    ├── View Applicants
    └── Accept/Reject Applications

**API ENDPOINTS**

*Authentication*
POST /api/auth/register
POST /api/auth/login

*Jobs*
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id

*Applications*
POST /api/applications/:jobId
GET  /api/applications/my
GET  /api/applications/job/:jobId
PUT  /api/applications/:applicationId

*Environment Variables*
Create a .env file inside the backend directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Never commit .env to GitHub.

**Installation**

*Backend*
cd backend
npm install
npm start

*Frontend*
cd frontend
npm install
npm run dev

*Security*
1.JWT authentication
2.Password hashing with bcrypt
3.Role-based authorization
4.Protected API routes
5.Employer ownership verification
6.Duplicate application prevention

*Future Improvements*
1.Resume upload
2.Job search and filtering
3.Email notifications
4.Employer dashboard
5.Candidate profiles
6.Pagination
7.Application withdrawal
8.Production deployment