import React from 'react';
import { 
  Route, 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider 
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage, {jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import NotFoundPage from './pages/NotFoundPage';
import EditJobPage from './pages/EditJobPage';
import LoginPage from './pages/LoginPage';
import MyApplications from './pages/MyApplications';
import ApplicantsPage from './pages/ApplicantsPage';
import RegisterPage from './pages/RegisterPage';



const App = () => {
  const addJob = async (newJob) => {
    const token = localStorage.getItem('token');

    const res = await fetch('/api/jobs',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newJob)
    })

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add job');
    }

    return;
  }

  //Delete Job
  const deleteJob = async(id)=>{
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/jobs/${id}`,{
      method: 'DELETE',
      headers: {
          Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete job');
    }

    return;
  }

  //Update Job
  const updateJob = async (updatedJob) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/jobs/${updatedJob.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedJob)
    })

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update job');
    }
    
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
      <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
      <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/my-applications" element={<MyApplications />} />
      <Route path="/applicants/:id" element={<ApplicantsPage />} />
    </Route>)
  );


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;