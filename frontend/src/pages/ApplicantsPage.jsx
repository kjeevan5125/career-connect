import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify";

const ApplicantsPage = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`/api/applications/job/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        setApplications(data);
      } catch (error) {
        toast.error("Error fetching applicants.");
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  const updateApplicationStatus = async (applicationId, status) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status: data.status }
            : application
        )
      );

      if (status === "accepted") {
          toast.success("Application accepted.");
      } else {
          toast.success("Application rejected.");
      }

    }
    catch (error) {
      toast.error("Error updating application.");
      console.error("Error updating application:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading applicants...
      </p>
    );
  }

  return (
    <section className="bg-indigo-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-indigo-500 mb-8">
          Applicants
        </h1>

        {applications.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold">
                  {application.applicant.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {application.applicant.email}
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

                {application.status === "pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        updateApplicationStatus(application._id, "accepted")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateApplicationStatus(application._id, "rejected")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicantsPage;