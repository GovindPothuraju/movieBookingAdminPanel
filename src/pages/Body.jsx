import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../utils/store/userSlice";

import Navbar from "../componenets/Navbar";
import SideBar from "../componenets/SideBar";

const Body = () => {
  const dispatch = useDispatch();

  const { admin, isAuthenticated } = useSelector((store) => store.user);

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            Loading Dashboard...
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

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

   return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar */}
      <SideBar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Right Section */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page */}
        <main className="flex-1 overflow-y-auto bg-[#FAFAFA] p-6">
            <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Body;