import Header from "@/components/dashboard/Header";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import QuickActions from "@/components/dashboard/QuickActions";
import MeetingHealth from "@/components/dashboard/MeetingHealth";
import RecentMeetings from "@/components/dashboard/RecentMeetings";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <Header />

        <WelcomeCard />

        <QuickActions />

        <MeetingHealth />

        <RecentMeetings />
      </div>
    </main>
  );
};

export default Dashboard;
