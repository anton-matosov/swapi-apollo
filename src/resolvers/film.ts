export default {
  Film: {
    id: (film) => film.url,
    episodeID: (film) => film.episode_id,
    openingCrawl: (film) => film.opening_crawl,
    releaseDate: (film) => film.release_date,
    details: (film) => ({
      species: film.species,
      starships: film.starships,
      vehicles: film.vehicles,
      characters: film.characters,
      planets: film.planets,
    }),
  },
  FilmDetails: {
    species: (details, _, context) => context.loader.loadMany(details.species),
    starships: (details, _, context) => context.loader.loadMany(details.starships),
    vehicles: (details, _, context) => context.loader.loadMany(details.vehicles),
    characters: (details, _, context) => context.loader.loadMany(details.characters),
    planets: (details, _, context) => context.loader.loadMany(details.planets),
  },
}
