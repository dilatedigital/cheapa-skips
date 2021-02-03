import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const WhyChooseUs = ({
  whyChooseUsTitle,
  whyChooseUsContent,
  whyChooseUsImage,
  whyChooseUsIcons,
}) => {
  const imageData = getImage(whyChooseUsImage.localFile)
  return (
    <section className="cs-why pb-20 xl:flex xl:items-center">
      <div className="px-15px cs-why-content">
        <h3 className="text-h3-sm mb-4 lg:text-h3-lg">{whyChooseUsTitle}</h3>
        <div dangerouslySetInnerHTML={{ __html: whyChooseUsContent }} />
        <div className="mt-8 md:grid md:grid-cols-2 md:gap-8 xl:mt-14">
          {whyChooseUsIcons.map(eachIcon => {
            console.log(eachIcon)
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

WhyChooseUs.propTypes = {
  whyChooseUsTitle: PropTypes.string.isRequired,
  whyChooseUsContent: PropTypes.string.isRequired,
  whyChooseUsImage: PropTypes.object.isRequired,
  whyChooseUsIcons: PropTypes.array.isRequired,
}

export default WhyChooseUs
