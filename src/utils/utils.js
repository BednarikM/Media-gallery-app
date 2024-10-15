export function formatRoute(mediaTitle) {
  return `/media/` + mediaTitle
    .toLowerCase()
    .replace(/'/g, "") // Remove single quotes
    .replace(/:/g, "-") // Replace colons with hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens into one
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

export function formatDate(format = "year", dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  if (format === "full") {
    return `${day}.${month}.${year}`;
  } else if (format === "year") {
    return `${year}`;
  } else {
    throw new Error("Invalid format. Use 'full' or 'year' parameter.");
  }
}