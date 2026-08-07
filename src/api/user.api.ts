import api from "@/lib/axios";

export const getUserSettings = async () => {
  const { data } = await api.get("/users/settings");

  return data;
};

export const updateUserSettings = async (defaultDeliveryEmail: string) => {
  const { data } = await api.patch("/users/settings", {
    defaultDeliveryEmail,
  });

  return data;
};
