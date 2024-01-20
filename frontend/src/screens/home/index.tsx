import { Box, Button, Container, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useClient from "../../resources/client/use-client";
import { useCallback, useEffect, useMemo } from "react";
import Table, { Column, Row } from "../../components/Table";
import "./styles.css";
import { Client } from "../../resources/client/client-model";

const tableColumns: Column[] = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Nome",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phone",
    label: "Telefone",
  },
];

const makeClientRows = (clients: Client[]): Row[] => {
  return clients.map((client) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
  }));
};

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { clientsList, listClients } = useClient();
  const tableRows = useMemo(
    () => makeClientRows(clientsList.data?.data ?? []),
    [clientsList.data?.data]
  );

  useEffect(() => {
    listClients({
      limit: 10,
      page: 0,
      query: {
        email: "",
        name: "",
        phone: "",
      },
    });
  }, [listClients]);

  const handleQueryChange = useCallback(
    (newSearch: string, newPage: number, newLimit: number) => {
      listClients({
        page: newPage,
        limit: newLimit,
        query: {
          email: newSearch,
          name: newSearch,
          phone: newSearch,
        },
      });
    },
    [listClients]
  );

  const handleNavigateToCreateClient = () => {
    navigate("/create-client");
  };

  return (
    <Container className="home-container" maxWidth="xl">
      <Paper className="home-paper" elevation={3}>
        <Stack className="home-stack">
          <Box className="home-header" paddingY={2}>
            <Stack direction="row-reverse">
              <Button
                variant="contained"
                size="large"
                onClick={handleNavigateToCreateClient}
              >
                Cadastrar cliente
              </Button>
            </Stack>
          </Box>
          <Box className="home-content-container">
            <Table
              columns={tableColumns}
              rows={tableRows}
              total={clientsList.data?.total ?? 0}
              rowIdColumn="id"
              searchInputPlaceholder="Busque por nome, email ou telefone"
              query={{
                page: clientsList.data?.page ?? 0,
                limit: clientsList.data?.limit ?? 10,
              }}
              onQueryChange={handleQueryChange}
            />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default HomeScreen;
