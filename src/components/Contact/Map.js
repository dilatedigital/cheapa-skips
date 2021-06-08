import React from "react"
import GoogleMapReact from "google-map-react"
import MapPin from "../../images/map-pin.svg"

const AnyReactComponent = () => (
  <div style={{ transform: "translate(-50%, -50%)", position: "absolute" }}>
    <MapPin />
  </div>
)

const Map = () => {
  const defaultProps = {
    center: {
      lat: -32.23777614900359,
      lng: 115.79189148374728,
    },
    zoom: 15,
  }

  const mobileDefaultProps = {
    center: {
      lat: -32.2375765010717,
      lng: 115.79939094028093,
    },
    zoom: 18,
  }
  return (
    <div>
      <div
        style={{ height: "717px", width: "100%" }}
        className="desktop-map hidden lg:block"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLEMAPAPI }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={-32.2375765010717} lng={115.79939094028093} />
        </GoogleMapReact>
      </div>
      <div
        className="mobile-map lg:hidden"
        style={{ height: "350px", width: "100%" }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLEMAPAPI }}
          defaultCenter={mobileDefaultProps.center}
          defaultZoom={mobileDefaultProps.zoom}
        >
          <AnyReactComponent
            lat={mobileDefaultProps.center.lat}
            lng={mobileDefaultProps.center.lng}
          />
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Map
