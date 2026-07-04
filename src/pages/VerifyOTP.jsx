import { useState } from "react";
import { ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/store/userSlice";
import axios from "axios";

const VerifyOTP = ({ email, setScreen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://moviebookingbackend-icoh.onrender.com/admin/verify-otp",
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.admin));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      setResendSuccess(false);

      const response = await axios.post(
        "https://moviebookingbackend-icoh.onrender.com/admin/resend-otp",
        { email },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("OTP Sent Successfully");
        setResendSuccess(true);

        // hide the message after a few seconds
        setTimeout(() => setResendSuccess(false), 4000);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Unable to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-8 sm:px-6">
      <div
        className="
          w-full
          max-w-sm
          sm:max-w-md
          rounded-3xl
          border
          border-border-light
          bg-white
          px-6
          py-8
          sm:px-10
          sm:py-10
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        "
      >
        <div className="flex justify-center">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary-light">
            <ShieldCheck size={28} className="text-primary sm:size-8" />
          </div>
        </div>

        <h1 className="mt-5 sm:mt-6 text-center text-2xl sm:text-4xl font-bold text-heading">
          Verify OTP
        </h1>

        <p className="mt-2 text-center text-sm sm:text-base text-text-gray">
          We've sent a verification code to
        </p>

        <p className="mt-1 break-all text-center text-sm sm:text-base font-semibold text-heading">
          {email}
        </p>

        <div className="mt-8 sm:mt-10">
          <label className="mb-2 block text-sm font-medium text-heading">
            Enter OTP
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="
              w-full
              rounded-2xl
              border
              border-border-light
              bg-primary-light/40
              py-3
              sm:py-4
              text-center
              text-xl
              sm:text-2xl
              font-semibold
              text-heading
              tracking-[0.5em]
              sm:tracking-[0.6em]
              placeholder:text-border-light
              outline-none
              transition
              focus:border-primary
              focus:bg-white
              focus:ring-4
              focus:ring-primary/15
            "
          />
        </div>

        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="
            mt-6
            sm:mt-8
            w-full
            rounded-2xl
            bg-primary
            py-3
            sm:py-3.5
            text-base
            sm:text-lg
            font-semibold
            text-white
            shadow-md
            shadow-primary/20
            transition
            hover:bg-orange-600
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-70
            disabled:active:scale-100
          "
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={handleResendOTP}
          disabled={resendLoading}
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-1.5
            text-sm
            font-semibold
            text-primary
            transition
            hover:underline
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:no-underline
          "
        >
          <RefreshCw
            size={14}
            className={resendLoading ? "animate-spin" : ""}
          />
          {resendLoading ? "Resending..." : "Resend OTP"}
        </button>

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            ${resendSuccess ? "mt-3 max-h-10 opacity-100" : "mt-0 max-h-0 opacity-0"}
          `}
        >
          <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-green-600">
            <CheckCircle2 size={15} />
            OTP sent successfully
          </p>
        </div>

        <button
          onClick={() => setScreen("login")}
          className="mt-2 w-full text-sm text-text-gray transition hover:text-primary"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;