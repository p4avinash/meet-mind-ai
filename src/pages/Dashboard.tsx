import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useDebounce from "@/hooks/useDebounce";

import Header from "@/components/dashboard/Header";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import QuickActions from "@/components/dashboard/QuickActions";
import MeetingHealth from "@/components/dashboard/MeetingHealth";
import RecentMeetings from "@/components/dashboard/RecentMeetings";
import SearchMeetings from "@/components/dashboard/SearchMeetings";
import DemoModeBanner from "@/components/dashboard/DemoModeBanner";

import { getMeetings, getMeetingStats } from "@/api/meeting.api";

const PAGE_SIZE = 5;

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState<any>(null);

  const setCurrentPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (page <= 1) {
        next.delete("page");
      } else {
        next.set("page", page.toString());
      }
      return next;
    });
  };

  const fetchMeetings = async () => {
    try {
      setLoading(true);

      const response = await getMeetings(
        currentPage,
        PAGE_SIZE,
        debouncedSearch,
      );

      // Handle out-of-bounds page after deletion (e.g. deleting the last item on page 5)
      if (
        response.pagination &&
        response.pagination.totalPages > 0 &&
        currentPage > response.pagination.totalPages
      ) {
        setCurrentPage(response.pagination.totalPages);
        return;
      }

      setMeetings(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getMeetingStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      setCurrentPage(1);
    }
  }, [debouncedSearch]);

  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <Header />

        <WelcomeCard />

        <DemoModeBanner />

        <QuickActions />

        <MeetingHealth stats={stats} loading={loading} />

        <SearchMeetings value={search} onChange={setSearch} />

        <RecentMeetings
          meetings={meetings}
          loading={loading}
          pagination={pagination}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default Dashboard;
