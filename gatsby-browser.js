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

export const wrapRootElement = ({ element }) => (
  <MenuContextWrapper>
    <ModalContextWrapper>{element}</ModalContextWrapper>
  </MenuContextWrapper>
)
