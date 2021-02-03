import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const ContactForm5 = () => {
  const { register, handleSubmit, errors, formState, control } = useForm()

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const { isSubmitting } = formState

  const formLink = process.env.GATSBY_HOMEFORM

  const onSubmit = data => {
    console.log(data)
    console.log(startDate)
    console.log(endDate)
    let bodyFormData = new FormData()

    bodyFormData.append("your-name", data.name)
    bodyFormData.append("your-email", data.email)
    bodyFormData.append("your-subject", data.subject)
    bodyFormData.append("waste-type", data.waste)
    bodyFormData.append("bin-size", data.bin)
    bodyFormData.append("delivery-date", data.deliveryDate)
    bodyFormData.append("return-date", data.returnDate)

    axios
      .post(formLink, bodyFormData)
      .then(res => {
        if (res.data.status === "mail_sent") {
          console.log("Mail sent!")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="name-email">
        <div>
          <label htmlFor="name">Name</label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              className={`${
                errors.name ? "ring-2 ring-red-500" : ""
              } focus:outline-none focus:ring-2 focus:ring-dark-green`}
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
            {errors.name && errors.name.message && <p>{errors.name.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              className={`${
                errors.email ? "ring-2 ring-red-500" : ""
              } focus:outline-none focus:ring-2 focus:ring-dark-green`}
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
      <div className="waste-bin">
        <div>
          <label htmlFor="waste">Waste Type</label>
          <div>
            <select
              name="waste"
              id="waste"
              ref={register({ required: "Please select a waste type." })}
              className={`${
                errors.waste ? "ring-2 ring-red-500" : ""
              } focus:outline-none focus:ring-2 focus:ring-dark-green`}
              required
            >
              <option value="">Select Waste Type</option>
              <option value="General Waste">General Waste</option>
              <option value="Mixed Heavy">Mixed Heavy Waste</option>
              <option value="Cleanfill/Hardfill">Cleanfill/Hardfill</option>
              <option value="Green Garden Waste">Green Garden Waste</option>
              <option value="Soil/Dirt">Soil/Dirt</option>
            </select>
            {errors.waste && errors.waste.message && (
              <p>{errors.waste.message}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="bin">Bin Size</label>
          <div>
            <select
              name="bin"
              id="bin"
              ref={register({ required: "Please select a bin size." })}
              className={`${
                errors.bin ? "ring-2 ring-red-500" : ""
              } focus:outline-none focus:ring-2 focus:ring-dark-green`}
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
            {errors.bin && errors.bin.message && <p>{errors.bin.message}</p>}
          </div>
        </div>
      </div>
      <div className="cs-dates">
        <div>
          <label htmlFor="delivery-date">Delivery Date</label>
          <div>
            <Controller
              name="deliveryDate"
              id="delivery-date"
              control={control}
              rules={{ required: "Please select a delivery date." }}
              required
              defaultValue=""
              onChange={value => setStartDate(value)}
              render={({ onChange, value }) => (
                <ReactDatePicker
                  onChange={onChange}
                  selected={value}
                  selectsStart
                  minDate={new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Choose delivery date"
                  className={`${
                    errors.deliveryDate ? "ring-2 ring-red-500" : ""
                  } focus:outline-none focus:ring-2 focus:ring-dark-green`}
                />
              )}
            />
            {errors.deliveryDate && errors.deliveryDate.message && (
              <p>{errors.deliveryDate.message}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="return-date">Return Date</label>
          <div>
            <Controller
              name="returnDate"
              id="return-date"
              control={control}
              rules={{ required: "Please select a delivery return date." }}
              required
              defaultValue=""
              onChange={date => setEndDate(date)}
              render={({ onChange, value }) => (
                <ReactDatePicker
                  onChange={onChange}
                  selected={value}
                  selectsEnd
                  minDate={new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Choose delivery return date"
                  className={`${
                    errors.returnDate ? "ring-2 ring-red-500" : ""
                  } focus:outline-none focus:ring-2 focus:ring-dark-green`}
                />
              )}
            />
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
      <button type="submit" aria-label="Submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}

export default ContactForm5
