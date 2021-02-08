import React from "react"
import PropTypes from "prop-types"
import ContactForm5 from "../Forms/ContactForm5"

const HomeForm = ({ bookNowTitle, bookNowContent }) => {
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

HomeForm.propTypes = {
  bookNowTitle: PropTypes.string.isRequired,
  bookNowContent: PropTypes.string.isRequired,
}

export default HomeForm
