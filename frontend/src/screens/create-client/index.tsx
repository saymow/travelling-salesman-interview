import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "../../components/TextField";
import { Form, Formik } from "formik";
import MapContainer from "../../components/Map";
import { ORIGIN } from "../../components/Map/helpers";
import { CreateClient } from "../../resources/client/client-types";
import useClient from "../../resources/client/use-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues: CreateClient = {
  name: "",
  email: "",
  phone: "",
  location: ORIGIN,
};

const CreateClientScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createClient } = useClient();

  const handleSubmit = async (clientData: CreateClient) => {
    try {
      setIsLoading(true);
      await createClient(clientData);
      // navigate("/");
    } catch (err) {
      // todo
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Paper elevation={5}>
          <Box padding={2}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(fmk) => (
                <Form>
                  <Stack>
                    <Typography variant={"h4"} textAlign="center" mb={2}>
                      CADASTRAR CLIENTE
                    </Typography>

                    <TextField
                      name="name"
                      label="Nome"
                      placeholder="Nome"
                      required
                    />
                    <TextField
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                      required
                    />
                    <TextField
                      name="phone"
                      label="Telefone"
                      placeholder="(__) ______-____"
                      required
                    />

                    <Box>
                      <Typography variant="h6" textAlign="center" my={2}>
                        SELECIONE A LOCALIZAÇÃO
                      </Typography>
                      <MapContainer
                        height={420}
                        markerPosition={fmk.values.location}
                        onMarketPositionChange={(newPostion) => {
                          fmk.setFieldValue("location", newPostion);
                        }}
                      />
                    </Box>

                    <Stack mt={3}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                      >
                        CADASTRAR
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateClientScreen;
