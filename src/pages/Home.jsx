import { useEffect, useState } from "react";
import { Clapperboard } from "lucide-react";
import Login from "./Login";
import Register from "./Register";
import VerifyOTP from "./VerifyOTP";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../utils/store/userSlice";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [screen, setScreen] = useState("login");
  const [email, setUserEmail] = useState("");
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && admin) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          "https://moviebookingbackend-icoh.onrender.com/admin/profile",
          {
            withCredentials: true,
          }
        );

        if (data.success) {
          dispatch(setUser(data.data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [admin, isAuthenticated, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary animate-pulse">
            CineFlow
          </h1>

          <p className="mt-3 text-text-gray">
            Loading...........
          </p>

          <div className="flex justify-center gap-2 mt-6">
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce"></span>
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:150ms]"></span>
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:300ms]"></span>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="min-h-screen bg-page grid lg:grid-cols-2">

      {/* Left Section */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100 to-red-50 p-12">

        {/* Background Blur */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl animate-pulse" />

          <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-red-300/20 blur-3xl animate-pulse" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/30 blur-3xl" />

        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-md">
            <Clapperboard size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-heading">
              CineFlow
            </h1>

            <p className="text-sm text-text-gray">
              Admin Console
            </p>
          </div>

        </div>

        {/* Hero */}

        <div className="relative z-10 max-w-xl">

          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            🎬 Movie Booking Admin
          </span>

          <h2 className="mt-8 text-5xl font-extrabold leading-tight text-heading">
            Manage Your
            <br />
            Cinema Like
            <br />
            Never Before.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-gray">
            Manage theatres, screens, movies, shows and bookings
            effortlessly from one modern dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">

            <span className="rounded-full border border-border-light bg-white px-5 py-2 text-sm shadow-sm">
              🎥 Movies
            </span>

            <span className="rounded-full border border-border-light bg-white px-5 py-2 text-sm shadow-sm">
              🍿 Shows
            </span>

            <span className="rounded-full border border-border-light bg-white px-5 py-2 text-sm shadow-sm">
              🎫 Bookings
            </span>

            <span className="rounded-full border border-border-light bg-white px-5 py-2 text-sm shadow-sm">
              📊 Analytics
            </span>

          </div>

        </div>

        {/* Bottom Card */}

        <div className="relative z-10 rounded-3xl border border-border-light bg-white p-6 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Dashboard
          </p>

          <h3 className="mt-2 text-2xl font-bold text-heading">
            Everything in one place.
          </h3>

          <p className="mt-3 leading-7 text-text-gray">
            Track bookings, manage theatres, publish shows and monitor
            revenue using one simple admin panel.
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex items-center justify-center bg-page px-5 py-10">

        <div className="w-full max-w-md rounded-3xl border border-border-light bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

          {/* Mobile Logo */}

          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <Clapperboard size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-heading">
                CineFlow
              </h1>

              <p className="text-sm text-text-gray">
                Admin Console
              </p>
            </div>

          </div>

          {screen === "login" && (
            <Login
              setScreen={setScreen}
              setUserEmail={setUserEmail}
            />
          )}

          {screen === "register" && (
            <Register
              setScreen={setScreen}
            />
          )}

          {screen === "otp" && (
            <VerifyOTP
              email={email}
              setScreen={setScreen}
            />
          )}

        </div>

      </div>

    </div>
  );
};

export default Home;