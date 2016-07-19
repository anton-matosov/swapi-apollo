import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as apollo from 'apollo-server'
const gqlTools = require('graphql-tools')

import typeDefs from './schema/index'
import resolvers from './resolvers/index'
import SWAPIConnector from './connectors/swapi'
import FilmModel from './models/film'
import PeopleModel from './models/people'
import VehicleModel from './models/vehicle'
import PlanetModel from './models/planet'
import StarshipModel from './models/starship'
import SpeciesModel from './models/species'

const app = express()

const apiHost = process.env.API_HOST ? `${process.env.API_HOST}/api` : 'http://swapi.co/api'
const expressPort = process.env.EXPRESS_PORT || 3000

const schema = gqlTools.makeExecutableSchema({ typeDefs, resolvers })

function graphqlOptions() {
  const swapiConnector = new SWAPIConnector(apiHost)

  return {
      pretty: true,
      schema,
      context: {
          film: new FilmModel(swapiConnector),
          vehicle: new VehicleModel(swapiConnector),
          people: new PeopleModel(swapiConnector),
          planet: new PlanetModel(swapiConnector),
          starship: new StarshipModel(swapiConnector),
          species: new SpeciesModel(swapiConnector),
      },
  }
}

function startExpress() {
  app.use(bodyParser.json())
  app.use('/graphql', apollo.apolloExpress(graphqlOptions))
  app.use('/', apollo.graphiqlExpress({endpointURL: '/graphql'}))

  app.listen(expressPort, () => {
      console.log(`Server is listen on ${expressPort}`)
  })
}

startExpress()
