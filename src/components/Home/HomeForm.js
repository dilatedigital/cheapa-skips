import React from "react"
import ContactForm5 from "../Forms/ContactForm5"
import { graphql, useStaticQuery } from "gatsby"

const HomeForm = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        siteGeneralSettings {
          siteSettingsFields {
            bookNowTitle
            bookNowContent
          }
        }
      }
    }
  `)

  const bookNowTitle =
    data.wp.siteGeneralSettings.siteSettingsFields.bookNowTitle
  const bookNowContent =
    data.wp.siteGeneralSettings.siteSettingsFields.bookNowContent
  return (
    <section className="cs-home-form pt-10 pb-20 bg-gradient-to-b from-white to-light-green lg:py-32">
      <div className="px-15px text-center">
        <h3 className="text-h3-sm mb-4 lg:text-h3-lg">{bookNowTitle}</h3>
        <div dangerouslySetInnerHTML={{ __html: bookNowContent }} />
      </div>
      <ContactForm5 />
    </section>
  )
}

export default HomeForm
