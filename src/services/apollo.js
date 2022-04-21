// require("dotenv").config({
//   path: `.env`,
// })

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const link = createHttpLink({
  uri: process.env.GATSBY_WPGRAPHQL_URL,
  credentials: "same-origin",
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
