/* eslint-disable no-unused-vars */
import React from 'react'
import useIntersectionObserver from './hooks/useIntersectionObserver'
import usePokemonInifinite from './hooks/usePokemon'

function App() {
  const { pokemon, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonInifinite()
  const target = React.useRef()

  useIntersectionObserver({
    target,
    onIntersect: fetchNextPage,
    enabled: !!pokemon && hasNextPage,
  })

  return (
    <div>
      {isLoading && <p>...loading</p>}
      <div>
        {pokemon && pokemon.map(poke => <h1 key={poke._id}>{poke.name}</h1>)}
      </div>
      <div ref={target}/>
      {isFetchingNextPage && <p>...loading more</p>}
    </div>
  )
}

export default App
