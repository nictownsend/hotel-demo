import { Button, Stack, Alert, Typography } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

const Contact = (props) => {
  const [submitted, updateSubmitted] = useState(false);
  const handleSubmit = () => {
    updateSubmitted(true);
  };
  return (
    <Stack spacing={2}>
      {submitted ? (
        <Alert severity="success">Thank you for the feedback</Alert>
      ) : null}
      <Typography>
        Please use this form to contact us. Although not guaranteed, we will do
        our best to maybe reply to your enquiry.
      </Typography>
      <Formik
        validateOnChange={false}
        validate={(values) => {
          const errors = {};
          for (const key in values) {
            if (!values[key]) {
              errors[key] = "Required";
            }
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        initialValues={{
          email: "",
          name: "",
          comment: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                component={TextField}
                type="name"
                name="name"
                label="Name"
                required
                disabled={submitted}
              />
              <Field
                component={TextField}
                type="email"
                name="email"
                label="Email"
                required
                disabled={submitted}
              />
              <Field
                component={TextField}
                type="text"
                name="comment"
                required
                label="Comment"
                multiline
                minRows={10}
                maxRows={10}
                disabled={submitted}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitted}
                sx={{ alignSelf: "flex-start" }}
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export { Contact };
