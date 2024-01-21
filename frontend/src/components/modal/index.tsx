import { Modal as MuiModal, Box, Paper, Container } from "@mui/material";
import "./styles.css";

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<Props> = (props) => {
  const { isOpen, handleClose, className = "" } = props;

  return (
    <MuiModal open={isOpen} onClose={handleClose}>
      <Container className={"modal-container"}>
        <Paper>
          <Box className={className} padding={1}>
            {props.children}
          </Box>
        </Paper>
      </Container>
    </MuiModal>
  );
};

export default Modal;
