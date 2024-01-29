import styles from "./styles.module.scss";
import { useState } from "react";
import { Form, Formik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

export default function Shipping({
  selectedAddress,
  setSelectedAddress,
  user,
}) {
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [shipping, setShipping] = useState(initialValues);
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;

  return (
    <div className={styles.shipping}>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          state: "",
          city: "",
          zipCode: "",
          address1: "",
          address2: "",
          country: "",
        }}
      >
        {(formik) => (
          <Form>
            <input type="text" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
