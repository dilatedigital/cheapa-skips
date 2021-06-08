import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Map from "./Map"

const ContactMapInfo = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        siteGeneralSettings {
          siteSettingsFields {
            companyName
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
  const company = settings.companyName
  const email = settings.email
  const phone = settings.phone
  const mapLink = settings.address.googleMapLink
  const addressNumber = settings.address.number
  const suburb = settings.address.suburb
  const postalCode = settings.address.postalCode
  return (
    <section className="contact-map relative">
      <div className="contact-map-info">
        <div className="map-info--company">
          <h3>{company}</h3>
        </div>
        <div className="each-info">
          <div className="info-title">Phone</div>
          <div className="info-value">
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        </div>
        <div className="each-info mt-5">
          <div className="info-title">Email</div>
          <div className="info-value">
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <div className="each-info mt-5">
          <div className="info-title">Address</div>
          <div className="info-value">
            <a href={`${mapLink}`} target="_blank" rel="noreferrer">
              {addressNumber} <br /> {`${suburb}, ${postalCode}`}
            </a>
          </div>
        </div>
      </div>
      <Map />
    </section>
  )
}

export default ContactMapInfo
