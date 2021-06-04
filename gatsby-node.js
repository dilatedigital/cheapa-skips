const path = require("path")

const query = `
{
  allWpPage {
    nodes {
      uri
      template {
        templateName
      }
      isFrontPage
      id
    }
  }
}
`
exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    ${query}
  `)

  if (!data) return null

  data.allWpPage.nodes.forEach(page => {
    const { isFrontPage } = page
    const uri = isFrontPage ? `/` : page.uri

    let template

    switch (page.template.templateName) {
      case "Home Template":
        template = path.resolve("./src/templates/Home.js")
        break
      case "Residential Template":
        template = path.resolve("./src/templates/ResidentialSolutions.js")
        break
      case "Calculator Template":
        template = path.resolve("./src/templates/SkipSizeCalculatorPage.js")
        break
      case "About Template":
        template = path.resolve("./src/templates/About.js")
        break
      case "Pricing Template":
        template = path.resolve("./src/templates/PricingSizes.js")
        break
      default:
        template = path.resolve("./src/templates/BasicPage.js")
    }

    actions.createPage({
      path: uri,
      component: template,
      context: {
        id: page.id,
        slug: page.uri,
      },
    })
  })
}
