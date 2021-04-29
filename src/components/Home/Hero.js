import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import CircleBg from "../../images/circle.svg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useSpring, animated } from "react-spring"

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 12}px,${y / 12}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 0}px,${y / 8 - 0}px,0)`

const Hero = ({
  showHeroButton,
  heroTitle,
  heroTexts,
  heroSlogan,
  heroButton,
  heroImage,
}) => {
  const imageData = getImage(heroImage.localFile)
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  return (
    <div className="cs-container cs-hero mt-12 xl:mt-18 md:flex md:justify-between md:items-center">
      <div className="cs-hero-texts">
        <h1 className="font-bold">{heroTitle}</h1>
        <div
          className="font-bold mt-6 lg:mt-5.5"
          dangerouslySetInnerHTML={{ __html: heroSlogan }}
        />

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
      <div
        className="relative hero-image mt-8 justify-center lg:mt-0 lg:max-w-400px xl:max-w-811px lg:flex lg:justify-end w-full"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      >
        <animated.div
          className="absolute left-0 lg:-top-90px"
          style={{ transform: props.xy.interpolate(trans1) }}
        >
          <CircleBg />
        </animated.div>
        <animated.div
          style={{ transform: props.xy.interpolate(trans2) }}
          className="main-img-container max-w-270px mx-auto xl:mx-0 xl:max-w-full"
        >
          <GatsbyImage
            image={imageData}
            alt="Cheap Skips Bin"
            className="mt-8 xl:mt-0"
          />
        </animated.div>
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
