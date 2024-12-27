import React from 'react'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import { useDispatch, useSelector } from 'react-redux'

import { motion, useScroll } from 'framer-motion';
import Footer from './Footer';

const PlayingMovie = () => {
    const dispatch = useDispatch()
    const similarMovies = useSelector(store => store.movies?.similarMovies)
    // console.log("similar",similarMovies)
    return (
        <>
            <MainContainer />
            <SecondaryContainer />
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <Footer/>
            </motion.div>
      </>
    
  )
}

export default PlayingMovie