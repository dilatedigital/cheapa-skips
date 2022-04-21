import React from "react"
import ContactPageForm from "./Forms/ContactPageForm"

const NoPostcodeFound = () => {
  return (
    <div className="cs-container no-postcode-found-container">
      <div
        className="text-center text-bin-title mt-4 lg:mt-50px"
        style={"color: #a7a7a7;"}
      >
        Your location isn't currently available. Please get in touch with us
        below.
      </div>
      <div className="mt-8 npfc-text-form contact-content lg:mt-17">
        <div className="npfc-text">
          <h3 className="text-h3-sm lg:text-h3-lg">
            Can't see your suburbs on the list?
          </h3>
          <p className="text-lg mt-3 lg:mt-6">
            Fill up the form and our Team will get back to you within 24 hours.
          </p>
        </div>

        <ContactPageForm withSuburb={true} />
      </div>
    </div>
  )
}

export default NoPostcodeFound
