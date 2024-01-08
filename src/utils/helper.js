export function formatDateAndTime(isoDateString) {
  const dateObj = new Date(isoDateString);

  // Format the date
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  // Format the time
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const amPm = hours >= 12 ? "pm" : "am";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${amPm}`;

  return { date: formattedDate, time: formattedTime };
}

export function trimString(str) {
  if (/^[^a-zA-Z]*$/.test(str)) {
    return null;
  } else {
    return str.trim();
  }
}
