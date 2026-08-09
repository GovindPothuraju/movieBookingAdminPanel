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
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [admin, isAuthenticated, dispatch]);

  if (loading) {
    return (
      <div className="h-screen overflow-hidden bg-[#fff7ed] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-orange-500 animate-pulse">CineFlow</h1>
          <p className="mt-3 text-gray-500">Loading...</p>

          <div className="flex justify-center gap-2 mt-6">
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-bounce" />
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#fff7ed] lg:grid lg:grid-cols-2">

      {/* ================= LEFT SIDE ================= */}

      <section className="relative hidden h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100 to-red-50 lg:flex">

        {/* Background Effects */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-orange-300/25 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-red-300/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/20 blur-3xl" />
        </div>

        {/* Main Left Content */}

        <div className="relative z-10 flex h-full w-full flex-col justify-between px-10 py-8 xl:px-14 2xl:px-16">

          {/* ================= LOGO ================= */}

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
              <Clapperboard size={25} strokeWidth={2.2} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                CineFlow
              </h1>

              <p className="text-sm text-gray-500">
                Admin Console
              </p>
            </div>

          </div>


          {/* ================= HERO ================= */}

          <div className="max-w-xl">

            <div className="inline-flex items-center rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-600">
              🎬 Movie Booking Admin
            </div>

            <h2 className="mt-7 text-5xl font-extrabold leading-[1.08] tracking-tight text-gray-900 xl:text-6xl">
              Manage Your
              <br />
              Cinema Like
              <br />
              Never Before.
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-500">
              Manage theatres, screens, movies, shows and bookings effortlessly from one modern dashboard.
            </p>

          </div>


          {/* ================= DASHBOARD CARD ================= */}

          <div className="rounded-3xl border border-white bg-white/90 p-6 shadow-xl backdrop-blur-sm">

            <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
              Dashboard
            </p>

            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              Everything in one place.
            </h3>

            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
              Track bookings, manage theatres, publish shows and monitor revenue using one simple admin panel.
            </p>

          </div>

        </div>

      </section>


      {/* ================= RIGHT SIDE ================= */}

      <section className="flex min-h-screen lg:h-screen items-center justify-center bg-[#fffaf5] px-5 py-10 sm:px-8 lg:py-8">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}

          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
              <Clapperboard size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                CineFlow
              </h1>

              <p className="text-sm text-gray-500">
                Admin Console
              </p>
            </div>

          </div>


          {/* Authentication Card */}

          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-9">

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

      </section>

    </div>
  );
};

export default Home;