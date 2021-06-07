import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const ContactInfo = () => {
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
  console.log(email)
  return <div className="contact-info cs-container">test</div>
}

export default ContactInfo
