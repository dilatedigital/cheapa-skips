import { graphql } from "gatsby"
import React from "react"
import InnerBanner from "../components/Residential/InnerBanner"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WasteSection from "../components/Residential/WasteSection"
import AfterFormCTA from "../components/Residential/AfterFormCTA"
import RelatedBins from "../components/Residential/RelatedBins"

const ResidentialSolutions = ({ data: { wpPage }, location }) => {
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
        <RelatedBins
          title={wpPage.residentialFields.largeBinsTitle}
          bins={wpPage.residentialFields.relatedBins}
        />
        <RelatedBins
          title={wpPage.residentialFields.smallBinsTitle}
          bins={wpPage.residentialFields.relatedBinsCopy}
        />
      </div>
      <section className="bg-gradient-to-b from-white to-light-green">
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
        relatedBins {
          ... on WpBinSize {
            id
            featuredImage {
              node {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: TRACED_SVG, quality: 100)
                  }
                }
              }
            }
            title
            skipBinSizesFields {
              dimensions
              trailerLoads
              wheelieBins
              price
              alias
            }
          }
        }
        relatedBinsCopy {
          ... on WpBinSize {
            id
            featuredImage {
              node {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: TRACED_SVG, quality: 100)
                  }
                }
              }
            }
            title
            skipBinSizesFields {
              dimensions
              trailerLoads
              wheelieBins
              price
              alias
            }
          }
        }
      }
    }
  }
`

export default ResidentialSolutions
