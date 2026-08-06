import { useEffect, useState } from "react";

import Header from "@/components/dashboard/Header";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import QuickActions from "@/components/dashboard/QuickActions";
import MeetingHealth from "@/components/dashboard/MeetingHealth";
import RecentMeetings from "@/components/dashboard/RecentMeetings";
import SearchMeetings from "@/components/dashboard/SearchMeetings";

import { getMeetings } from "@/api/meeting.api";

const Dashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMeetings = async () => {
    try {
      const response = await getMeetings();

      setMeetings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMeetings = meetings.filter((meeting: any) =>
    meeting.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <Header />

        <WelcomeCard />

        <QuickActions />

        <MeetingHealth meetings={meetings} />

        <SearchMeetings value={search} onChange={setSearch} />

        <RecentMeetings meetings={filteredMeetings} loading={loading} />
      </div>
    </main>
  );
};

export default Dashboard;
