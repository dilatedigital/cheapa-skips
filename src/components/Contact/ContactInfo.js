import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import ContactPageForm from "../Forms/ContactPageForm"

const ContactInfo = ({ formContent }) => {
  const data = useStaticQuery(graphql`
    {
      wp {
        siteGeneralSettings {
          siteSettingsFields {
            email
            phone
            address {
              googleMapLink
              number
              postalCode
              suburb
            }
          }
        }
      }
    }
  `)

  const {
    wp: {
      siteGeneralSettings: { siteSettingsFields: settings },
    },
  } = data
  const email = settings.email
  const phone = settings.phone
  const mapLink = settings.address.googleMapLink
  const addressNumber = settings.address.number
  const suburb = settings.address.suburb
  const postalCode = settings.address.postalCode

  return (
    <div className="cs-container">
      <div className="contact-info">
        <div className="each-info">
          <div className="info-title">Email</div>
          <div className="info-value">
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <div className="each-info">
          <div className="info-title">Phone</div>
          <div className="info-value">
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        </div>
        <div className="each-info">
          <div className="info-title">Address</div>
          <div className="info-value">
            <a href={`${mapLink}`} target="_blank" rel="noreferrer">
              {addressNumber} <br /> {`${suburb}, ${postalCode}`}
            </a>
          </div>
        </div>
      </div>
      <div className="contact-content">
        <div
          dangerouslySetInnerHTML={{ __html: formContent }}
          className="contact-text"
        />
        <ContactPageForm />
      </div>
    </div>
  )
}

ContactInfo.propTypes = {
  formContent: PropTypes.string.isRequired,
}

export default ContactInfo
