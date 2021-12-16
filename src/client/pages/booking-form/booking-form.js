import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Button, Alert, Stack, Typography } from "@mui/material";
import { RoomsList } from "../rooms";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

const BookingForm = () => {
  const [params] = useSearchParams();
  const searchParams = new Map(params.entries());
  const checkIn = moment(searchParams.get("checkin"));
  const checkOut = moment(searchParams.get("checkout"));
  const id = parseInt(searchParams.get("id"));
  const [bookingRef, confirmBooking] = useState("");
  const makeBooking = async (values, { setSubmitting }) => {
    await fetch("/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(confirmBooking);
  };

  return bookingRef ? (
    <Stack spacing={1}>
      <Alert severity="success">Booking successful</Alert>
      <Typography
        variant={"h6"}
      >{`Booking reference : ${bookingRef}`}</Typography>
    </Stack>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{`Selected room: ${RoomsList[id].title}`}</Typography>
        <Typography variant="h6">
          {`Dates: ${checkIn.format("DD/MM/YY")} - ${checkOut.format(
            "DD/MM/YY"
          )}
          `}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Formik
          validateOnChange={false}
          validate={(values) => {
            const errors = {};
            for (const key in values) {
              if (!values[key]) {
                errors[key] = "Required";
              }
            }
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!/^[0-9]{11}$/i.test(values.mobile)) {
              errors.mobile = "Invalid mobile";
            }
            if (
              !/^[A-z]{1,2}[0-9][A-z0-9]? ?[0-9][A-z]{2}$/i.test(
                values.postcode
              )
            ) {
              errors.postcode = "Invalid postcode";
            }
            return errors;
          }}
          initialValues={{
            email: "",
            line1: "",
            line2: "",
            city: "",
            county: "",
            postcode: "",
            mobile: "",
          }}
          onSubmit={makeBooking}
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
            /* and other goodies */
          }) => (
            <Stack spacing={2}>
              {Object.keys(errors).length > 0 ? (
                <Alert severity="error">
                  There are errors in the entered data
                </Alert>
              ) : null}
              <Form>
                <Stack spacing={2}>
                  <Field
                    component={TextField}
                    type="email"
                    name="email"
                    label="Email"
                    required
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && errors.email ? true : false}
                    helperText={errors.email}
                  />
                  <Field
                    component={TextField}
                    type="text"
                    name="line1"
                    required
                    label="Address line 1"
                    onBlur={handleBlur}
                    value={values.line1}
                    error={touched.line1 && errors.line1 ? true : false}
                    helperText={touched.line1 && errors.line1}
                  />
                  <Field
                    component={TextField}
                    type="text"
                    name="line2"
                    required
                    label="Address line 2"
                    onBlur={handleBlur}
                    value={values.line2}
                    error={touched.line2 && errors.line2 ? true : false}
                    helperText={touched.line2 && errors.line2}
                  />
                  <Field
                    component={TextField}
                    type="text"
                    name="city"
                    label="City"
                    required
                    onBlur={handleBlur}
                    value={values.city}
                    error={touched.city && errors.city ? true : false}
                    helperText={touched.city && errors.city}
                  />
                  <Field
                    component={TextField}
                    type="text"
                    name="county"
                    label="County"
                    required
                    onBlur={handleBlur}
                    value={values.county}
                    error={touched.county && errors.county ? true : false}
                    helperText={touched.county && errors.county}
                  />
                  <Field
                    component={TextField}
                    type="text"
                    name="postcode"
                    required
                    label="Postcode"
                    onBlur={handleBlur}
                    value={values.postcode}
                    error={touched.postcode && errors.postcode ? true : false}
                    helperText={touched.postcode && errors.postcode}
                  />
                  <Field
                    component={TextField}
                    type="text"
                    required
                    inputProps={{ inputMode: "numeric" }}
                    name="mobile"
                    label="Mobile number"
                    onBlur={handleBlur}
                    value={values.mobile}
                    error={touched.mobile && errors.mobile ? true : false}
                    helperText={touched.mobile && errors.mobile}
                  />
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Stack>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export { BookingForm };
