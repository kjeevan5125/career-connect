import React from 'react'

const Hero = ({
    title="Your New Opportunity Starts Here", 
    subtitle="Discover jobs that match your skills and take the next step toward your career."
}) => {
    return (
        <section className="bg-indigo-700 py-20 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-white sm:text-5xl md:text-6xl">
                {title}
                </h1>

                <p className="my-4 text-2xl text-white">
                {subtitle}
                </p>
            </div>
            </div>
        </section>
    )
}

export default Hero