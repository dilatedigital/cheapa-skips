require("dotenv").config({
  path: `.env`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Cheapa Skips WA`,
    description: `Cheapa Skips WA website powered by Gatsby.js`,
    author: `Dilate Digital - Jejomar Dorongon`,
    image: "/cheapa-skips-logo.png",
    siteUrl: `https://cheapaskipswa.com.au`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
              nodes {
                ... on WpPost {
                  uri
                  modifiedGmt
                }
                ... on WpPage {
                  uri
                  modifiedGmt
                }
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => {
          console.log("Site object:", site)
          return site.siteMetadata.siteUrl
        },
        resolvePages: ({
          allSitePage: { nodes: allSitePages },
          allWpContentNode: { nodes: allWpContentNodes },
        }) => {
          const wpNodeMap = allWpContentNodes.reduce((acc, node) => {
            const { uri } = node
            acc[uri] = node
            return acc
          }, {})

          return allSitePages.map(page => {
            const wpNode = wpNodeMap[page.path]
            return { ...page, ...wpNode }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
        output: "/sitemap",
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The full URL of the WordPress site's GraphQL API.
         * Example : 'https://www.example-site.com/graphql'
         */
        url: process.env.GATSBY_WPGRAPHQL_URL,
        verbose: true,
        schema: {
          timeout: 30000, // Increase the timeout to 30 seconds
        },
        type: {
          MediaItem: {
            localFile: {
              requestConcurrency: 5, // Limit concurrent file download requests
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/cheapa-skips-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-preact`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      /* Include plugin */
      resolve: "gatsby-omni-font-loader",

      /* Plugin options */
      options: {
        /* Font loading mode */
        mode: "async",

        /* Enable font loading listener to handle FOUT */
        enableListener: true,

        /* Preconnect URL-s. This example is for Google Fonts */
        preconnect: ["https://fonts.gstatic.com"],

        /* Self-hosted fonts config. Add font files and font CSS files to "static" folder */

        /* Web fonts. File link should point to font CSS file. */
        web: [
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Kumbh Sans",
            /* URL to the font CSS file with @font-face definition */
            file:
              "https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700",
          },
        ],
      },
    },
  ],
}
