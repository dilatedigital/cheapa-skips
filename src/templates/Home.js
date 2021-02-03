import React from "react"
import Hero from "../components/Home/Hero"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import SkipBinSizes from "../components/Home/SkipBinSizes"
import Welcome from "../components/Home/Welcome"
import WhatCanGo from "../components/Home/WhatCanGo"
import WhyChooseUs from "../components/Home/WhyChooseUs"
import HomeForm from "../components/Home/HomeForm"

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
      <Welcome
        welcomeTitle={wpPage.homeFields.welcomeTitle}
        welcomeContent={wpPage.homeFields.welcomeContent}
        welcomeImage={wpPage.homeFields.welcomeImage}
        welcomeButton={wpPage.homeFields.welcomeButton}
      />
      <WhatCanGo
        whatCanGoButton={wpPage.homeFields.whatCanGoButton}
        whatCanGoTitle={wpPage.homeFields.whatCanGoTitle}
        whatCanGoContent={wpPage.homeFields.whatCanGoContent}
        whatCanGoIcons={wpPage.homeFields.whatCanGoIcons}
      />
      <WhyChooseUs
        whyChooseUsTitle={wpPage.homeFields.whyChooseUsTitle}
        whyChooseUsContent={wpPage.homeFields.whyChooseUsContent}
        whyChooseUsImage={wpPage.homeFields.whyChooseUsImage}
        whyChooseUsIcons={wpPage.homeFields.whyChooseUsIcons}
      />
      <HomeForm
        bookNowTitle={wpPage.homeFields.bookNowTitle}
        bookNowContent={wpPage.homeFields.bookNowContent}
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
        welcomeTitle
        welcomeContent
        welcomeImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        welcomeButton {
          welcomeButtonLink {
            ... on WpPage {
              id
              uri
            }
          }
          welcomeButtonText
        }
        whatCanGoTitle
        whatCanGoContent
        whatCanGoButton {
          whatCanGoButtonLink {
            ... on WpPage {
              uri
            }
          }
          whatCanGoButtonText
        }
        whatCanGoIcons {
          name
          icon {
            altText
            id
            localFile {
              publicURL
            }
          }
        }
        whyChooseUsTitle
        whyChooseUsContent
        whyChooseUsImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          altText
        }
        whyChooseUsIcons {
          icon {
            altText
            id
            localFile {
              publicURL
            }
          }
          name
        }
        bookNowTitle
        bookNowContent
      }
    }
  }
`

export default Home
