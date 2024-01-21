import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
}

const SearchTextField: React.FC<Props> = (props) => {
  const { placeholder, value, onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchTextField;
