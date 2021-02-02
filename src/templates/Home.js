import React from "react"
import Hero from "../components/Home/Hero"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import SkipBinSizes from "../components/Home/SkipBinSizes"

const Home = ({ data: { wpPage } }) => {
  //console.log(wpPage)
  return (
    <Layout>
      <SEO
        title={wpPage.seo.title}
        description={wpPage.seo.metaDesc}
        image={
          wpPage.seo.opengraphImage
            ? wpPage.seo.opengraphImage.localFile.publicURL
            : null
        }
      />
      <Hero
        heroButton={wpPage.homeFields.heroButton}
        heroTexts={wpPage.homeFields.heroTexts}
        heroSlogan={wpPage.homeFields.heroSlogan}
        heroTitle={wpPage.homeFields.heroTitle}
        showHeroButton={wpPage.homeFields.showHeroButton}
        heroImage={wpPage.homeFields.heroImage}
      />
      <SkipBinSizes
        title={wpPage.homeFields.skipBinTitle}
        content={wpPage.homeFields.skipBinContent}
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      seo {
        metaDesc
        title
        opengraphImage {
          localFile {
            publicURL
          }
        }
      }
      homeFields {
        heroSlogan
        heroTexts
        heroTitle
        showHeroButton
        heroButton {
          buttonLink {
            ... on WpPage {
              uri
            }
          }
          buttonText
        }
        heroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG)
            }
          }
        }
        skipBinTitle
        skipBinContent
      }
    }
  }
`

export default Home
