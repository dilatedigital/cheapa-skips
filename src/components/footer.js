import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Logo from "./Logo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        themeFooterSettings {
          siteFooterFields {
            logo1 {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            logo2 {
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
    }
  `)

  const logo1ImageData = getImage(
    data.wp.themeFooterSettings.siteFooterFields.logo1.localFile
  )
  const logo2ImageData = getImage(
    data.wp.themeFooterSettings.siteFooterFields.logo2.localFile
  )

  return (
    <footer className="mt-auto container-lg px-15px pt-20 pb-12 cs-footer">
      <div className="cs-logos">
        <div className="text-center lg:text-left">
          <Logo />
        </div>
        <div className="assocs-logo mt-7 flex">
          <div className="assocs-logo--1">
            <GatsbyImage
              image={logo1ImageData}
              alt={data.wp.themeFooterSettings.siteFooterFields.logo1.altText}
            />
          </div>
          <div className="assocs-logo--2">
            <GatsbyImage
              image={logo2ImageData}
              alt={data.wp.themeFooterSettings.siteFooterFields.logo2.altText}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
