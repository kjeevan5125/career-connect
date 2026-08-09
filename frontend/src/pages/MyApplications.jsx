import { useEffect,useState } from "react";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');

            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/my`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if(!res.ok){
                    console.error(data.message);
                    return;
                }
                setApplications(data);
            }   catch (error) {
                console.error('Error fetching applications:', error);
            }   finally {
                setLoading(false);
            }
        }

        fetchApplications();
    }, []);

    if(loading){
        return <p className="text-center mt-10">Loading applications...</p>;
    }

    return (
    <section className="bg-indigo-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-indigo-500 mb-8">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <p>You haven't applied for any jobs yet.</p>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-bold">
                  {application.job.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {application.job.company.name}
                </p>

                <p className="mt-2">
                  Location: {application.job.location}
                </p>

                <p className="mt-2">
                  Salary: {application.job.salary}
                </p>

                <p className="mt-4 font-semibold">
                  Status:{" "}
                  <span
                      className={
                          application.status === "accepted"
                              ? "text-green-600"
                              : application.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                      }
                  >
                      {application.status}
                  </span>
              </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyApplications;
