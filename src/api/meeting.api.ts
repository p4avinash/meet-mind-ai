import api from "@/lib/axios";

export const uploadMeeting = async (formData: FormData) => {
  const { data } = await api.post("/meetings/upload", formData);

  return data;
};

export const getMeeting = async (meetingId: string) => {
  const { data } = await api.get(`/meetings/${meetingId}`);

  return data;
};

export const generateTranscript = async (meetingId: string) => {
  const { data } = await api.post(`/ai/${meetingId}/transcribe`);

  return data;
};

export const generateSummary = async (meetingId: string) => {
  const { data } = await api.post(`/ai/${meetingId}/summary`);

  return data;
};

export const generateActionItems = async (meetingId: string) => {
  const { data } = await api.post(`/ai/${meetingId}/action-items`);

  return data;
};

export const getMeetings = async () => {
  const { data } = await api.get("/meetings");

  return data;
};

export const renameMeeting = async (meetingId: string, title: string) => {
  const { data } = await api.patch(`/meetings/${meetingId}`, {
    title,
  });

  return data;
};
