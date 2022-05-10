import React, { useState, useContext } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { ModalContext } from "../../context/ModalContext"
import ReactDatePicker from "react-datepicker"
import ReactSelect, { components } from "react-select"
import SearchIcon from "../../images/search.svg"
import ChevronDown from "../../images/arrow-down.svg"
import Calendar from "../../images/calendar.svg"
import Loading from "../../images/loading.svg"
import "react-datepicker/dist/react-datepicker.css"
import suburbs from "../../data/suburbs"
import PropTypes from "prop-types"
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3"

const ContactForm5 = ({ isModal }) => {
  const [token, setToken] = useState()
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  })

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    })
  }

  const { modalTitle, binSize } = useContext(ModalContext)

  const { register, handleSubmit, errors, control, watch } = useForm()

  const [isFormSubmitting, setFormSubmit] = useState(false)

  const [isFormSubmitted, setFormSubmitted] = useState(false)

  const deliveryDate = watch("deliveryDate")
  const returnDate = watch("returnDate")

  const formLink = process.env.GATSBY_MODALFORM

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

  const onSubmit = (data, e) => {
    setFormSubmit(true)
    let bodyFormData = new FormData()
    const form = e.target

    bodyFormData.append("first-name", data.firstName)
    bodyFormData.append("last-name", data.lastName)
    bodyFormData.append("your-email", data.email)
    bodyFormData.append("your-phone", data.phone)
    bodyFormData.append("your-subject", data.subject)
    bodyFormData.append("waste-type", data.waste)
    bodyFormData.append("bin-size", data.bin)
    bodyFormData.append("delivery-date", data.deliveryDate)
    bodyFormData.append("return-date", data.returnDate)
    bodyFormData.append("suburb", data.suburb.value)
    bodyFormData.append("your-message", data.message)
    bodyFormData.append("payment-method", data.paymentMethod)
    bodyFormData.append("name-on-card", data.nameOnCard)
    bodyFormData.append("card-number", data.cardNumber)
    bodyFormData.append("card-expiry", data.cardExpiry)
    bodyFormData.append("three-digits", data.threeDigits)
    bodyFormData.append("bin-place", data.binPlace)
    bodyFormData.append("mattresses", data.mattresses)
    bodyFormData.append("tyres", data.tyres)
    bodyFormData.append("hire", data.hire)
    bodyFormData.append("agreed", data.terms)
    bodyFormData.append("g-recaptcha-response", token)

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
        handleServerResponse(false, err.response.data.error, form)
      })
  }

  return (
    <>
      {!isFormSubmitted && (
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.GATSBY_RECAPTCHA_KEY}
          scriptProps={{
            async: false, // optional, default to false,
            defer: true, // optional, default to false
            appendTo: "body", // optional, default to "head", can be "head" or "body",
            nonce: undefined, // optional, default undefined
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="cs-form mt-8 relative"
          >
            <div className="suburbs cs-form-control">
              <div>
                <label htmlFor="suburb">Suburb</label>
                <div>
                  <Controller
                    name="suburb"
                    control={control}
                    rules={{ required: "Please select your suburb." }}
                    defaultValue=""
                    required
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
                    <option value="Cleanfill/Hardfill">
                      Cleanfill/Hardfill
                    </option>
                    <option value="Green Garden Waste">
                      Green Garden Waste
                    </option>
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
                    value={isModal ? binSize : ""}
                    defaultValue={isModal ? binSize : ""}
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

            <div className="cs-textarea cs-form-control">
              <div>
                <label htmlFor="binPlace">
                  Where would you like your bin placed?
                </label>
                <div>
                  <textarea
                    id="binPlace"
                    name="binPlace"
                    placeholder="Where would you like your bin placed?"
                    className={`${
                      errors.binPlace ? "ring-2 ring-red-500" : ""
                    }`}
                    ref={register({
                      required: "This field is required",
                    })}
                    required
                  />
                  {errors.binPlace && errors.binPlace.message && (
                    <p>{errors.binPlace.message}</p>
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
                        autoComplete="off"
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
                    rules={{
                      required: "Please select a delivery return date.",
                    }}
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
                        autoComplete="off"
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
            <div className="first-last cs-form-control">
              <div>
                <label htmlFor="firstName">First Name</label>
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className={`${
                      errors.firstName ? "ring-2 ring-red-500" : ""
                    }`}
                    ref={register({
                      required: "First name is required",
                      maxLength: {
                        value: 80,
                        message:
                          "First name should not be more than 80 characters",
                      },
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters.",
                      },
                    })}
                    required
                  />
                  {errors.firstName && errors.firstName.message && (
                    <p>{errors.firstName.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className={`${
                      errors.lastName ? "ring-2 ring-red-500" : ""
                    }`}
                    ref={register({
                      required: "First name is required",
                      maxLength: {
                        value: 80,
                        message:
                          "Last name should not be more than 80 characters",
                      },
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters.",
                      },
                    })}
                    required
                  />
                  {errors.lastName && errors.lastName.message && (
                    <p>{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="email-phone cs-form-control">
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
              <div>
                <label htmlFor="phone">Phone</label>
                <div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    className={`${errors.phone ? "ring-2 ring-red-500" : ""}`}
                    ref={register({
                      required: "Phone is required",
                    })}
                    required
                  />
                  {errors.phone && errors.phone.message && (
                    <p>{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="payment-method cs-form-control">
              <div>
                <label htmlFor="paymentMethod">Payment Method</label>
                <div className="relative">
                  <select
                    name="paymentMethod"
                    id="paymentMethod"
                    ref={register({
                      required: "Please select a payment method.",
                    })}
                    className={`${
                      errors.paymentMethod ? "ring-2 ring-red-500" : ""
                    }`}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    {/* <option value="afterpay">Afterpay</option> */}
                  </select>
                  <ChevronDown />
                  {errors.paymentMethod && errors.paymentMethod.message && (
                    <p>{errors.paymentMethod.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="first-last cs-form-control">
              <div>
                <label htmlFor="nameOnCard">Name on Card</label>
                <div>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    placeholder="Name on Card"
                    className={`${
                      errors.nameOnCard ? "ring-2 ring-red-500" : ""
                    }`}
                    ref={register({
                      minLength: {
                        value: 2,
                        message: "Name on Card must be at least 2 characters.",
                      },
                    })}
                  />
                  {errors.nameOnCard && errors.nameOnCard.message && (
                    <p>{errors.nameOnCard.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="cardNumber">Card Number</label>
                <div>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Card Number"
                    className={`${
                      errors.cardNumber ? "ring-2 ring-red-500" : ""
                    }`}
                    ref={register({
                      minLength: {
                        value: 2,
                        message: "Card Number must be at least 2 characters.",
                      },
                    })}
                  />
                  {errors.cardNumber && errors.cardNumber.message && (
                    <p>{errors.cardNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="first-last cs-form-control">
              <div>
                <label htmlFor="cardExpiry">Card Expiry</label>
                <div>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    placeholder="Card Expiry"
                    className={`${
                      errors.cardExpiry ? "ring-2 ring-red-500" : ""
                    }`}
                    ref={register({
                      minLength: {
                        value: 2,
                        message: "Card expiry must be at least 2 characters.",
                      },
                    })}
                  />
                  {errors.cardExpiry && errors.cardExpiry.message && (
                    <p>{errors.cardExpiry.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="threeDigits">Three Digits on Reverse</label>
                <div>
                  <input
                    type="text"
                    id="threeDigits"
                    name="threeDigits"
                    placeholder="Three digits on reverse"
                    className={`${
                      errors.threeDigits ? "ring-2 ring-red-500" : ""
                    }`}
                    ref={register({
                      minLength: {
                        value: 2,
                        message:
                          "Three digits on reverse must be at least 2 characters.",
                      },
                    })}
                  />
                  {errors.threeDigits && errors.threeDigits.message && (
                    <p>{errors.threeDigits.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="first-last cs-form-control">
              <div>
                <label htmlFor="mattresses">Mattresses from $43.00 each</label>
                <div>
                  <input
                    type="number"
                    id="mattresses"
                    name="mattresses"
                    min="0"
                    placeholder="Mattresses from $43.00 each"
                    ref={register()}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="tyres">Tyres from $25.00 each</label>
                <div>
                  <input
                    type="number"
                    id="tyres"
                    name="tyres"
                    min="0"
                    placeholder="Tyres from $25.00 each"
                    ref={register()}
                  />
                </div>
              </div>
            </div>

            <div className="payment-method cs-form-control">
              <div>
                <label htmlFor="hire">Additional hire week from $70/week</label>
                <div>
                  <input
                    type="number"
                    id="hire"
                    name="hire"
                    min="0"
                    placeholder="Additional hire week from $70/week"
                    ref={register()}
                  />
                </div>
              </div>
            </div>

            <div className="cs-textarea cs-form-control">
              <div>
                <label htmlFor="message">Message</label>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    className={`${errors.message ? "ring-2 ring-red-500" : ""}`}
                    ref={register()}
                  />
                </div>
              </div>
            </div>

            <div className="form-note cs-form-control p-4">
              <p class="text-secondary">
                NOTE: Payment is to be made prior to or on delivery of skip bin.
              </p>
            </div>

            <div className="terms-check cs-form-control">
              <div>
                <input
                  ref={register({ required: "This is required" })}
                  name="terms"
                  id={isModal ? "termsM" : "terms"}
                  type="checkbox"
                />
                <label htmlFor={isModal ? "termsM" : "terms"}>
                  I have read and agree to the &nbsp;
                  <a
                    href="/terms-conditions/"
                    target="_blank"
                    className="text-primary font-semibold"
                  >
                    Terms & Conditions
                  </a>
                </label>
                {errors.terms && errors.terms.message && (
                  <p>{errors.terms.message}</p>
                )}
              </div>
            </div>

            <input
              type="hidden"
              name="subject"
              ref={register}
              defaultValue={isModal ? `Book a ${modalTitle}` : "Book a Bin"}
            />
            <button type="submit" aria-label="Submit" className="mt-8 cs-btn">
              {isModal ? `Book a ${modalTitle}` : "Submit"}
            </button>
            <GoogleReCaptcha
              onVerify={token => {
                setToken(token)
              }}
            />
            {isFormSubmitting && (
              <div className="absolute bg-white bg-opacity-50 w-full h-full top-0 cs-spinner flex items-center justify-center">
                <Loading />
              </div>
            )}
          </form>
        </GoogleReCaptchaProvider>
      )}
      {isFormSubmitted && (
        <div className="max-w-500px mx-auto mt-8 text-center">
          Thank you! We will get back to you shortly.
        </div>
      )}
    </>
  )
}

ContactForm5.propTypes = {
  isModal: PropTypes.bool,
}

export default ContactForm5
