// app/lib/db.js
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Opcional: logar quando conectado
pool.connect()
  .then(() => console.log("Conectado ao PostgreSQL"))
  .catch((err) => console.error("Erro ao conectar no PostgreSQL:", err));

export async function query(text, params) {
  const { rows } = await pool.query(text, params);
  return rows;
}
