import React from "react"
import PropTypes from "prop-types"
import UniversalLink from "../../utils/UniversalLink"
import ChevronDown from "../../images/arrow-down.svg"

const MobileMenuLi = props => {
  //console.log(props)

  const handleClick = menuItem => {
    let a = new Array(props.totalMenuItems).fill(false).map((_, index) => {
      if (index === menuItem && props.isOpen) {
        return false
      } else if (index === menuItem) {
        return true
      } else {
        return false
      }
    })
    return props.onClick(a)
  }

  return (
    <li
      key={props.menuItem.key}
      className="items-center relative menu-item mb-30px"
    >
      <div className="flex justify-between">
        <UniversalLink
          className="text-lg"
          to={
            props.menuItem.connectedNode
              ? props.menuItem.connectedNode.node.uri
              : props.menuItem.url
          }
          onClick={props.toggleMenu}
          onKeyDown={props.toggleMenu}
        >
          {props.menuItem.title}
        </UniversalLink>
        {props.menuItem.children.length > 0 && (
          <button
            className="ml-4 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle Submenu"
            onClick={() => handleClick(props.menuItem.id)}
          >
            <ChevronDown />
          </button>
        )}
      </div>

      {props.menuItem.children.length > 0 && (
        <ul
          className={`w-250px bg-transparent transition-all px-4 border-l border-gray-200 ${
            props.isOpen ? "mt-4 max-h-full" : "max-h-0 overflow-hidden"
          }`}
        >
          {props.menuItem.children.map(subItem => {
            return (
              <li key={subItem.key}>
                <UniversalLink
                  to={subItem.url}
                  className="font-pop text-ct-black text-mobile-submenu"
                  onKeyDown={props.toggleMenu}
                  onClick={props.toggleMenu}
                >
                  {subItem.title}
                </UniversalLink>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

MobileMenuLi.propTypes = {
  menuItem: PropTypes.object.isRequired,
}

export default MobileMenuLi
