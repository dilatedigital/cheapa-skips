import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Button = ({ text, outline, link }) => {
  return (
    <Link to={link} className={`cs-btn ${outline ? "cs-btn--outline" : ""}`}>
      {text}
    </Link>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  outline: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
}

Button.defaultProps = {
  text: "Book a Bin",
}

export default Button
