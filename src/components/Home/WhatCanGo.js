import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"

const WhatCanGo = ({
  whatCanGoTitle,
  whatCanGoContent,
  whatCanGoIcons,
  whatCanGoButton,
}) => {
  //console.log(whatCanGoButton)
  return (
    <section className="cs-whatCanGo px-15px text-center py-20 lg:pb-44 lg:pt-0">
      <h3 className="text-h3-sm mb-4 lg:text-h3-lg">{whatCanGoTitle}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: whatCanGoContent }}
        className="cs-whatCanGoContent lg:max-w-795px lg:mx-auto"
      />
      <div className="mt-7.5 grid grid-cols-3 gap-y-10 lg:grid-cols-6 xl:max-w-wcg-container xl:mx-auto xl:mt-90px xl:gap-y-20">
        {whatCanGoIcons.map(eachIcon => {
          return (
            <div key={eachIcon.id}>
              <img
                src={eachIcon.icon.localFile.publicURL}
                alt={eachIcon.icon.altText}
                className="mx-auto"
              />
              <div className="font-bold mt-9">{eachIcon.name}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-10 xl:mt-70px">
        <Button
          link={whatCanGoButton.whatCanGoButtonLink?.uri}
          text={whatCanGoButton.whatCanGoButtonText}
          alignment="center"
        />
      </div>
    </section>
  )
}

WhatCanGo.propTypes = {
  whatCanGoButton: PropTypes.object.isRequired,
  whatCanGoTitle: PropTypes.string.isRequired,
  whatCanGoContent: PropTypes.string.isRequired,
  whatCanGoIcons: PropTypes.array.isRequired,
}

export default WhatCanGo
