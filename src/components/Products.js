import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { StaticImage } from "gatsby-plugin-image"
import getStripe from "../utils/stripejs"
import Loading from "../images/loading.svg"
import CircleBg from "../images/circle.svg"

const Products = ({ title, binType, page, content }) => {
  let extra = page ? true : false
  const [products, setProducts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    axios("/api/get-products").then(result => {
      if (result.status !== 200) {
        console.error("Error loading shopnotes")
        console.error(result)
        return
      }
      setProducts(result.data)
      setLoaded(true)
    })
  }, [])

  const addToCart = sku => {
    setCart([...cart, sku])
  }

  const buyOne = sku => {
    const skus = []
    skus.push(sku)
    const payload = {
      skus: skus,
    }
    performPurchase(payload)
  }

  const checkOut = () => {
    console.log("Checking out...")
    const payload = {
      skus: cart,
    }
    performPurchase(payload)
    console.log("Check out has been done!")
  }

  const performPurchase = async payload => {
    const response = await axios.post("/api/create-checkout", payload)
    console.log("response", response)
    const stripe = await getStripe(response.data.publishableKey)

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.sessionId,
    })

    if (error) {
      console.error(error)
    }
  }

  return (
    <>
      {loaded ? (
        <section
          className={`text-center px-15px skip-bin-sizes ${
            binType === "all" ? "all-bin" : "py-0 xl:py-0"
          } ${page === "pricing" ? "pricing-bins" : ""}`}
        >
          {title && <h3 className="text-h3-sm lg:text-h3-lg">{title}</h3>}
          {content && (
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="md:max-w-725px lg:mx-auto mt-2.5"
            />
          )}
          <div
            className={`skip-bins-container mt-14 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:mt-11  ${
              page === "calcu" ? "xl:gap-y-44" : "xl:gap-y-17"
            }`}
          >
            {products.map(product => (
              <div className="each-bin">
                {extra && (
                  <div className="hidden recommended-bin-bg text-center font-bold text-white py-4 bg-secondary">
                    Recommended
                  </div>
                )}
                <div className={`${extra ? "each-bin-calcu" : ""} `}>
                  <div
                    className={`flex items-center justify-center h-bin-img ${
                      extra ? "each-bin-mt" : ""
                    }`}
                  >
                    <CircleBg />
                    <StaticImage
                      src="../images/bin.png"
                      width={300}
                      quality={95}
                      formats={["AUTO", "WEBP", "AVIF"]}
                      alt="Bin"
                    />
                  </div>
                  <div className="bin-specs text-left mt-9">
                    <h4 className="font-bold text-bin-title mb-2">
                      {product.name}
                    </h4>
                    <div className="flex border-b border-opacity-20 pb-2 mb-4">
                      <div className="spec-name">Starting at</div>
                      <div className="spec-value text-secondary">
                        {`$ ${product.unit_amount}`}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="spec-name">Dimensions</div>
                      <div className="spec-value">{product.description}</div>
                    </div>
                    <div className="flex">
                      <div className="spec-name">Trailer Loads</div>
                      <div className="spec-value">{product.trailer_loads}</div>
                    </div>
                    <div className="flex">
                      <div className="spec-name">Wheelie Bins</div>
                      <div className="spec-value">{product.wheelie_bins}</div>
                    </div>
                    <div className="mt-7.5">
                      <button
                        className="cs-btn cs-btn--outline"
                        onClick={() => buyOne(product.sku)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* {products.map((product, index) => (
            <div className="product" key={`${product.sku}-image`}>
              <StaticImage
                src="../images/bin.png"
                width={300}
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Bin"
              />
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              <p className="price">
                Price: <b>${product.unit_amount}</b>
              </p>
              <button onClick={() => buyOne(product.sku)}>Buy Now</button>{" "}
            </div>
          ))} */}
        </section>
      ) : (
        <div className="absolute bg-white bg-opacity-50 w-full h-full top-0 cs-spinner flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  )
}

Products.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  binType: PropTypes.string.isRequired,
  page: PropTypes.string,
}

export default Products
