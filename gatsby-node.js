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
      case "Contact Template":
        template = path.resolve("./src/templates/Contact.js")
        break
      case "Services Template":
        template = path.resolve("./src/templates/Services.js")
        break
      case "Terms Template":
        template = path.resolve("./src/templates/PrivacyPolicy.js")
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

  // Add your redirect codes here
  const { createRedirect } = actions

  const redirects = [
    {
      fromPath: "/book-now",
      toPath: "/pricing-sizes/",
    },
    {
      fromPath: "/bin-sizes",
      toPath: "/pricing-sizes/",
    },
    {
      fromPath: "/about",
      toPath: "/about-us/",
    },
    {
      fromPath: "/termsconditions",
      toPath: "/terms-conditions/",
    },
    {
      fromPath: "/service-areas",
      toPath: "/services/",
    },
  ]

  redirects.forEach(({ fromPath, toPath }) => {
    createRedirect({
      fromPath,
      toPath,
      isPermanent: true,
      redirectInBrowser: true,
    })
  })
}
