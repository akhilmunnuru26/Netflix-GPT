import React from 'react'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import { useDispatch, useSelector } from 'react-redux'

const PlayingMovie = () => {
    const dispatch = useDispatch()
    const similarMovies = useSelector(store => store.movies?.similarMovies)
    console.log("similar",similarMovies)
    return (
        <>
            <MainContainer />
            <SecondaryContainer />
      </>
    
  )
}

export default PlayingMovie