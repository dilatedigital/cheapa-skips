import React from "react"
import PropTypes from "prop-types"
import Phone from "../../images/phone-call.svg"
import Button from "../Button"

const FooterCI = ({ phone, email, btnLink }) => {
  return (
    <div className="mt-8 lg:mt-0">
      <ul>
        <li className="mb-4">
          <a
            href={`tel:${phone}`}
            className="text-phone-header text-primary font-bold flex items-center justify-center lg:justify-start"
          >
            <Phone className="mr-3" />
            {phone}
          </a>
        </li>
        <li className="text-center lg:text-left mb-4">
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          <Button
            link={btnLink}
            outline={false}
            text="Book a Bin"
            alignment="center"
          />
        </li>
      </ul>
    </div>
  )
}

FooterCI.propTypes = {
  phone: PropTypes.string.isRequired,
  email: PropTypes.string,
}

export default FooterCI
