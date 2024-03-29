import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import Button from "../Button"

const Welcome = ({
  welcomeTitle,
  welcomeContent,
  welcomeImage,
  welcomeButton,
  welcomeHome,
}) => {
  //console.log(welcomeButton)
  const imageData = getImage(welcomeImage.localFile)
  return (
    <section
      className={`cs-welcome xl:flex xl:items-center xl:h-welcome-img ${
        welcomeHome ? "mt-24 lg:mt-26 xl:mt-32" : ""
      }`}
    >
      <div className="cs-welcome-image hidden lg:block">
        <GatsbyImage image={imageData} alt={welcomeImage.altText} />
      </div>
      <div className="px-15px mt-10 cs-welcome-content xl:ml-18 xl:mt-0">
        {welcomeTitle && (
          <h3 className="text-h3-sm mb-4 lg:text-h3-lg">{welcomeTitle}</h3>
        )}

        <div dangerouslySetInnerHTML={{ __html: welcomeContent }} />
        {welcomeButton && (
          <div className="mt-8 xl:mt-11.5">
            <Button
              link={welcomeButton.welcomeButtonLink?.uri}
              text={welcomeButton.welcomeButtonText}
              outline={true}
            />
          </div>
        )}
      </div>
    </section>
  )
}

Welcome.propTypes = {
  welcomeTitle: PropTypes.string,
  welcomeContent: PropTypes.string.isRequired,
  welcomeImage: PropTypes.object.isRequired,
  welcomeButton: PropTypes.object,
  welcomeHome: PropTypes.bool,
}

export default Welcome
