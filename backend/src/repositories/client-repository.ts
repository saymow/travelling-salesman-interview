import { Client } from "pg";
import db from "../database";
import { CreateClient } from "./types";

class ClientRepository {
  async create(data: CreateClient): Promise<Client> {
    const {
      name,
      email,
      phone,
      location: [lat, lng],
    } = data;

    const client = await db.query(
      `
      INSERT INTO clients (name, email, phone, lat, lng)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [name, email, phone, lat, lng]
    );

    return client.rows[0] as Client;
  }
}

export default ClientRepository;
