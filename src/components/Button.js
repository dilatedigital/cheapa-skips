import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Button = ({ text, outline, link, alignment }) => {
  return (
    <Link
      to={link}
      className={`cs-btn ${outline ? "cs-btn--outline" : ""} ${
        alignment === "center" ? "mx-auto" : "mx-0"
      }`}
    >
      {text}
    </Link>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  outline: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  alignment: PropTypes.string,
}

Button.defaultProps = {
  text: "Book a Bin",
  outline: false,
  alignment: "left",
}

export default Button
