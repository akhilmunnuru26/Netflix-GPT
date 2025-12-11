// lib/MovieSearchEngine.js
// Simplified search engine using text matching and genre detection

// TMDB Genre ID to Name mapping
const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export class MovieSearchEngine {
  constructor() {
    this.movies = [];
    this.isInitialized = false;
  }

  async initialize() {
    // No external dependencies, initialize immediately
    this.isInitialized = true;
  }

  // Simple text similarity using word overlap
  calculateTextSimilarity(text1, text2) {
    const normalize = (text) =>
      text
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 2);

    const words1 = new Set(normalize(text1));
    const words2 = new Set(normalize(text2));

    if (words1.size === 0 || words2.size === 0) return 0;

    const intersection = new Set([...words1].filter((x) => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }

  detectGenresFromQuery(query) {
    const q = query.toLowerCase();
    const genres = [];

    const patterns = {
      Horror: ['horror', 'scary', 'ghost', 'bhoot', 'भूत', 'डरावना'],
      Comedy: ['comedy', 'funny', 'हंसी', 'मजेदार', 'laugh'],
      Thriller: ['thriller', 'suspense', 'mystery', 'रोमांचक', 'thrilling'],
      Drama: ['drama', 'emotional', 'sentimental'],
      Action: ['action', 'fight', 'लड़ाई', 'battle', 'war'],
      Romance: ['romance', 'love', 'प्यार', 'couple'],
      Adventure: ['adventure', 'explore', 'journey'],
      Animation: ['animation', 'animated', 'cartoon'],
    };

    Object.keys(patterns).forEach((g) => {
      if (patterns[g].some((k) => q.includes(k))) {
        genres.push(g);
      }
    });

    return genres;
  }

  // Get genre names from genre IDs
  getGenreNamesFromIds(genreIds) {
    if (!Array.isArray(genreIds)) return [];
    return genreIds
      .map((id) => GENRE_MAP[id])
      .filter((name) => name !== undefined);
  }

  async cacheMovies(movies) {
    if (!Array.isArray(movies)) {
      console.warn('Invalid movies data passed to cacheMovies');
      this.movies = [];
      return;
    }
    this.movies = movies || [];
  }

  async search(query, movies = null, options = {}) {
    if (!this.isInitialized) throw new Error('Engine not initialized');

    const moviesToSearch = movies || this.movies || [];
    const {
      topK = 10,
      minSimilarity = 0.05,
    } = options;

    if (!Array.isArray(moviesToSearch) || moviesToSearch.length === 0) {
      console.warn('No movies to search in');
      return [];
    }

    const detectedGenres = this.detectGenresFromQuery(query);
    console.log('Detected genres:', detectedGenres);
    console.log('Sample movie structure:', moviesToSearch[0]);
    
    const results = [];

    for (const movie of moviesToSearch) {
      if (!movie || typeof movie !== 'object') continue;

      // Extract title and overview safely
      const title = movie.title || movie.name || '';
      const overview = movie.overview || '';

      if (!title) continue; // Skip movies without title

      // include original title/name in matching as well
      const originalTitle = movie.original_title || movie.original_name || '';
      // Text-based similarity on title, original title and overview
      const combined = `${title} ${originalTitle} ${overview}`;
      const textScore = this.calculateTextSimilarity(query, combined);

      // Simple title match (keyword matching for genre keywords in title)
      const titleMatch = detectedGenres.some(genre =>
        title.toLowerCase().includes(genre.toLowerCase())
      );
      const titleBoost = titleMatch ? 0.3 : 0;

      // Genre matching using TMDB genre_ids
      const movieGenreIds = Array.isArray(movie.genre_ids) ? movie.genre_ids : [];
      const movieGenreNames = this.getGenreNamesFromIds(movieGenreIds);
      
      const matchedGenres = detectedGenres.filter((g) =>
        movieGenreNames.some((mg) => mg.toLowerCase().includes(g.toLowerCase()))
      );
      const genreBoost = matchedGenres.length ? 0.3 : 0;

      const score = textScore + Math.max(titleBoost, genreBoost);

      // Lower threshold - accept any match above minimum
      if (score >= minSimilarity) {
        results.push({
          movie,
          score,
          matchedGenres,
          reasoning: `Match: ${(textScore * 100).toFixed(1)}% | Genres: ${movieGenreNames.join(', ') || 'Unknown'}`,
        });
      }
    }

    console.log(`Found ${results.length} results for "${query}"`);
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}
