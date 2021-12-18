import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Grid,
  Button,
  Alert,
  Box,
  Stack,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RoomsList } from "../rooms";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import { TextField, CheckboxWithLabel } from "formik-mui";

const BookingForm = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [params] = useSearchParams();
  const searchParams = new Map(params.entries());
  const checkIn = moment(searchParams.get("checkin"));
  const checkOut = moment(searchParams.get("checkout"));
  const id = parseInt(searchParams.get("id"));
  const [bookingRef, confirmBooking] = useState("");
  const [termsOpen, showTerms] = useState(false);
  const [error, setError] = useState({});
  const toggleTerms = (e) => {
    e.preventDefault();
    showTerms((open) => !open);
  };
  const makeBooking = async (values, { setSubmitting }) => {
    const body = {
      ...values,
      checkIn: `${checkIn.format("DD/MM/YY")}`,
      checkOut: `${checkOut.format("DD/MM/YY")}`,
      room: RoomsList[id].title,
    };
    await fetch("/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        confirmBooking({
          ...json,
          ...body,
        });
      })
      .catch((e) => {
        console.error(e);
        setError(e);
      });
  };

  return (
    <>
      {bookingRef ? (
        <Stack spacing={1}>
          <Alert severity="success">Booking successful</Alert>
          <Typography
            variant={"h6"}
          >{`Booking reference : ${bookingRef.id}`}</Typography>
          <Typography
            variant={"subtitle1"}
          >{`Check in: ${bookingRef.checkIn}`}</Typography>
          <Typography
            variant={"subtitle1"}
          >{`Check in: ${bookingRef.checkOut}`}</Typography>
          <Typography
            variant={"subtitle1"}
          >{`Room: ${bookingRef.room}`}</Typography>
        </Stack>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error ? (
              <Alert severity="error">{JSON.stringify(error)}</Alert>
            ) : null}
          </Grid>
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
                name: "",
                accepted: false,
              }}
              onSubmit={makeBooking}
            >
              {({
                values,
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
                        type="name"
                        name="name"
                        label="Name"
                        required
                        error={touched.name && errors.name ? true : false}
                        helperText={errors.name}
                      />
                      <Field
                        component={TextField}
                        type="email"
                        name="email"
                        label="Email"
                        required
                        error={touched.email && errors.email ? true : false}
                        helperText={errors.email}
                      />
                      <Field
                        component={TextField}
                        type="text"
                        name="line1"
                        required
                        label="Address line 1"
                        error={touched.line1 && errors.line1 ? true : false}
                        helperText={touched.line1 && errors.line1}
                      />
                      <Field
                        component={TextField}
                        type="text"
                        name="line2"
                        required
                        label="Address line 2"
                        error={touched.line2 && errors.line2 ? true : false}
                        helperText={touched.line2 && errors.line2}
                      />
                      <Field
                        component={TextField}
                        type="text"
                        name="city"
                        label="City"
                        required
                        error={touched.city && errors.city ? true : false}
                        helperText={touched.city && errors.city}
                      />
                      <Field
                        component={TextField}
                        type="text"
                        name="county"
                        label="County"
                        required
                        error={touched.county && errors.county ? true : false}
                        helperText={touched.county && errors.county}
                      />
                      <Field
                        component={TextField}
                        type="text"
                        name="postcode"
                        required
                        label="Postcode"
                        error={
                          touched.postcode && errors.postcode ? true : false
                        }
                        helperText={touched.postcode && errors.postcode}
                      />
                      <Field
                        component={TextField}
                        type="text"
                        required
                        inputProps={{ inputMode: "numeric" }}
                        name="mobile"
                        label="Mobile number"
                        error={touched.mobile && errors.mobile ? true : false}
                        helperText={touched.mobile && errors.mobile}
                      />
                      <Field
                        type="checkbox"
                        required
                        name="accepted"
                        component={CheckboxWithLabel}
                        sx={{ alignSelf: "flex-start" }}
                        Label={{
                          label: (
                            <Box>
                              I accept the booking{" "}
                              <Link onClick={toggleTerms}>
                                Terms and Conditions
                              </Link>
                            </Box>
                          ),
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        sx={{ alignSelf: "flex-start" }}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Form>
                </Stack>
              )}
            </Formik>
          </Grid>
        </Grid>
      )}
      <Dialog open={termsOpen} onClose={toggleTerms} fullScreen={fullScreen}>
        <DialogTitle>
          Terms and Conditions
          <IconButton
            aria-label="close"
            onClick={toggleTerms}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="caption">
            <Stack spacing={2}>
              <p>Welcome to Townsend Hotels!</p>

              <p>
                These terms and conditions outline the rules and regulations for
                the use of Townsend Hotels Ltd's Website, located at
                www.townsendhotels.co.uk.
              </p>

              <p>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Townsend Hotels if you do not
                agree to take all of the terms and conditions stated on this
                page.
              </p>

              <p>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                "Client", "You" and "Your" refers to you, the person log on this
                website and compliant to the Company’s terms and conditions.
                "The Company", "Ourselves", "We", "Our" and "Us", refers to our
                Company. "Party", "Parties", or "Us", refers to both the Client
                and ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of
                our assistance to the Client in the most appropriate manner for
                the express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services, in accordance with
                and subject to, prevailing law of Netherlands. Any use of the
                above terminology or other words in the singular, plural,
                capitalization and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </p>

              <h3>
                <strong>Cookies</strong>
              </h3>

              <p>
                We employ the use of cookies. By accessing Townsend Hotels, you
                agreed to use cookies in agreement with the Townsend Hotels
                Ltd's Privacy Policy.{" "}
              </p>

              <p>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </p>

              <h3>
                <strong>License</strong>
              </h3>

              <p>
                Unless otherwise stated, Townsend Hotels Ltd and/or its
                licensors own the intellectual property rights for all material
                on Townsend Hotels. All intellectual property rights are
                reserved. You may access this from Townsend Hotels for your own
                personal use subjected to restrictions set in these terms and
                conditions.
              </p>

              <p>You must not:</p>
              <ul>
                <li>Republish material from Townsend Hotels</li>
                <li>Sell, rent or sub-license material from Townsend Hotels</li>
                <li>
                  Reproduce, duplicate or copy material from Townsend Hotels
                </li>
                <li>Redistribute content from Townsend Hotels</li>
              </ul>

              <p>
                This Agreement shall begin on the date hereof. Our Terms and
                Conditions were created with the help of the{" "}
                <a href="https://www.privacypolicies.com/blog/sample-terms-conditions-template/">
                  Terms And Conditions Template
                </a>
                .
              </p>

              <p>
                Parts of this website offer an opportunity for users to post and
                exchange opinions and information in certain areas of the
                website. Townsend Hotels Ltd does not filter, edit, publish or
                review Comments prior to their presence on the website. Comments
                do not reflect the views and opinions of Townsend Hotels Ltd,its
                agents and/or affiliates. Comments reflect the views and
                opinions of the person who post their views and opinions. To the
                extent permitted by applicable laws, Townsend Hotels Ltd shall
                not be liable for the Comments or for any liability, damages or
                expenses caused and/or suffered as a result of any use of and/or
                posting of and/or appearance of the Comments on this website.
              </p>

              <p>
                Townsend Hotels Ltd reserves the right to monitor all Comments
                and to remove any Comments which can be considered
                inappropriate, offensive or causes breach of these Terms and
                Conditions.
              </p>

              <p>You warrant and represent that:</p>

              <ul>
                <li>
                  You are entitled to post the Comments on our website and have
                  all necessary licenses and consents to do so;
                </li>
                <li>
                  The Comments do not invade any intellectual property right,
                  including without limitation copyright, patent or trademark of
                  any third party;
                </li>
                <li>
                  The Comments do not contain any defamatory, libelous,
                  offensive, indecent or otherwise unlawful material which is an
                  invasion of privacy
                </li>
                <li>
                  The Comments will not be used to solicit or promote business
                  or custom or present commercial activities or unlawful
                  activity.
                </li>
              </ul>

              <p>
                You hereby grant Townsend Hotels Ltd a non-exclusive license to
                use, reproduce, edit and authorize others to use, reproduce and
                edit any of your Comments in any and all forms, formats or
                media.
              </p>

              <h3>
                <strong>Hyperlinking to our Content</strong>
              </h3>

              <p>
                The following organizations may link to our Website without
                prior written approval:
              </p>

              <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>
                  Online directory distributors may link to our Website in the
                  same manner as they hyperlink to the Websites of other listed
                  businesses; and
                </li>
                <li>
                  System wide Accredited Businesses except soliciting non-profit
                  organizations, charity shopping malls, and charity fundraising
                  groups which may not hyperlink to our Web site.
                </li>
              </ul>

              <p>
                These organizations may link to our home page, to publications
                or to other Website information so long as the link: (a) is not
                in any way deceptive; (b) does not falsely imply sponsorship,
                endorsement or approval of the linking party and its products
                and/or services; and (c) fits within the context of the linking
                party’s site.
              </p>

              <p>
                We may consider and approve other link requests from the
                following types of organizations:
              </p>

              <ul>
                <li>
                  commonly-known consumer and/or business information sources;
                </li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
              </ul>

              <p>
                We will approve link requests from these organizations if we
                decide that: (a) the link would not make us look unfavorably to
                ourselves or to our accredited businesses; (b) the organization
                does not have any negative records with us; (c) the benefit to
                us from the visibility of the hyperlink compensates the absence
                of Townsend Hotels Ltd; and (d) the link is in the context of
                general resource information.
              </p>

              <p>
                These organizations may link to our home page so long as the
                link: (a) is not in any way deceptive; (b) does not falsely
                imply sponsorship, endorsement or approval of the linking party
                and its products or services; and (c) fits within the context of
                the linking party’s site.
              </p>

              <p>
                If you are one of the organizations listed in paragraph 2 above
                and are interested in linking to our website, you must inform us
                by sending an e-mail to Townsend Hotels Ltd. Please include your
                name, your organization name, contact information as well as the
                URL of your site, a list of any URLs from which you intend to
                link to our Website, and a list of the URLs on our site to which
                you would like to link. Wait 2-3 weeks for a response.
              </p>

              <p>
                Approved organizations may hyperlink to our Website as follows:
              </p>

              <ul>
                <li>By use of our corporate name; or</li>
                <li>
                  By use of the uniform resource locator being linked to; or
                </li>
                <li>
                  By use of any other description of our Website being linked to
                  that makes sense within the context and format of content on
                  the linking party’s site.
                </li>
              </ul>

              <p>
                No use of Townsend Hotels Ltd's logo or other artwork will be
                allowed for linking absent a trademark license agreement.
              </p>

              <h3>
                <strong>iFrames</strong>
              </h3>

              <p>
                Without prior approval and written permission, you may not
                create frames around our Webpages that alter in any way the
                visual presentation or appearance of our Website.
              </p>

              <h3>
                <strong>Content Liability</strong>
              </h3>

              <p>
                We shall not be hold responsible for any content that appears on
                your Website. You agree to protect and defend us against all
                claims that is rising on your Website. No link(s) should appear
                on any Website that may be interpreted as libelous, obscene or
                criminal, or which infringes, otherwise violates, or advocates
                the infringement or other violation of, any third party rights.
              </p>

              <h3>
                <strong>Your Privacy</strong>
              </h3>

              <p>Please read Privacy Policy</p>

              <h3>
                <strong>Reservation of Rights</strong>
              </h3>

              <p>
                We reserve the right to request that you remove all links or any
                particular link to our Website. You approve to immediately
                remove all links to our Website upon request. We also reserve
                the right to amen these terms and conditions and it’s linking
                policy at any time. By continuously linking to our Website, you
                agree to be bound to and follow these linking terms and
                conditions.
              </p>

              <h3>
                <strong>Removal of links from our website</strong>
              </h3>

              <p>
                If you find any link on our Website that is offensive for any
                reason, you are free to contact and inform us any moment. We
                will consider requests to remove links but we are not obligated
                to or so or to respond to you directly.
              </p>

              <p>
                We do not ensure that the information on this website is
                correct, we do not warrant its completeness or accuracy; nor do
                we promise to ensure that the website remains available or that
                the material on the website is kept up to date.
              </p>

              <h3>
                <strong>Disclaimer</strong>
              </h3>

              <p>
                To the maximum extent permitted by applicable law, we exclude
                all representations, warranties and conditions relating to our
                website and the use of this website. Nothing in this disclaimer
                will:
              </p>

              <ul>
                <li>
                  limit or exclude our or your liability for death or personal
                  injury;
                </li>
                <li>
                  limit or exclude our or your liability for fraud or fraudulent
                  misrepresentation;
                </li>
                <li>
                  limit any of our or your liabilities in any way that is not
                  permitted under applicable law; or
                </li>
                <li>
                  exclude any of our or your liabilities that may not be
                  excluded under applicable law.
                </li>
              </ul>

              <p>
                The limitations and prohibitions of liability set in this
                Section and elsewhere in this disclaimer: (a) are subject to the
                preceding paragraph; and (b) govern all liabilities arising
                under the disclaimer, including liabilities arising in contract,
                in tort and for breach of statutory duty.
              </p>

              <p>
                As long as the website and the information and services on the
                website are provided free of charge, we will not be liable for
                any loss or damage of any nature.
              </p>
              <p>
                By accepting these terms, you agree to provide 20 days of free
                childcare in 2022.
              </p>
            </Stack>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { BookingForm };
