import React from 'react'
import useIntersectionObserver from './hooks/useIntersectionObserver'
import usePokemon from './hooks/usePokemon'

function App() {
  const { pokemon, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemon()
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
      {!hasNextPage && !isLoading && <p>You have got them all!</p>}
    </div>
  )
}

export default App
