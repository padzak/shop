import styles from "./styles.module.scss";
import { useField, ErrorMessage } from "formik";
import { useEffect, useState, useRef } from "react";

export default function ShippingInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error && styles.error
      }`}
    >
      <div className={styles.input__wrapper}>
        <input type={field.type} name={field.name} {...field} {...props} />
        <span>{placeholder}</span>
        <p>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
      </div>
    </div>
  );
}
