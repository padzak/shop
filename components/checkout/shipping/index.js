import styles from "./styles.module.scss";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ShippingInput from "@/components/inputs/shippingInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "@/data/countries";
import SingularSelect from "@/components/selects/SingularSelect";
import { saveAddress } from "@/requests/user";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
// import "yup-phone";

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
const phoneRegExp = /^[0-9]{10}$/;

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
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters")
      .max(20, "First name must be at most 20 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters")
      .max(20, "Last name must be at most 20 characters"),
    phoneNumber: Yup.string()
      .required("Phone number is required.")
      .matches(phoneRegExp, "Invalid phone number format")
      //   .phone()
      .min(3, "Phone number must be at least 3 characters long.")
      .max(30, "Phone number must be less than 20 characters long."),
    state: Yup.string()
      .required("State name is required.")
      .min(2, "State name should contain 2-60 characters..")
      .max(60, "State name should contain 2-60 characters."),
    city: Yup.string()
      .required("City name is required.")
      .min(2, "City name should contain 2-60 characters.")
      .max(60, "City name should contain 2-60 characters."),
    zipCode: Yup.string()
      .required("ZipCode/Postal is required.")
      .min(2, "ZipCode/Postal should contain 2-30 characters..")
      .max(30, "ZipCode/Postal should contain 2-30 characters."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(5, "Address Line 1 should contain 5-100 characters.")
      .max(100, "Address Line 1 should contain 5-100 characters."),
    address2: Yup.string()
      .min(5, "Address Line 2 should contain 5-100 characters.")
      .max(100, "Address Line 2 should contain 5-100 characters."),
    country: Yup.string().required("Country name is required."),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping, user._id);
    console.log("address response", res);
    setAddresses([...addresses, res]);
    setSelectedAddress(res);
  };

  return (
    <div className={styles.shipping}>
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <div
            className={`${styles.address} ${
              address == selectedAddress && styles.active
            }`}
            key={address._id}
          >
            <div className={styles.address__side}>
              <img src={user.image} alt="userImg" />
            </div>
            <div className={styles.address__col}>
              <span>
                <FaIdCard />
                {address.firstName}{" "}
                {address.lastName}
              </span>
              <span>
                <GiPhone />
                {address.phoneNumber}
              </span>
            </div>
            <div styles={styles.address__col}>
              <span>
                <FaMapMarkerAlt />
                {address.address1}
              </span>
              <span>
                {address.address2}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          firstName,
          lastName,
          phoneNumber,
          state,
          city,
          zipCode,
          address1,
          address2,
          country,
        }}
        validationSchema={validate}
        onSubmit={() => {
          saveShippingHandler();
        }}
      >
        {(formik) => (
          <Form>
            <SingularSelect
              name="country"
              value={country}
              placeholder="Country"
              handleChange={handleChange}
              data={countries}
            />
            <div className={styles.col}>
              <ShippingInput
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />
              <ShippingInput
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
              <ShippingInput
                name="state"
                placeholder="State"
                onChange={handleChange}
              />
              <ShippingInput
                name="city"
                placeholder="City"
                onChange={handleChange}
              />
              <ShippingInput
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <ShippingInput
                name="zipCode"
                placeholder="Post / Zip Code"
                onChange={handleChange}
              />
              <ShippingInput
                name="address1"
                placeholder="Address Line 1"
                onChange={handleChange}
              />
              <ShippingInput
                name="address2"
                placeholder="Address Line 2"
                onChange={handleChange}
              />
              <button type="submit">Save Address</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
