import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch("/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            const data = await res.json();
            if(!res.ok){
                toast(data.message);
                return;
            }

            localStorage.setItem("token",data.token);
            window.dispatchEvent(new Event("authChange"));
            navigate("/");
        }catch(err){
            console.error("Login error:",err);
        }
    };

    return (
    <section className="bg-indigo-50 min-h-screen">
      <div className="container m-auto max-w-lg py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border">
          <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>

              <input
                type="email"
                className="border rounded w-full py-2 px-3 mb-2"
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
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4">
              Don't have an account?{" "}
              <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-indigo-500 hover:text-indigo-600 font-semibold"
              >
                  Register
              </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;