import { graphql } from "gatsby"
import React from "react"
import InnerBanner from "../components/Residential/InnerBanner"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutOfferSection from "../components/About/AboutOfferSection"
import AboutGallerySection from "../components/About/AboutGallerySection"
import WhyChooseUs from "../components/Home/WhyChooseUs"
import HomeForm from "../components/Home/HomeForm"

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
      <AboutOfferSection content={wpPage.aboutPageFields.aboutOfferText} />
      <AboutGallerySection
        image1={wpPage.aboutPageFields.aboutGallery.image1}
        image2={wpPage.aboutPageFields.aboutGallery.image2}
        image3={wpPage.aboutPageFields.aboutGallery.image3}
        image4={wpPage.aboutPageFields.aboutGallery.image4}
      />
      <WhyChooseUs />
      <HomeForm />
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
      aboutPageFields {
        aboutGallery {
          image1 {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
            altText
          }
          image2 {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
            altText
          }
          image3 {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
            altText
          }
          image4 {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
            altText
          }
        }
        aboutOfferText
      }
    }
  }
`

export default About
