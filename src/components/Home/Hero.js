import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import CircleBg from "../../images/circle.svg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Hero = ({
  showHeroButton,
  heroTitle,
  heroTexts,
  heroSlogan,
  heroButton,
  heroImage,
}) => {
  const imageData = getImage(heroImage.localFile)

  const firstTwoWords = string => {
    let splitedString = string.split(" ")
    let restOfString = splitedString.slice(2).join(" ")

    return (
      <>
        {`${splitedString[0]} ${splitedString[1]}`}
        <br /> {restOfString}
      </>
    )
  }

  return (
    <div className="cs-container cs-hero lg:mt-22 lg:flex lg:justify-between lg:items-center">
      <div className="cs-hero-texts">
        <h1 className="font-bold">{heroTitle}</h1>
        <h2 className="font-bold mt-6 lg:mt-5.5">
          {firstTwoWords(heroSlogan)}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: heroTexts }}
          className="hero-content my-7 lg:max-w-400px lg:mt-8.5 lg:mb-7.5"
        />
        {showHeroButton && (
          <Button
            link={heroButton.buttonLink.uri}
            text={heroButton.buttonText}
            outline={false}
          />
        )}
      </div>
      <div className="relative hero-image lg:max-w-811px lg:flex lg:justify-end w-full">
        <div className="absolute left-0 lg:-top-90px">
          <CircleBg />
        </div>
        <GatsbyImage image={imageData} alt="Cheap Skips Bin" />
      </div>
    </div>
  )
}

Hero.propTypes = {
  showHeroButton: PropTypes.bool,
  heroTitle: PropTypes.string.isRequired,
  heroTexts: PropTypes.string.isRequired,
  heroSlogan: PropTypes.string.isRequired,
  heroButton: PropTypes.object,
  heroImage: PropTypes.object.isRequired,
}

export default Hero
