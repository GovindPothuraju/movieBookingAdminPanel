import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import axios from "axios";

const Register = ({ setScreen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://moviebookingbackend-icoh.onrender.com/admin/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Registration Successful");
        setScreen("login");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      <h1 className="text-4xl font-bold text-heading">
        Create Account
      </h1>

      <p className="mt-2 text-text-gray">
        Register to manage your cinema operations.
      </p>

      <div className="mt-10 space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-heading"
          >
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"
            />

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-border-light bg-white py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-heading"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"
            />

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border-light bg-white py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-heading"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"
            />

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-border-light bg-white py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-3 w-full rounded-2xl bg-primary py-3 text-lg font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </div>

      <div className="mt-8 flex justify-center gap-1 text-sm">
        <span className="text-text-gray">
          Already have an account?
        </span>

        <button
          onClick={() => setScreen("login")}
          className="font-semibold text-primary hover:underline"
        >
          Login
        </button>
      </div>

    </div>
  );
};

export default Register;