import { useEffect, useState, useRef } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import FeedbackTable from "../components/FeedbackTable";
import SentimentChart from "../components/SentimentChart";
import CategoryChart from "../components/CategoryChart";
import { getFeedback, getStats } from "../services/api";
import { exchangeCodeForToken } from "../services/auth";

export default function Dashboard() {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({ total: 0, positive: 0, negative: 0, neutral: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a ref to prevent double-execution in React Strict Mode
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function initialize() {
      setLoading(true);
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      try {
        if (code) {
          console.log("Found code, exchanging...");
          const tokenData = await exchangeCodeForToken(code);
          
          if (tokenData && !tokenData.error) {
            // Success! Clean URL and load data
            window.history.replaceState({}, document.title, "/dashboard");
            await loadData();
          } else {
            // Check if we already have a valid token before throwing error
            const existingToken = localStorage.getItem("id_token");
            if (existingToken && existingToken !== "undefined") {
              await loadData();
            } else {
              setError(`Auth Error: ${tokenData?.error || "Unknown error"}`);
            }
          }
        } else {
          // No code in URL, check if we already have a token
          const token = localStorage.getItem("id_token");
          if (token && token !== "undefined") {
            await loadData();
          } else {
            setError("Session expired. Please log in again.");
          }
        }
      } catch (err) {
        console.error("Init crash:", err);
        setError("Dashboard failed to initialize.");
      } finally {
        setLoading(false);
      }
    }

    async function loadData() {
      try {
        const [feedbackData, statsData] = await Promise.all([
          getFeedback(),
          getStats()
        ]);

        const safeFeedback = Array.isArray(feedbackData) ? feedbackData : [];
        setFeedback(safeFeedback);
        setStats(statsData || { total: 0, positive: 0, negative: 0, neutral: 0 });

        // Process Categories
        const categoryCounts = {};
        safeFeedback.forEach(item => {
          const cat = item.category || "Other";
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        setCategoryData(Object.keys(categoryCounts).map(key => ({
          category: key,
          count: categoryCounts[key]
        })));

      } catch (err) {
        console.error("Load Data Error:", err);
        setError("Failed to fetch dashboard data.");
      }
    }

    initialize();
  }, []);

  if (loading) return <div className="p-10 text-center">Authenticating...</div>;
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button onClick={() => window.location.href = '/'} className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Feedback" value={stats.total} />
        <StatsCard title="Positive" value={stats.positive} />
        <StatsCard title="Negative" value={stats.negative} />
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentChart stats={stats} />
        <CategoryChart data={categoryData} />
      </div>
      <div className="p-6">
        <FeedbackTable feedback={feedback} />
      </div>
    </div>
  );
}