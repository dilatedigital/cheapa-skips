import { graphql } from "gatsby"
import React from "react"
import InnerBanner from "../components/Residential/InnerBanner"
import Layout from "../components/layout"
import RecommendedBins from "../components/Residential/RecommendedBins"
import SEO from "../components/seo"
import SkipSizeCalculator from "../components/Calculator/SkipSizeCalculator"
import WasteSection from "../components/Residential/WasteSection"
import AfterFormCTA from "../components/Residential/AfterFormCTA"

const ResidentialSolutions = ({ data: { wpPage }, location }) => {
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
      <WasteSection
        image={wpPage.residentialFields.wasteImage}
        content={wpPage.residentialFields.wasteContent}
      />
      <div className="cs-container bin-sizes-container">
        <RecommendedBins
          title={wpPage.residentialFields.largeBinsTitle}
          binType="large"
        />
        <RecommendedBins
          title={wpPage.residentialFields.smallBinsTitle}
          binType="small"
        />
      </div>
      <section className="bg-gradient-to-b from-white to-light-green">
        <SkipSizeCalculator inPage={false} pathName={location.pathname} />
        <AfterFormCTA content={wpPage.residentialFields.afterFormCta} />
      </section>
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
      residentialFields {
        wasteImage {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
          }
          altText
        }
        wasteContent
        smallBinsTitle
        largeBinsTitle
        afterFormCta
      }
    }
  }
`

export default ResidentialSolutions
