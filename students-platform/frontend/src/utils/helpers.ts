export async function getCountryFromIP() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data.country_name; // Returns the country name (e.g., "Kenya")
  } catch (error) {
    console.error("Failed to fetch country from IP:", error);
    return null; // Fallback in case of an error
  }
}