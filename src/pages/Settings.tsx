import { useEffect, useState } from "react";

import Button from "@/components/common/button/Button";

import { getUserSettings } from "@/api/user.api";

import useUser from "@/hooks/useUser";

const Settings = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);

  const { handleUpdateSettings } = useUser();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getUserSettings();

        setEmail(response.data.defaultDeliveryEmail);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const onSave = async () => {
    await handleUpdateSettings(email);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] p-8">
      <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>

        <p className="mt-2 text-zinc-400">
          This email will receive all meeting summaries.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-sm text-zinc-400">
            Default Delivery Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            placeholder="Enter email"
          />
        </div>

        <Button onClick={onSave} className="mt-8">
          Save Changes
        </Button>
      </div>
    </main>
  );
};

export default Settings;
