import db from "../database";
import { Client } from "../models/client-model";
import { CreateClient } from "./types";

export interface SearchParams {
  limit: number;
  offset: number;
  q: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface SearchResult {
  list: any[];
  total: number;
}

const like = (value?: string) => {
  return `%${value ? value : ""}%`;
};

class ClientRepository {
  async create(data: CreateClient): Promise<Client> {
    const {
      name,
      email,
      phone,
      location: [lat, lng],
    } = data;

    const result = await db.query(
      `
      INSERT INTO clients (name, email, phone, lat, lng)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [name, email, phone, lat, lng]
    );

    return result.rows[0] as Client;
  }

  async list(params: SearchParams): Promise<SearchResult> {
    const { limit, offset, q } = params;

    const result = await db.query(
      `
      SELECT * FROM clients WHERE 
      name ILIKE $1 OR 
      email ILIKE $2 OR
      phone ILIKE $3
      OFFSET $4 LIMIT $5;
    `,
      [like(q.name), like(q.email), like(q.phone), offset, limit]
    );
    const countResult = await db.query(
      `
      SELECT COUNT(*) FROM clients WHERE 
      name ILIKE $1 OR 
      email ILIKE $2 OR
      phone ILIKE $3;
      `,
      [like(q.name), like(q.email), like(q.phone)]
    );

    return {
      list: result.rows.map((client) => ({
        ...client,
        lat: parseFloat(client.lat),
        lng: parseFloat(client.lng),
      })),
      total: parseInt(countResult.rows[0].count),
    };
  }

  async listAll(): Promise<any[]> {
    const result = await db.query(`SELECT * FROM clients;`);

    return result.rows.map((client) => ({
      ...client,
      lat: parseFloat(client.lat),
      lng: parseFloat(client.lng),
    }));
  }
}

export default ClientRepository;
