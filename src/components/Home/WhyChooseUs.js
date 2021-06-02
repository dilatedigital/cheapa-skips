import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const WhyChooseUs = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        siteGeneralSettings {
          siteSettingsFields {
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
          }
        }
      }
    }
  `)

  const whyChooseUsTitle =
    data.wp.siteGeneralSettings.siteSettingsFields.whyChooseUsTitle
  const whyChooseUsContent =
    data.wp.siteGeneralSettings.siteSettingsFields.whyChooseUsContent
  const whyChooseUsImage =
    data.wp.siteGeneralSettings.siteSettingsFields.whyChooseUsImage
  const whyChooseUsIcons =
    data.wp.siteGeneralSettings.siteSettingsFields.whyChooseUsIcons
  const imageData = getImage(whyChooseUsImage.localFile)

  return (
    <section className="cs-why pb-10 xl:flex xl:items-center">
      <div className="px-15px cs-why-content">
        <h3 className="text-h3-sm mb-4 lg:text-h3-lg">{whyChooseUsTitle}</h3>
        <div dangerouslySetInnerHTML={{ __html: whyChooseUsContent }} />
        <div className="mt-8 md:grid md:grid-cols-2 md:gap-8 xl:mt-14">
          {whyChooseUsIcons.map(eachIcon => {
            return (
              <div key={eachIcon.id} className="each-reason flex items-center">
                <div className="w-16">
                  <img
                    src={eachIcon.icon.localFile.publicURL}
                    alt={eachIcon.icon.altText}
                  />
                </div>

                <div className="font-bold ml-4">{eachIcon.name}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="cs-welcome-image cs-why-image ml-auto mt-10 lg:text-right lg:mt-14 xl:mt-0">
        <GatsbyImage image={imageData} alt={whyChooseUsImage.altText} />
      </div>
    </section>
  )
}

export default WhyChooseUs
