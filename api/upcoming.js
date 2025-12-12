export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&page=1`
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Upcoming Movies" });
  }
}
