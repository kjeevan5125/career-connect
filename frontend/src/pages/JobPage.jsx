import React from 'react'
import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { getUserFromToken } from '../utils/auth';

const JobPage = ({ deleteJob }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const job = useLoaderData();

    const [applying, setApplying] = useState(false);

    const user = getUserFromToken();

    const isOwner =
        user?.role === "employer" &&
        job?.createdBy === user?.id;

    const handleApply = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        setApplying(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${job._id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            toast.success('Application submitted successfully');
        } catch (err) {
            console.error('Application error:', err);
        } finally {
            setApplying(false);
        }
    }

    const onDeleteClick = async(jobId) => {
        const confirm = window.confirm('Are you sure you want to delete this job?');

        if (!confirm) return;

        await deleteJob(jobId);
        toast.success('Job deleted successfully');
        navigate('/jobs');
    }

    return (
        <>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/jobs"
                        className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Job Listings
                    </Link>
                </div>
            </section>

            <section className="bg-indigo-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

                        <main>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                <div className="text-gray-500 mb-4">
                                    {job.type}
                                </div>

                                <h1 className="text-4xl font-bold mb-4">
                                    {job.title}
                                </h1>

                                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                    <FaMapMarker className='text-orange-700 mr-1' />
                                    <p className="text-orange-700 text-lg">
                                        {job.location}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-indigo-800 text-2xl font-bold mb-6">
                                    Job Description
                                </h3>

                                <p className="mb-4 text-xl">
                                    {job.description}
                                </p>

                                <h3 className="text-indigo-800 text-2xl font-bold mb-2">
                                    Salary
                                </h3>

                                <p className="mb-4 text-lg">
                                    {job.salary}
                                </p>
                            </div>
                        </main>

                        <aside>

                            {/* Company Info */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">
                                    Company Info
                                </h3>

                                <h2 className="text-3xl">
                                    {job.company.name}
                                </h2>

                                <p className="text-xl my-2 text-xl">
                                    {job.company.description}
                                </p>

                                <hr className="my-4" />

                                <h3 className="text-xl">
                                    Contact Email:
                                </h3>

                                <p className="text-xl my-2 bg-indigo-100 p-2 font-bold">
                                    {job.company.contactEmail}
                                </p>

                                <h3 className="text-xl">
                                    Contact Phone:
                                </h3>

                                <p className="text-xl my-2 bg-indigo-100 p-2 font-bold">
                                    {job.company.contactPhone}
                                </p>
                            </div>

                            {/* Apply button */}
                            {user?.role === "candidate" && (
                                <button
                                    onClick={handleApply}
                                    disabled={applying}
                                    className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
                                >
                                    {applying ? "Applying..." : "Apply Now"}
                                </button>
                            )}

                            {/* Employer controls */}
                            {isOwner && (
                                <div className="bg-white p-6 rounded-lg shadow-md mt-6">

                                    <h3 className="text-xl font-bold mb-6">
                                        Manage Job
                                    </h3>

                                    <button
                                        onClick={() => navigate(`/applicants/${job._id}`)}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
                                    >
                                        View Applicants
                                    </button>

                                    <Link
                                        to={`/edit-job/${job._id}`}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    >
                                        Edit Job
                                    </Link>

                                    <button
                                        onClick={() => onDeleteClick(job._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    >
                                        Delete Job
                                    </button>

                                </div>
                            )}

                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

const jobLoader = async ({ params }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${params.id}`);
    const data = await res.json();
    return data;
}

export { JobPage as default, jobLoader };