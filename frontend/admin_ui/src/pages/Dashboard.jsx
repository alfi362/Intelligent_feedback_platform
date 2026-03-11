import { useEffect } from "react";
import { exchangeCodeForToken } from "../services/auth";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import FeedbackTable from "../components/FeedbackTable";

export default function Dashboard() {

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

     if (code) {
    exchangeCodeForToken(code).then(() => {
      window.history.replaceState({}, document.title, "/dashboard")
    })
  }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="p-6 grid grid-cols-3 gap-4">
        <StatsCard title="Total Feedback" value="120" />
        <StatsCard title="Positive" value="80" />
        <StatsCard title="Negative" value="20" />
      </div>

      <div className="p-6">
        <FeedbackTable />
      </div>

    </div>
  );
}