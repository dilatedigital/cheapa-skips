import { graphql } from "gatsby"
import React from "react"
import InnerBanner from "../components/InnerBanner"
import Layout from "../components/layout"
import RecommendedBins from "../components/RecommendedBins"
import SEO from "../components/seo"
import SkipSizeCalculator from "../components/SkipSizeCalculator"
import WasteSection from "../components/WasteSection"

const ResidentialSolutions = ({ data: { wpPage } }) => {
  //console.log(wpPage.featuredImage)
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
      <SkipSizeCalculator inPage={false} />
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
      }
    }
  }
`

export default ResidentialSolutions
