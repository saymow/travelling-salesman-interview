import { Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToCreateClient = () => {
    navigate("/create-client");
  };

  return (
    <Container>
      <Paper>
        <Button variant="contained" onClick={handleNavigateToCreateClient}>
          Cadastrar cliente
        </Button>
      </Paper>
    </Container>
  );
};

export default HomeScreen;
