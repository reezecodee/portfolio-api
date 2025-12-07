export const formatDate = (
  dateString: string | null,
  dayFormat?: "numeric" | "2-digit"
) => {
  if (!dateString) return "Present";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };

  if (dayFormat) {
    options.day = dayFormat;
  }

  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const formatYear = (dateString: string | null) => {
  if (!dateString) return "Present";

  const date = new Date(dateString);
  return date.getFullYear();
};
