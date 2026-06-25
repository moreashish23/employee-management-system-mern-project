export const formatDate = (dateString: string): string => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  });
};

export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm   = String(date.getMonth() + 1).padStart(2, "0");
  const dd   = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const formatMobile = (mobile: string): string => {
  if (!mobile) return "—";
  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
};

export const truncate = (text: string, length = 30): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "…";
};