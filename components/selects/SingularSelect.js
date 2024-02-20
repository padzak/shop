import { MenuItem, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { useField, ErrorMessage } from "formik";

export default function SingularSelect({
  data,
  handleChange,
  placeholder,
  ...rest
}) {
  const [field, meta] = useField(rest);
  return (
    <div style={{marginBottom:'1rem'}}>
      <TextField
        variant="outlined"
        name={field.name}
        select
        label={placeholder}
        value={field.value}
        onChange={handleChange}
        className={`${styles.select} ${
          meta.touched && meta.error && styles.error_select
        }`}
      >
        <MenuItem key={""} value={""}>
          No Selected / Or Empty
        </MenuItem>
        {data.map((option) => (
          <MenuItem key={option._id} value={option._id || option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {meta.touched && meta.error && (
        <p className={styles.error_msg}>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}