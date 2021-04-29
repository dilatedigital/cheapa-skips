import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SkipSizeCalculator from "../components/Calculator/SkipSizeCalculator"
import SkipBinSizes from "../components/Home/SkipBinSizes"
import AfterCalcContent from "../components/Calculator/AfterCalcContent"

const SkipSizeCalculatorPage = ({ data: { wpPage }, location }) => {
  console.log(location)
  useEffect(() => {
    if (
      location.hash &&
      (location.state.prevPath === "/residential-solutions/" ||
        location.pathname === "/skip-size-calculator/")
    ) {
      let id = location.state.binId
      const bins = document.querySelectorAll(".each-bin")

      bins.forEach(el => {
        el.classList.remove("recommended")
      })

      const element = document.getElementById(id)

      element.classList.add("recommended")
      console.log(element)
    }
  }, [location.hash, location.pathname])

  return (
    <Layout>
      <div className="calculator-page">
        <SEO
          title={wpPage.seo.title}
          description={wpPage.seo.metaDesc}
          image={
            wpPage.seo.opengraphImage
              ? wpPage.seo.opengraphImage.localFile.publicURL
              : null
          }
        />
        <SkipSizeCalculator inPage={true} />
        <AfterCalcContent content={wpPage.content} />
        <SkipBinSizes binType="all" page="calcu" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      seo {
        metaDesc
        title
        opengraphImage {
          localFile {
            publicURL
          }
        }
      }
      content
    }
  }
`

export default SkipSizeCalculatorPage
