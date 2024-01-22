import { useField } from "formik";
import { Box, TextField as MuiTextField } from "@mui/material";
import "./styles.css";

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
}

function TextField(props: Props) {
  const [field, meta] = useField(props);

  return (
    <Box sx={{ py: 2 }} className="my-text-field-container">
      <MuiTextField
        fullWidth
        {...props}
        {...field}
        inputProps={{ ...props }}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
      />
    </Box>
  );
}

export default TextField;
