import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {
  const [status, setstatus] = useState("Verifying ... ");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          setstatus("✅ Email Verified Successfully");
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } else {
          setstatus("❌ Invalid Or Expired Token");
        }
      } catch (error) {
        console.log(error);
        setstatus("❌ Verification Error");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="relative w-full h-screen bg-slate-100 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md border border-slate-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            Verification Status
          </h2>

          <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-100">
            <p
              className={`text-lg font-medium ${status.includes("✅") ? "text-emerald-600" : "text-slate-700"}`}
            >
              {status}
            </p>
          </div>

          {status.includes("✅") && (
            <p className="mt-4 text-sm text-slate-500 animate-pulse">
              Redirecting you to login shortly...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
