import { useEffect, useState } from "react";

import StatCard from "../componenets/dashboard/StatCard";
import BookingChart from "../componenets/dashboard/BookingChart";
import RevenueChart from "../componenets/dashboard/RevenueChart";
import BookingStatusChart from "../componenets/dashboard/BookingStatusChart";
import TopMoviesChart from "../componenets/dashboard/TopMoviesChart";

import {
  getDashboardStats,
  getBookingTrend,
  getRevenueTrend,
  getBookingStatus,
  getTopMovies,
} from "../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [bookingStatusData, setBookingStatusData] = useState([]);
  const [topMoviesData, setTopMoviesData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      // Call APIs at the same time
      const [statsResponse, bookingResponse ,revenueResponse,bookingStatusResponse,topMoviesResponse,] =
        await Promise.all([
          getDashboardStats(),
          getBookingTrend(),
          getRevenueTrend(),
          getBookingStatus(),
          getTopMovies(),
        ]);

      // Dashboard statistics
      if (statsResponse.success) {
        setStats(statsResponse.data);
      } else {
        throw new Error(
          statsResponse.message || "Failed to load dashboard statistics"
        );
      }

      // Booking trend
      if (bookingResponse.success) {
        setBookingData(bookingResponse.data);
      } else {
        throw new Error(
          bookingResponse.message || "Failed to load booking data"
        );
      }

      // Revenue trend
      if (revenueResponse.success) {
        setRevenueData(revenueResponse.data);
      }else {
        throw new Error(
          revenueResponse.message || "Failed to load booking data"
        );
      }

      // booking status distribution
      if(bookingStatusResponse.success) {
        setBookingStatusData(bookingStatusResponse.data);
      }else {
        throw new Error(
          bookingStatusResponse.message || "Failed to load booking data"
        );
      }

      // top movies 
      if (topMoviesResponse.success) {
        setTopMoviesData( topMoviesResponse.data);
      }else {
        throw new Error(
          topMoviesResponse.message || "Failed to load booking data"
        );
      }
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load dashboard when component mounts
  useEffect(() => {
    fetchDashboard();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF7ED] p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-1 h-9 w-52 rounded-lg bg-[#FFDE86]/40"></div>
            <div className="mb-6 h-4 w-64 rounded bg-[#FFDE86]/25"></div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 rounded-2xl bg-white/70"
                ></div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="h-80 rounded-2xl bg-white/70"></div>
              <div className="h-80 rounded-2xl bg-white/70"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF7ED] p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                !
              </div>
              <span className="font-medium text-red-700">{error}</span>
            </div>

            <button
              onClick={fetchDashboard}
              className="ml-4 flex-shrink-0 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-scree  sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#FFDE86]/50 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B8781A]" />
              <span className="text-xs font-bold uppercase tracking-wide text-[#8A5A14]">
                Live overview
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-gray-500">
              Overview of your booking platform
            </p>
          </div>
        </div>

        {/* Statistics — ticket-stub cards, revenue is the hero */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
            icon="₹"
            accent
          />

          <StatCard
            title="Total Bookings"
            value={stats.totalBookings.toLocaleString("en-IN")}
            icon="🎟️"
          />

          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString("en-IN")}
            icon="👥"
          />

          <StatCard
            title="Total Movies"
            value={stats.totalMovies.toLocaleString("en-IN")}
            icon="🎬"
          />

          <StatCard
            title="Total Theaters"
            value={stats.totalTheaters.toLocaleString("en-IN")}
            icon="🏢"
          />

          <StatCard
            title="Total Shows"
            value={stats.totalShows.toLocaleString("en-IN")}
            icon="📅"
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          <RevenueChart data={revenueData} />
          <BookingChart data={bookingData} />
          <BookingStatusChart data={bookingStatusData} />
          <TopMoviesChart data={topMoviesData} />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;