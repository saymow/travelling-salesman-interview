import { Box, Button, Container, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useClient from "../../resources/client/use-client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Table, { Column, Row } from "../../components/Table";
import { Client } from "../../resources/client/client-model";
import PathModal from "./path-modal";
import "./styles.css";
import Loading from "../../components/Loading";
import MyButton from "../../components/Button";
import usePath from "../../resources/path/use-path";

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
  {
    id: "lat",
    label: "Latitude",
  },
  {
    id: "lng",
    label: "Longitude",
  },
];

const makeClientRows = (clients: Client[]): Row[] => {
  return clients.map((client) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    lat: client.latLng[0],
    lng: client.latLng[1],
  }));
};

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { clientsList, listClients } = useClient();
  const { salesmanPath, fetchSalesmanPath } = usePath();
  const [isPathModalOpen, setIsPathModalOpen] = useState(false);
  const initialLoading = useMemo(
    () => clientsList.uninitialized,
    [clientsList.uninitialized]
  );
  const memoizedLimit = useMemo(
    () => clientsList.data?.limit ?? 10,
    [clientsList.data?.limit]
  );
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

  useEffect(() => {
    fetchSalesmanPath();
  }, [fetchSalesmanPath]);

  const handlePaginationChange = useCallback(
    (newPage: number, newLimit: number) => {
      listClients({
        page: newPage,
        limit: newLimit,
        query: clientsList.data!.query,
      });
    },
    [clientsList.data, listClients]
  );

  const handleSeachChange = useCallback(
    (newSearch: string) => {
      listClients({
        page: 0,
        limit: memoizedLimit,
        query: {
          email: newSearch,
          name: newSearch,
          phone: newSearch,
        },
      });
    },
    [memoizedLimit, listClients]
  );

  const handleNavigateToCreateClient = () => {
    navigate("/create-client");
  };

  const handleOpenPathModal = () => {
    setIsPathModalOpen(true);
  };

  const handleClosePathModal = () => {
    setIsPathModalOpen(false);
  };

  if (initialLoading) {
    return (
      <Container className="loading-container">
        <Loading />
      </Container>
    );
  }

  return (
    <>
      <Container className="home-container" maxWidth="xl">
        <Paper className="home-paper" elevation={3}>
          <Stack className="home-stack">
            <Box className="home-header" paddingY={3}>
              <Stack direction="row-reverse" gap={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleNavigateToCreateClient}
                >
                  Cadastrar cliente
                </Button>

                <MyButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleOpenPathModal}
                  loading={salesmanPath.loading}
                >
                  Mostrar Rota
                </MyButton>
              </Stack>
            </Box>
            <Box className="home-content-container">
              <Table
                columns={tableColumns}
                rows={tableRows}
                total={clientsList.data?.total ?? 0}
                rowIdColumn="id"
                search={{
                  onChange: handleSeachChange,
                  placeholder: "Busque por nome, email ou telefone",
                }}
                pagination={{
                  page: clientsList.data?.page ?? 0,
                  limit: clientsList.data?.limit ?? 10,
                  onChange: handlePaginationChange,
                }}
              />
            </Box>
          </Stack>
        </Paper>
      </Container>
      <PathModal
        salesmanPathExternalData={salesmanPath}
        isOpen={isPathModalOpen}
        handleClose={handleClosePathModal}
      />
    </>
  );
};

export default HomeScreen;
