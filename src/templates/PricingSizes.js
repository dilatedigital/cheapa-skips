import React from "react"
import { graphql } from "gatsby"
import InnerBanner from "../components/Residential/InnerBanner"
import Layout from "../components/layout"
import SEO from "../components/seo"
//import SkipBinSizes from "../components/Home/SkipBinSizes"
import AdditionalEquipment from "../components/Pricing/AdditionalEquipment"
import Products from "../components/Products"

const PricingSizes = ({ data: { wpPage } }) => {
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
      {/* <SkipBinSizes binType="all" page="pricing" /> */}
      <Products binType="all" page="pricing" />
      <AdditionalEquipment node={wpPage.pricingSizesFields} />
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
      pricingSizesFields {
        addEquipmentTitle
        equipment {
          equipmentTitle
          rated
          wide
          image {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          requirements {
            requirement
          }
          pricing {
            pricingName
            pricingValue
          }
          notes {
            note
          }
        }
      }
    }
  }
`

export default PricingSizes
