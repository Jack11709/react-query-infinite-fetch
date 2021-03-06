import { useInfiniteQuery } from 'react-query'

const baseUrl = 'https://ga-pokemon.herokuapp.com/api/pokemon?page='

function getPokemon(page = 1) {
  console.log('this is fetching')
  return fetch(`${baseUrl}${page}`).then(res => res.json())
}

export default function usePokemon() {
  const { data, ...rest } = useInfiniteQuery('pokemon', ({ pageParam = 1 }) => getPokemon(pageParam), {
    getNextPageParam: res => {
      if (res.next) {
        return res.page + 1
      }
      return false
    },
    getPreviousPageParam: res => {
      if (res.prev) {
        return res.page - 1
      }
      return false
    },
  })

  const pokemon = data?.pages.flatMap(page => page.results)

  return {
    ...rest,
    pokemon,
  }
}

