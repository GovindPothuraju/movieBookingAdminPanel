import { useEffect, useRef, useState } from "react";
import { ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/store/userSlice";
import axios from "axios";

const VerifyOTP = ({ email, setScreen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const otpValue = otp.join("");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (otpValue.length === 6 && !loading && !verificationSuccess) {
      handleVerifyOTP(otpValue);
    }
  }, [otpValue]);

  const handleOTPChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];

    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }

      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedOTP = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedOTP) return;

    const newOtp = ["", "", "", "", "", ""];

    pastedOTP.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputRefs.current[Math.min(pastedOTP.length, 5)]?.focus();
  };

  const handleVerifyOTP = async (value) => {
    if (value.length !== 6 || loading) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "https://moviebookingbackend-icoh.onrender.com/admin/verify-otp",
        {
          email,
          otp: value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.admin));

        setVerificationSuccess(true);

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 3000);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);

      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 600);

      alert(err.response?.data?.message || "OTP Verification Failed");

      setOtp(["", "", "", "", "", ""]);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
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
        setResendSuccess(true);
        setOtp(["", "", "", "", "", ""]);

        setTimeout(() => {
          setResendSuccess(false);
          inputRefs.current[0]?.focus();
        }, 4000);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Unable to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <style>{`.otp-grid{display:flex;justify-content:center;gap:8px}.otp-box{position:relative;width:48px;height:56px;border:1px solid #fed7aa;border-radius:14px;background:#fff7ed;color:#1f2937;font-size:24px;font-weight:700;text-align:center;outline:none;transition:all .35s ease;box-shadow:0 4px 12px rgba(249,115,22,.06);overflow:hidden;z-index:1}.otp-box:focus{border-color:#f97316;background:#fff;box-shadow:0 0 0 4px rgba(249,115,22,.12),0 8px 20px rgba(249,115,22,.1)}.otp-box::before{content:"";position:absolute;inset:-2px;border-radius:16px;padding:2px;background:conic-gradient(from 0deg,transparent 0deg,transparent 255deg,#f59e0b 300deg,#fde68a 330deg,#f97316 350deg,transparent 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:goldTravel 1.8s linear infinite;pointer-events:none}.otp-box::after{content:"";position:absolute;inset:0;border-radius:14px;background:linear-gradient(110deg,transparent 25%,rgba(251,191,36,.2) 50%,transparent 75%);transform:translateX(-130%);animation:goldShine 2.2s ease-in-out infinite;pointer-events:none}.otp-box.typed{background:#fff;border-color:#f97316;box-shadow:0 6px 18px rgba(249,115,22,.12)}.otp-shake{animation:otpShake .55s ease-in-out}.success-container{position:relative;width:100%;height:64px;display:flex;align-items:center;justify-content:center}.success-box{width:100%;height:64px;border-radius:18px;background:linear-gradient(135deg,#f97316,#fb923c);display:flex;align-items:center;justify-content:center;color:white;box-shadow:0 12px 30px rgba(249,115,22,.3);animation:successBox .8s cubic-bezier(.22,1,.36,1) forwards}.success-icon{animation:successIcon .7s .55s cubic-bezier(.22,1,.36,1) both}.merge-box{position:absolute;width:48px;height:56px;border:1px solid #f97316;border-radius:14px;background:#fff7ed;animation:mergeBox .9s cubic-bezier(.22,1,.36,1) forwards;opacity:0}.merge-1{animation-delay:0s}.merge-2{animation-delay:.05s}.merge-3{animation-delay:.1s}.merge-4{animation-delay:.15s}.merge-5{animation-delay:.2s}.merge-6{animation-delay:.25s}.success-text{animation:successText .6s 1s ease-out both}.resend-success{animation:successMessage .35s ease-out}@keyframes goldTravel{to{transform:rotate(360deg)}}@keyframes goldShine{0%,100%{transform:translateX(-130%)}50%{transform:translateX(130%)}}@keyframes mergeBox{0%{opacity:1;transform:translateX(0) scale(1)}50%{opacity:1;transform:translateX(calc(var(--move-x)*.5)) scale(.75)}100%{opacity:0;transform:translateX(var(--move-x)) scale(.15)}}@keyframes successBox{0%{transform:scaleX(.05);opacity:0}60%{transform:scaleX(1.06);opacity:1}100%{transform:scaleX(1);opacity:1}}@keyframes successIcon{0%{transform:scale(0) rotate(-45deg);opacity:0}70%{transform:scale(1.18) rotate(8deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}@keyframes successText{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes otpShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}@keyframes successMessage{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}@media(max-width:420px){.otp-box{width:42px;height:52px;font-size:22px}.otp-grid{gap:6px}}`}</style>

      <div className="w-full">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck size={30} strokeWidth={2} />
          </div>
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold text-heading sm:text-3xl">
          Verify OTP
        </h1>

        <p className="mt-2 text-center text-sm text-text-gray sm:text-base">
          We've sent a verification code to
        </p>

        <p className="mt-1 break-all text-center text-sm font-semibold text-heading sm:text-base">
          {email}
        </p>

        <div className="mt-8">
          <label className="mb-3 block text-center text-sm font-medium text-heading">
            Enter 6-digit OTP
          </label>

          {!verificationSuccess ? (
            <div className={shake ? "otp-shake" : ""}>
              <div className="otp-grid">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`otp-box ${digit ? "typed" : ""}`}
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="success-container">
              <div className="merge-box merge-1" style={{ "--move-x": "-140px" }} />
              <div className="merge-box merge-2" style={{ "--move-x": "-84px" }} />
              <div className="merge-box merge-3" style={{ "--move-x": "-28px" }} />
              <div className="merge-box merge-4" style={{ "--move-x": "28px" }} />
              <div className="merge-box merge-5" style={{ "--move-x": "84px" }} />
              <div className="merge-box merge-6" style={{ "--move-x": "140px" }} />

              <div className="success-box">
                <CheckCircle2 className="success-icon" size={38} strokeWidth={2.5} />
              </div>
            </div>
          )}
        </div>

        {!verificationSuccess && (
          <>
            <p className="mt-4 text-center text-xs text-text-gray">
              Enter the code sent to your email address
            </p>

            <button
              onClick={() => handleVerifyOTP()}
              disabled={loading || otpValue.length !== 6}
              className="mt-6 w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={handleResendOTP}
              disabled={resendLoading}
              className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-primary transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={14} className={resendLoading ? "animate-spin" : ""} />
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${resendSuccess ? "mt-3 max-h-10 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
              <p className="resend-success flex items-center justify-center gap-1.5 text-sm font-medium text-green-600">
                <CheckCircle2 size={15} />
                OTP sent successfully
              </p>
            </div>

            <button
              onClick={() => setScreen("login")}
              className="mt-4 w-full text-sm text-text-gray transition hover:text-primary"
            >
              ← Back to Login
            </button>
          </>
        )}

        {verificationSuccess && (
          <div className="success-text mt-4 text-center">
            <p className="text-lg font-bold text-heading">
              Verification Successful
            </p>
            <p className="mt-1 text-sm text-text-gray">
              Taking you to your dashboard...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyOTP;