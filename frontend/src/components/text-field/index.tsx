import { useField } from "formik";
import { TextField as MuiTextField } from "@mui/material";

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function TextField(props: Props) {
  const [field, meta] = useField(props);

  return (
    <MuiTextField
      fullWidth
      sx={{ my: 1.5 }}
      {...props}
      {...field}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
}

export default TextField;