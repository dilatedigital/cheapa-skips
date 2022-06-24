import React, { useState, createContext } from "react"

export const MenuContext = createContext({
  isMenuOpen: false,
  setMenuOpen: () => {},
  closeMenu: () => {},
})

export default props => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!isMenuOpen)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>
      {props.children}
    </MenuContext.Provider>
  )
}
