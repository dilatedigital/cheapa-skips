import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import Loading from "../../images/loading.svg"
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3"

const ContactPageForm = () => {
  const { register, handleSubmit, errors, control, watch } = useForm()

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

  const [isFormSubmitting, setFormSubmit] = useState(false)

  const [isFormSubmitted, setFormSubmitted] = useState(false)

  const formLink = process.env.GATSBY_CONTAGEPAGE

  const onSubmit = (data, e) => {
    setFormSubmit(true)
    let bodyFormData = new FormData()
    const form = e.target

    bodyFormData.append("first-name", data.firstName)
    bodyFormData.append("last-name", data.lastName)
    bodyFormData.append("your-email", data.email)
    bodyFormData.append("your-phone", data.phone)
    bodyFormData.append("your-message", data.message)
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
            className="cs-form relative cs-home-form"
          >
            <div className="cs-form-control">
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
            {isFormSubmitting && (
              <div className="absolute bg-white bg-opacity-50 w-full h-full top-0 cs-spinner flex items-center justify-center">
                <Loading />
              </div>
            )}

            <button type="submit" aria-label="Submit" className="mt-8 cs-btn">
              Submit
            </button>
            <GoogleReCaptcha
              onVerify={token => {
                setToken(token)
              }}
            />
          </form>
        </GoogleReCaptchaProvider>
      )}
      {isFormSubmitted && (
        <div className="contact-content-success">
          Thank you! We will get back to you shortly.
        </div>
      )}
    </>
  )
}

export default ContactPageForm
