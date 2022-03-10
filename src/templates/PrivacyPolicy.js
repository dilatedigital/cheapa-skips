import { graphql } from "gatsby"
import React from "react"
import InnerBanner from "../components/Residential/InnerBanner"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutOfferSection from "../components/About/AboutOfferSection"

const About = ({ data: { wpPage } }) => {
  //console.log(location)
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
      <InnerBanner
        title={wpPage.title}
        content={wpPage.content}
        image={wpPage.featuredImage}
      />
      <AboutOfferSection content={wpPage.content} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      seo {
        metaDesc
        title
        opengraphImage {
          localFile {
            publicURL
          }
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
          }
        }
      }
    }
  }
`

export default About
