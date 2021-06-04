import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Button from "../Button"

const AdditionalEquipment = ({ node }) => {
  const imageData = getImage(node.equipment.image.localFile)
  console.log(node)
  return (
    <section className="add-equip-section cs-container">
      <h3>{node.addEquipmentTitle}</h3>
      <div className="equipment">
        <div className="equipment__image">
          <GatsbyImage image={imageData} alt={node.equipment.image.altText} />
          <div className="rated-wide">
            <div className="rated">
              <h6>Rated</h6>
              <h5>{node.equipment.rated}</h5>
            </div>
            <div className="wide">
              <h6>Wide</h6>
              <h5>{node.equipment.wide}</h5>
            </div>
          </div>
        </div>
        <div className="equipment__info">
          <div className="info-title-bar">
            <h4>{node.equipment.equipmentTitle}</h4>
          </div>
          <div className="info-pricing">
            <h5>Pricing</h5>
            <div className="pricing">
              {node.equipment.pricing.map(item => {
                return (
                  <div className="flex" key={item.pricingName}>
                    <div className="pricing-name">{item.pricingName}</div>
                    <div className="pricing-value font-bold">
                      {item.pricingValue}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="notes">
              {node.equipment.notes.map(note => (
                <p key={note.note}>*{note.note}</p>
              ))}
            </div>
            <div className="requirements">
              {node.equipment.requirements.map(requirement => (
                <p key={requirement.requirement}>{requirement.requirement}</p>
              ))}
            </div>
            <Button text="Book Now" />
          </div>
        </div>
      </div>
    </section>
  )
}

AdditionalEquipment.propTypes = {
  node: PropTypes.object.isRequired,
}

export default AdditionalEquipment
