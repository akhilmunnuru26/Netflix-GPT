export async function GET(request) {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing TMDB_API_KEY environment variable" }),
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Missing 'query' parameter" }),
        { status: 400 }
      );
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US&page=1`;

    const tmdbResponse = await fetch(url);

    if (!tmdbResponse.ok) {
      const err = await tmdbResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ error: "TMDB API error", details: err }),
        { status: 500 }
      );
    }

    const data = await tmdbResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server Error", details: error.message }),
      { status: 500 }
    );
  }
}
