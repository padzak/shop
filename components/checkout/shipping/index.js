import styles from "./styles.module.scss";
import { useState } from "react";

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
  return <>Shipping</>;
}
