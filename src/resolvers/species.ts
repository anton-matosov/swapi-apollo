const path = '/species/'

export default () => ({
  RootQuery: {
      allSpecies: (_, params, context) =>
        context.pageFetcher(path, params.offset, params.limit),
      species: (_, params, context) =>
        context.loader.load(params.id || `${path}${params.speciesID}/`),
  },
  Species: {
    id: (species) => species.url,
    averageHeight: (species) => species.average_height,
    skinColors: (species) => species.skin_colors.split(','),
    hairColors: (species) => species.hair_colors.split(','),
    eyeColors: (species) => species.eye_colors.split(','),
    averageLifespan: (species) => species.average_lifespan,
    homeworld: (species, _, context) => context.loader.loadMany(species.homeworld),
    people: (species, _, context) => context.loader.loadMany(species.people),
    films: (species, _, context) => context.loader.loadMany(species.films),
  },
})
