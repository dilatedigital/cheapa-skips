import React, { useState, createContext } from "react"

export const MenuContext = createContext({
  isMenuOpen: false,
  setMenuOpen: () => {},
})

export default props => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {props.children}
    </MenuContext.Provider>
  )
}
