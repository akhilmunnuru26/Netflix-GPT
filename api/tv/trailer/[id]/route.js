export async function GET(_, { params }) {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const { id } = params;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing TMDB_API_KEY in environment variables" }),
        { status: 500 }
      );
    }

    const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`;

    const tmdbResponse = await fetch(url);

    if (!tmdbResponse.ok) {
      const error = await tmdbResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ error: "TMDB API Error", details: error }),
        { status: 500 }
      );
    }

    const data = await tmdbResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server Error", details: error.message }),
      { status: 500 }
    );
  }
}
