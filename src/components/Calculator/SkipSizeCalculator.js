import React from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import ChevronRight from "../../images/ios-arrow-forward.svg"
import { navigate } from "gatsby"
import { IoIosArrowDown } from "react-icons/io"

let id

export const calculate = (volume, material) => {
  if (volume <= 2 && volume > 0 && material === "soft") {
    id = "2m3"
  } else if (volume >= 2 && volume <= 3 && material === "soft") {
    id = "3m3"
  } else if (volume >= 3 && volume <= 4 && material === "soft") {
    id = "4m3"
  } else if (volume >= 4 && volume <= 5 && material === "soft") {
    id = "5m3"
  } else if (volume >= 5 && volume <= 6 && material === "soft") {
    id = "6m3"
  } else if (volume >= 6 && volume <= 8 && material === "soft") {
    id = "8m3"
  } else if (volume >= 8 && volume <= 9 && material === "soft") {
    id = "9m3"
  } else if (volume >= 9 && volume <= 10 && material === "soft") {
    id = "10m3"
  } else if (volume >= 0 && volume <= 1 && material === "hard") {
    id = "2m3"
  } else if (volume >= 1 && volume <= 2 && material === "hard") {
    id = "3m3"
  } else if (volume >= 2 && volume <= 3 && material === "hard") {
    id = "4m3"
  } else if (volume >= 3 && volume <= 4 && material === "hard") {
    id = "5m3"
  } else if (volume >= 4 && volume <= 5 && material === "hard") {
    id = "6m3"
  } else if (volume >= 5 && volume <= 6 && material === "hard") {
    id = "8m3"
  } else if (volume >= 6 && volume <= 8 && material === "hard") {
    id = "9m3"
  } else if (volume >= 8 && volume <= 10 && material === "hard") {
    id = "10m3"
  } else {
    id = "2m3"
  }

  // const bins = document.querySelectorAll(".each-bin")

  // bins.forEach(el => {
  //   el.classList.remove("recommended")
  // })

  // const element = document.getElementById(id)

  // element.classList.add("recommended")
}

const SkipSizeCalculator = ({ inPage, pathName }) => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    //console.log(data)
    calculate(parseInt(data.volume), data.material)

    navigate("/skip-size-calculator/#" + id + "", {
      state: {
        volume: data.volume,
        material: data.material,
        prevPath: pathName,
        binId: id,
      },
    })
  }

  return (
    <div
      class={`calculator-container cs-container ${
        inPage ? "mt-0 inPage-calcu" : "mt-12 lg:mt-42 "
      }`}
    >
      {!inPage ? (
        <h2 className="text-h3-sm lg:text-h3-lg">Skip Size Calculator</h2>
      ) : (
        <h1>Skip Size Calculator</h1>
      )}
      <p className="mt-4">
        Use our simple skip size calculator to get a recommended skip based on
        your needs.
      </p>
      <div className={`main-calculator ${inPage ? "main-calcu-mt-lg" : ""}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mc-form-control">
            <div className="lg:flex lg:items-center">
              <label htmlFor="calcuVolume">Volume</label>
              <div>
                <input
                  type="text"
                  ref={register({
                    required: "Please enter a value from 0 - 10",
                    pattern: {
                      value: /^([0-9]|1[0])$/,
                      message: "Can only accept numbers from 0-10",
                    },
                  })}
                  name="volume"
                  id="calcuVolume"
                  placeholder="0"
                />
              </div>
            </div>
            {errors.volume && errors.volume.message && (
              <p className="lg:hidden">{errors.volume.message}</p>
            )}
          </div>
          <div className="mc-form-control">
            <div className="lg:flex lg:items-center">
              <label htmlFor="calcuMaterial">Material</label>
              <div className="relative">
                <select
                  name="material"
                  id="calcuMaterial"
                  ref={register({ required: "Please select material." })}
                  className={`${errors.material ? "ring-2 ring-red-500" : ""}`}
                  required
                >
                  <option value="soft">Soft Material</option>
                  <option value="hard">Hard Material</option>
                </select>
                <IoIosArrowDown className="text-2xl" />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              aria-label="Calculate Skip"
              className="cs-btn"
            >
              Calculate Skip
              <ChevronRight />
            </button>
          </div>
        </form>
        {errors.volume && errors.volume.message && (
          <p className="hidden lg:block mt-4">{errors.volume.message}</p>
        )}
      </div>
    </div>
  )
}

SkipSizeCalculator.propTypes = {
  inPage: PropTypes.bool.isRequired,
}

export default SkipSizeCalculator
