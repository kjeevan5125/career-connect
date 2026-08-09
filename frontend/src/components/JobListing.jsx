import React from 'react'
import {useState} from 'react';
import {FaMapMarker} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobListing = ({job}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    let description = job.description;
    if (!showFullDescription && description.length > 100) {
        description = description.substring(0, 90) + '...';
    }

    return (
        <div className="bg-white rounded-xl shadow-md relative">
                <div className="p-4">

                    <div className="mb-6">
                    <div className="text-gray-600 my-2">{job.type}</div>

                    <h3 className="text-2xl font-bold">
                        {job.title}
                    </h3>
                    </div>

                    <div className="mb-5 text-xl text-gray-600">
                        {description}
                    </div>

                    <button 
                        onClick={() => setShowFullDescription((prevState) => !prevState)}
                        className="text-indigo-500 mb-5 hover:text-indigo-500 mb-5">{showFullDescription ? 'Less' : 'More'}
                    </button>

                    <h3 className="text-indigo-500 mb-2 text-lg">
                        {job.salary}
                    </h3>

                    <div className="border border-gray-100 mb-5"></div>

                    <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3 text-lg">
                        <FaMapMarker className="inline text-xl mb-1 mr-1" />
                        {job.location}
                    </div>

                    <Link
                        to={`/jobs/${job._id}`}
                        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-lg font-semibold flex items-center justify-center"
                    >
                        Read More
                    </Link>
                    </div>

                </div>
            </div>
    )
}

export default JobListing