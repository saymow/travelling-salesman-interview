import { Box, Stack } from "@mui/material";
import { useMemo } from "react";
import MapContainer, { Marker, Polyline } from "../../../components/map";
import { ORIGIN } from "../../../components/map/helpers";
import Modal from "../../../components/modal";
import Table, { Column, Row } from "../../../components/table";
import { Client } from "../../../resources/client/client-model";
import { ExternalData } from "../../../resources/client/client-types";
import { ClientsSalesmanTravellingResult } from "../../../resources/path/path-model";
import "./styles.css";

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
  salesmanPathExternalData: ExternalData<ClientsSalesmanTravellingResult>;
}

const tableColumns: Column[] = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "order",
    label: "Ordem de visita",
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
  return clients.map((client, idx) => ({
    id: client.id,
    order: `${idx + 1}°`,
    name: client.name,
    email: client.email,
    phone: client.phone,
    lat: client.latLng[0],
    lng: client.latLng[1],
  }));
};

const makeMarkers = (clients: Client[]): Marker[] => {
  return [
    { type: "STATIC", position: ORIGIN, color: "blue", text: "Origem" },
    ...clients.map((client) => ({
      type: "STATIC",
      position: client.latLng,
      color: "red",
      text: `${client.name} - ${client.email}`,
    })),
  ] as Marker[];
};

const makePolylinePathColor = (destinationIdx: number, lenIdex: number) => {
  return `rgba(0, 0, 255, ${1 - (destinationIdx / lenIdex) * 0.7})`;
};

const makePolylines = (clients: Client[]): Polyline[] => {
  if (clients.length === 0) return [];

  return [
    ...clients.map<Polyline>((client, index) => {
      if (index === 0)
        return {
          color: makePolylinePathColor(index, clients.length - 1),
          position: [ORIGIN, client.latLng],
        };

      return {
        color: makePolylinePathColor(index, clients.length - 1),
        position: [clients[index - 1].latLng, client.latLng],
      };
    }),
    {
      color: makePolylinePathColor(clients.length - 1, clients.length - 1),
      position: [clients[clients.length - 1].latLng, ORIGIN],
    },
  ];
};

const PathModal: React.FC<Props> = (props) => {
  const { salesmanPathExternalData: salesmanPath, isOpen, handleClose } = props;
  const markers: Marker[] = useMemo(
    () => makeMarkers(salesmanPath.data?.path ?? []),
    [salesmanPath.data?.path]
  );
  const polylines: Polyline[] = useMemo(
    () => makePolylines(salesmanPath.data?.path ?? []),
    [salesmanPath.data?.path]
  );
  const tableRows = useMemo(
    () => makeClientRows(salesmanPath.data?.path ?? []),
    [salesmanPath.data?.path]
  );

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className="path-modal-container"
    >
      <Stack sx={{ height: "100%" }}>
        <MapContainer
          height={420}
          markers={markers}
          polylines={polylines}
          legend={
            <>
              <article className="path-line-container">
                <span className="path-line"></span>
                <section className="path-line-legend">
                  <strong>Início</strong>
                  <strong>Fim</strong>
                </section>
              </article>
              <span>
                <strong>Distância:</strong>{" "}
                {(salesmanPath.data?.distance ?? 0).toFixed(2)} km
              </span>
            </>
          }
        />
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Table
            columns={tableColumns}
            rows={tableRows}
            rowIdColumn="id"
            total={salesmanPath.data?.path.length ?? 0}
          />
        </Box>
      </Stack>
    </Modal>
  );
};

export default PathModal;
