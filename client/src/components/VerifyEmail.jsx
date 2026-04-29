import React from 'react';

const VerifyEmail = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f4f0] px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-10 text-center shadow-lg border border-slate-200">

        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-indigo-900">
            Check Your Email
          </h1>
        </div>
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-slate-600">
            We've sent a verification link to your email address. Please check
            your inbox to activate your account.
          </p>

          <div className="pt-4">
            <p className="text-sm text-slate-500">
              Didn't receive the email?
              <button className="ml-1 font-semibold text-blue-600 hover:text-indigo-800 hover:underline transition-colors">
                Resend link
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;
