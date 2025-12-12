export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Trending" });
  }
}
