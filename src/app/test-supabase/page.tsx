"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface TestResult {
  status: "loading" | "success" | "error";
  message: string;
  data?: Record<string, unknown> | string;
}

export default function TestSupabase() {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    const tests: TestResult[] = [];

    // Test 1: Check if Supabase client is initialized
    tests.push({
      status: "loading",
      message: "Testing Supabase client initialization...",
    });

    try {
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
        throw new Error("Environment variables not configured properly");
      }

      tests[0] = {
        status: "success",
        message: "✅ Supabase client initialized successfully",
        data: { url: supabaseUrl.substring(0, 30) + "..." },
      };
    } catch (error) {
      tests[0] = {
        status: "error",
        message: `❌ Supabase client error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }

    setResults([...tests]);

    // Test 2: Test database connection
    tests.push({
      status: "loading",
      message: "Testing database connection...",
    });
    setResults([...tests]);

    try {
      const { error } = await supabase
        .from("hero_images")
        .select("count(*)")
        .limit(1);

      if (error) throw error;

      tests[1] = {
        status: "success",
        message: "✅ Database connection successful",
        data: { result: "Connected to database" },
      };
    } catch (error) {
      tests[1] = {
        status: "error",
        message: `❌ Database connection failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }

    setResults([...tests]);

    // Test 3: Test data fetching
    tests.push({
      status: "loading",
      message: "Testing data fetching...",
    });
    setResults([...tests]);

    try {
      const { data, error } = await supabase
        .from("hero_images")
        .select("*")
        .limit(3);

      if (error) throw error;

      tests[2] = {
        status: "success",
        message: `✅ Data fetching successful - Found ${
          data?.length || 0
        } hero images`,
        data: { count: data?.length || 0, sample: data?.[0] || null },
      };
    } catch (error) {
      tests[2] = {
        status: "error",
        message: `❌ Data fetching failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }

    setResults([...tests]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Supabase Connection Test
          </h1>

          <div className="space-y-6">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.status === "success"
                    ? "bg-green-50 border-green-200"
                    : result.status === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-200"
                }`}>
                <div className="flex items-center space-x-3">
                  {result.status === "loading" && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  )}
                  <p className="font-medium">{result.message}</p>
                </div>

                {result.data && (
                  <div className="mt-3 p-3 bg-gray-100 rounded text-base">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ul className="text-blue-800 space-y-1 text-base">
              <li>
                • If all tests pass: Your Supabase integration is working! 🎉
              </li>
              <li>
                • If tests fail: Check your environment variables in .env.local
              </li>
              <li>
                • Make sure you&apos;ve run the schema.sql and seed.sql in
                Supabase
              </li>
              <li>
                • Verify your Supabase project URL and anon key are correct
              </li>
            </ul>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={testSupabaseConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Run Tests Again
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
