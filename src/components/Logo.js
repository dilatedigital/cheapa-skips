import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const Logo = () => {
  return (
    <Link to="/">
      <StaticImage
        src="../images/cheapa-skips-logo.png"
        alt="Cheapa Skips WA"
        width={126}
      />
    </Link>
  )
}

export default Logo
