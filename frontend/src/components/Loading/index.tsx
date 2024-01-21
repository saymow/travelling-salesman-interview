import { CircularProgress, CircularProgressProps } from "@mui/material";

interface Props extends CircularProgressProps {}

const Loading: React.FC<Props> = (props) => {
  return <CircularProgress {...props} />;
};

export default Loading;
