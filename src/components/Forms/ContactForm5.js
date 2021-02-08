import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import ReactDatePicker from "react-datepicker"
import ReactSelect, { components } from "react-select"
import SearchIcon from "../../images/search.svg"
import ChevronDown from "../../images/arrow-down.svg"
import Calendar from "../../images/calendar.svg"
import Loading from "../../images/loading.svg"
import "react-datepicker/dist/react-datepicker.css"
import suburbs from "../../data/suburbs"

const ContactForm5 = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    control,
    watch,
  } = useForm()

  const [isFormSubmitting, setFormSubmit] = useState(false)

  const [isFormSubmitted, setFormSubmitted] = useState(false)

  const deliveryDate = watch("deliveryDate")
  const returnDate = watch("returnDate")

  const { isSubmitting } = formState

  const formLink = process.env.GATSBY_HOMEFORM

  //declare options for suburb
  let options = []

  suburbs.forEach(item => {
    options.push({
      value: item,
      label: item,
    })
  })

  //change dropdown indicator
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    )
  }

  //styles for react-select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      padding: "4px 1rem",
      borderRadius: "2px",
      boxShadow: state.isFocused ? "0 0 0 0.1rem #182B33" : 0,
      borderColor: state.isFocused ? "#182B33" : "#182b3347",
    }),
    valueContainer: base => ({
      ...base,
      padding: 0,
    }),
    dropdownIndicator: base => ({
      ...base,
      padding: "0 0 0 0.5rem",
    }),
    clearIndicator: base => ({
      ...base,
      padding: "0 0.5rem 0 0",
    }),
  }

  const onSubmit = data => {
    setFormSubmit(true)
    let bodyFormData = new FormData()

    bodyFormData.append("your-name", data.name)
    bodyFormData.append("your-email", data.email)
    bodyFormData.append("your-subject", data.subject)
    bodyFormData.append("waste-type", data.waste)
    bodyFormData.append("bin-size", data.bin)
    bodyFormData.append("delivery-date", data.deliveryDate)
    bodyFormData.append("return-date", data.returnDate)
    bodyFormData.append("suburb", data.suburb.value)

    axios
      .post(formLink, bodyFormData)
      .then(res => {
        if (res.data.status === "mail_sent") {
          console.log("Mail sent!")
          setFormSubmit(false)
          setFormSubmitted(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      {!isFormSubmitted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cs-form mt-8 relative"
        >
          <div className="name-email cs-form-control">
            <div>
              <label htmlFor="name">Name</label>
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className={`${errors.name ? "ring-2 ring-red-500" : ""}`}
                  ref={register({
                    required: "Name is required",
                    maxLength: {
                      value: 80,
                      message: "Name should not be more than 80 characters",
                    },
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters.",
                    },
                  })}
                  required
                />
                {errors.name && errors.name.message && (
                  <p>{errors.name.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className={`${errors.email ? "ring-2 ring-red-500" : ""}`}
                  ref={register({
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address.",
                    },
                  })}
                  required
                />
                {errors.email && errors.email.message && (
                  <p>{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="suburbs cs-form-control">
            <div>
              <label htmlFor="suburb">Suburb</label>
              <div>
                <Controller
                  name="suburb"
                  control={control}
                  rules={{ required: "Please select your suburb." }}
                  defaultValue=""
                  render={({ onChange }) => (
                    <ReactSelect
                      inputId="suburb"
                      onChange={onChange}
                      options={options}
                      isClearable
                      isSearchable
                      styles={customStyles}
                      components={{ DropdownIndicator }}
                      placeholder="Type your suburb name..."
                      className={`${
                        errors.suburb ? "ring-2 ring-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.suburb && errors.suburb.message && (
                  <p>{errors.suburb.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="waste-bin cs-form-control">
            <div>
              <label htmlFor="waste">Waste Type</label>
              <div className="relative">
                <select
                  name="waste"
                  id="waste"
                  ref={register({ required: "Please select a waste type." })}
                  className={`${errors.waste ? "ring-2 ring-red-500" : ""}`}
                  required
                >
                  <option value="">Select Waste Type</option>
                  <option value="General Waste">General Waste</option>
                  <option value="Mixed Heavy">Mixed Heavy Waste</option>
                  <option value="Cleanfill/Hardfill">Cleanfill/Hardfill</option>
                  <option value="Green Garden Waste">Green Garden Waste</option>
                  <option value="Soil/Dirt">Soil/Dirt</option>
                </select>
                <ChevronDown />
                {errors.waste && errors.waste.message && (
                  <p>{errors.waste.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="bin">Bin Size</label>
              <div className="relative">
                <select
                  name="bin"
                  id="bin"
                  ref={register({ required: "Please select a bin size." })}
                  className={`${errors.bin ? "ring-2 ring-red-500" : ""}`}
                  required
                >
                  <option value="">Select Bin Size</option>
                  <option value="2m3">2 Cubic Meter Bin (2m3)</option>
                  <option value="3m3">3 Cubic Meter Bin (3m3)</option>
                  <option value="4m3">4 Cubic Meter Bin (4m3)</option>
                  <option value="5m3">5 Cubic Meter Bin (5m3)</option>
                  <option value="6m3">6 Cubic Meter Bin (6m3)</option>
                  <option value="8m3">8 Cubic Meter Bin (8m3)</option>
                  <option value="9m3">9 Cubic Meter Bin (9m3)</option>
                  <option value="10m3">10 Cubic Meter Bin (10m3)</option>
                </select>
                <ChevronDown />
                {errors.bin && errors.bin.message && (
                  <p>{errors.bin.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="cs-dates cs-form-control">
            <div>
              <label htmlFor="deliveryDate">Delivery Date</label>
              <div className="relative">
                <Controller
                  name="deliveryDate"
                  control={control}
                  rules={{ required: "Please select a delivery date." }}
                  required
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <ReactDatePicker
                      onChange={onChange}
                      selected={value}
                      selectsStart
                      minDate={new Date()}
                      startDate={deliveryDate}
                      endDate={returnDate}
                      placeholderText="Choose delivery date"
                      id="deliveryDate"
                      className={`${
                        errors.deliveryDate ? "ring-2 ring-red-500" : ""
                      }`}
                    />
                  )}
                />
                <Calendar />
                {errors.deliveryDate && errors.deliveryDate.message && (
                  <p>{errors.deliveryDate.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="returnDate">Return Date</label>
              <div className="relative">
                <Controller
                  name="returnDate"
                  control={control}
                  rules={{ required: "Please select a delivery return date." }}
                  required
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <ReactDatePicker
                      onChange={onChange}
                      selected={value}
                      selectsEnd
                      minDate={deliveryDate}
                      startDate={deliveryDate}
                      endDate={returnDate}
                      id="returnDate"
                      placeholderText="Choose delivery return date"
                      className={`${
                        errors.returnDate ? "ring-2 ring-red-500" : ""
                      }`}
                    />
                  )}
                />
                <Calendar />
                {errors.returnDate && errors.returnDate.message && (
                  <p>{errors.returnDate.message}</p>
                )}
              </div>
            </div>
          </div>
          <input
            type="hidden"
            name="subject"
            ref={register}
            defaultValue="Book a Bin"
          />
          <button
            type="submit"
            aria-label="Submit"
            disabled={isSubmitting}
            className="mt-8 cs-btn"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {isFormSubmitting && (
            <div className="absolute bg-white bg-opacity-50 w-full h-full top-0 cs-spinner flex items-center justify-center">
              <Loading />
            </div>
          )}
        </form>
      )}
      {isFormSubmitted && (
        <div className="max-w-500px mx-auto mt-8 text-center">
          Thank you! We will get back to you shortly.
        </div>
      )}
    </>
  )
}

export default ContactForm5
