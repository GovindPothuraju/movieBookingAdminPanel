import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";

const Login = ({ setScreen, setUserEmail }) => {
  const [email, setEmail] = useState("vcxbuddy@gmail.com");
  const [password, setPassword] = useState("Govind@2006");
  const [error,setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "https://moviebookingbackend-icoh.onrender.com/admin/login",
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Save email for OTP component
        setUserEmail(email);
        // Switch to OTP component
        setScreen("otp");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">

      <h1 className="text-4xl font-bold text-heading">
        Welcome back
      </h1>

      <p className="mt-2 text-text-gray">
        Sign in to manage your cinema operations.
      </p>

      <div className="mt-10 space-y-5">

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
              className="
                w-full
                rounded-2xl
                border
                border-border-light
                bg-white
                py-3
                pl-12
                pr-4
                outline-none
                transition
                focus:border-primary
                focus:ring-4
                focus:ring-orange-100
              "
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-border-light
                bg-white
                py-3
                pl-12
                pr-4
                outline-none
                transition
                focus:border-primary
                focus:ring-4
                focus:ring-orange-100
              "
            />

          </div>

        </div>

        {/* Button */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            rounded-2xl
            bg-primary
            py-3
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-orange-600
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}
      <div className="mt-8 flex justify-center gap-1 text-sm">

        <span className="text-text-gray">
          Don't have an account?
        </span>

        <button
          onClick={() => setScreen("register")}
          className="font-semibold text-primary hover:underline"
        >
          Register
        </button>

      </div>

    </div>
  );
};

export default Login;