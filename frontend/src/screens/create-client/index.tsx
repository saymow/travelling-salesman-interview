import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "../../components/text-field";
import { Form, Formik } from "formik";
import MapContainer from "../../components/map";
import { ORIGIN } from "../../components/map/helpers";
import { CreateClient } from "../../resources/client/client-types";
import useClient from "../../resources/client/use-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import * as yup from "yup";
import "./styles.css";

const initialValues: CreateClient = {
  name: "",
  email: "",
  phone: "",
  location: ORIGIN,
};

export const createClientSchema = yup.object().shape({
  email: yup
    .string()
    .email("O formato do e-mail é inválido")
    .required("O e-mail é obrigatório"),
  name: yup.string().required("O nome é obrigatório"),
  phone: yup
    .string()
    .matches(
      /\d{2}\s\d{5}\s\d{4}/,
      "O formato do telefone é inválido. Use o formato XX XXXXX XXXX"
    )
    .required("O número de telefone é obrigatório"),
  location: yup
    .array()
    .of(yup.number().required("A coordenada é obrigatória"))
    .length(2, "A localização deve conter exatamente 2 coordenadas")
    .required("A localização é obrigatória"),
});

const CreateClientScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createClient } = useClient();

  const handleSubmit = async (clientData: CreateClient) => {
    try {
      setIsLoading(true);
      await createClient(clientData);
      navigate("/");
    } catch (err) {
      // todo
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" className="create-client-container">
      <Box>
        <Paper elevation={5}>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleGoBack}
            className="create-client-go-back-btn"
          >
            <ArrowBack sx={{ marginRight: 1 }} /> Voltar
          </Button>
          <Box padding={2}>
            <Formik
              initialValues={initialValues}
              validationSchema={createClientSchema}
              onSubmit={handleSubmit}
            >
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
                      placeholder="XX XXXXX XXXX"
                      maxLength={13}
                      required
                    />

                    <Box>
                      <Typography variant="h6" textAlign="center" my={2}>
                        SELECIONE A LOCALIZAÇÃO
                      </Typography>
                      <MapContainer
                        height={360}
                        markers={[
                          {
                            type: "MOVABLE",
                            position: fmk.values.location,
                            onMove: (newPostion) => {
                              fmk.setFieldValue("location", newPostion);
                            },
                          },
                        ]}
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
