const formatRelativeDate = (date: string) => {
  const now = new Date();
  const created = new Date(date);

  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diff < 60) return "Just now";

  if (diff < 3600) {
    return `${Math.floor(diff / 60)} min ago`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hrs ago`;
  }

  return created.toLocaleDateString();
};

export default formatRelativeDate;
