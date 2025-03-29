"use client";
import React, { useState } from 'react';
import { proxyBaseUrl } from './networking';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear any existing token cookies before redirecting
    if (typeof document !== 'undefined') {
      // Import dynamically to avoid SSR issues
      const { clearTokenCookies } = await import('@/utils/cookieUtils');
      clearTokenCookies();
    }

    // Redirect to the SSO login route
    const url = proxyBaseUrl
      ? `${proxyBaseUrl}/sso/key/generate`
      : `/sso/key/generate`;

    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-black text-white">
      {/* Left pane - branding */}
      <div className="w-full sm:w-2/5 flex flex-col justify-center items-center p-8 bg-black border-r border-gray-800">
        <div className="mb-8">
          <img
            src="/assets/logos/hanzo.svg"
            alt="Hanzo AI Logo"
            className="h-16 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/logo.png"; // Fallback if SVG not found
            }}
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">Hanzo AI</h1>
        <p className="text-gray-400 text-center max-w-md">
          Secure access to enterprise LLM infrastructure
        </p>
      </div>

      {/* Right pane - login form */}
      <div className="w-full sm:w-3/5 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-md p-6">
              <p className="text-gray-400 mb-6">
                Click below to login through Hanzo Cloud.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-white text-black font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
