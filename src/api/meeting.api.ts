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
