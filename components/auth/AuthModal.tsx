"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { APP_NAME } from "@/lib/constants";

type Mode = "signup" | "login";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;

function formatAuthError(message: string) {
  const lower = message.toLowerCase();
  if (
    message === "Failed to fetch" ||
    lower.includes("load failed") ||
    lower.includes("network")
  ) {
    return "Cannot reach Supabase. On Vercel: add env vars and Redeploy. On laptop: check .env.local and restart npm run dev.";
  }
  if (lower.includes("email not confirmed")) {
    return "Confirm your email first, or turn off “Confirm email” in Supabase → Authentication → Providers → Email.";
  }
  return message;
}

function getConfigError(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !url.includes("supabase.co")) {
    return "Supabase is not configured for this deploy. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY on Vercel, then Redeploy.";
  }
  return null;
}

export default function AuthModal() {
  const configError = useMemo(() => getConfigError(), []);
  const supabase = useMemo(
    () => (configError ? null : createClient()),
    [configError]
  );
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (configError) setError(configError);
  }, [configError]);

  const resetForm = () => {
    setError(null);
    setMessage(null);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    resetForm();
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    resetForm();

    if (!USERNAME_RE.test(username)) {
      setError("Username must be 3–20 characters (letters, numbers, underscore only).");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!supabase) {
      setError(configError);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username.trim(),
            display_name: username.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(formatAuthError(signUpError.message));
        setSubmitting(false);
        return;
      }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          username: username.trim(),
          display_name: username.trim(),
        })
        .eq("id", data.user.id);

      if (profileError) {
        setError(profileError.message);
        setSubmitting(false);
        return;
      }
    }

      if (data.session) {
        setSubmitting(false);
        return;
      }

      setMessage(
        "Account created. Check your email to confirm, then log in — or disable email confirmation in Supabase for instant access."
      );
      setSubmitting(false);
      setMode("login");
    } catch (err) {
      setError(
        formatAuthError(err instanceof Error ? err.message : "Load failed")
      );
      setSubmitting(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    resetForm();

    if (!supabase) {
      setError(configError);
      return;
    }

    setSubmitting(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(formatAuthError(signInError.message));
      }
    } catch (err) {
      setError(
        formatAuthError(err instanceof Error ? err.message : "Load failed")
      );
    }
    setSubmitting(false);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-maroon-600 focus:outline-none focus:ring-1 focus:ring-maroon-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-maroon-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {APP_NAME}
          </h1>
        </div>

        <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {mode === "signup"
            ? "Create an account to trade on campus markets."
            : "Welcome back — log in to continue."}
        </p>

        <div className="mb-6 flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-white text-maroon-600 shadow dark:bg-gray-900"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "login"
                ? "bg-white text-maroon-600 shadow dark:bg-gray-900"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Log in
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/50 dark:text-green-300">
            {message}
          </p>
        )}

        {mode === "signup" ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@tamu.edu"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                placeholder="aggie_trader"
              />
              <p className="mt-1 text-xs text-gray-500">
                Shown on your profile and leaderboard.
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm password
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-maroon-600 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700 disabled:opacity-60"
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-maroon-600 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700 disabled:opacity-60"
            >
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
