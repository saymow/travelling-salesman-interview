import { Button, ButtonProps } from "@mui/material";
import Loading from "../Loading";

interface Props extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

const MyButton: React.FC<Props> = (props) => {
  const { children, loading, ...rest } = props;

  return (
    <Button {...rest} disabled={props.disabled || loading}>
      {loading && (
        <>
          <Loading thickness={8} size={"1rem"} sx={{ marginRight: 1 }} />
          {"  "}
        </>
      )}
      {children}
    </Button>
  );
};

export default MyButton;
