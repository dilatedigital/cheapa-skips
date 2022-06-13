/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import MenuContextWrapper from "./src/context/MenuContext"
import ModalContextWrapper from "./src/context/ModalContext"
import "./src/styles/global.css"
import { Script, ScriptStrategy } from "gatsby"

const captchaKey = `https://www.google.com/recaptcha/api.js?render=${process.env.GATSBY_RECAPTCHA_KEY}`

export const wrapRootElement = ({ element }) => (
  <>
    <Script src={captchaKey} strategy={ScriptStrategy.idle} />
    <MenuContextWrapper>
      <ModalContextWrapper>{element}</ModalContextWrapper>
    </MenuContextWrapper>
  </>
)
