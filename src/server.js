// require('dotenv').config()
import pg from 'pg'
import frutasRoutes from './routes/frutasRoutes.js';

const { Pool } = pg
 
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
 
const client = await pool.connect()
const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
console.log(res.rows[0])
 
client.release()