import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("candidate");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            toast.success("Registration successful. Please login.");

            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <section className="bg-indigo-50 min-h-screen">
            <div className="container m-auto max-w-lg py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border">

                    <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">
                                Register As
                            </label>

                            <select
                                className="border rounded w-full py-2 px-3"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="candidate">Candidate</option>
                                <option value="employer">Employer</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Register
                        </button>

                        <p className="text-center mt-4">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-indigo-500 hover:text-indigo-600 font-semibold"
                            >
                                Login
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;