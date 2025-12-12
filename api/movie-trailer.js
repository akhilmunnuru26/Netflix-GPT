export default async function handler(req, res) {
  const movieId = req.query.id;

  if (!movieId) {
    return res.status(400).json({ error: "Missing movie ID" });
  }

  try {
   

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching movie trailer:", err);
    return res.status(500).json({ error: "Failed to fetch movie videos" });
  }
}
