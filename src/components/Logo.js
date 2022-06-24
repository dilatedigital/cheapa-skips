import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const Logo = props => {
  //console.log(props)
  return (
    <Link to="/" onKeyDown={props.closeMenu} onClick={props.closeMenu}>
      <StaticImage
        src="../images/cheapa-skips-logo.png"
        alt="Cheapa Skips WA"
        width={126}
      />
    </Link>
  )
}

export default Logo
