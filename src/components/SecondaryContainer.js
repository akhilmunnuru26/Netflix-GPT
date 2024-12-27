import { useSelector } from "react-redux";
import MovieList from "./MovieList";

import { motion, useScroll } from 'framer-motion';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const playing = useSelector((store) => store.movies.playing);
  const { scrollY } = useScroll();

  return (
    movies?.nowPlayingMovies && (
      <div className="bg-black">
        <div className="md:-mt-44 -mt-20 relative md:pl-6 z-20">
          {playing && movies?.similarMovies && (
            <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
              <MovieList
                id="similarMovies"
                title={"Similar Movies"}
                movies={movies.similarMovies}
              />
          </motion.div>
            
          )}

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <MovieList
              id="nowPlaying"
              title={"Now Playing"}
              movies={movies.nowPlayingMovies}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
          >
            <MovieList
              id="upcomingMovies"
              title={"Upcoming Movies"}
              movies={movies.upcomingMovies}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
          >
            <MovieList
              id="popularMovies"
              title={"Popular"}
              movies={movies.popularMovies}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
          >
            <MovieList
              id="topRatedMovies"
              title={"Top Rated"}
              movies={movies.topRatedMovies}
            />
          </motion.div>
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;