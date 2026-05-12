import pool from '../config/db.js'

class FrutasService {

    // GET -> listar todas
    async getAllFrutas() {
        const result = await pool.query(
            'SELECT * FROM frutas'
        )

        return result.rows
    }

    // GET BY ID -> buscar uma
    async getById(id) {
        const result = await pool.query(
            'SELECT * FROM frutas WHERE id = $1',
            [id]
        )

        return result.rows[0]
    }

    // POST -> criar fruta
    async create(nome) {
        const result = await pool.query(
            'INSERT INTO frutas (nome) VALUES ($1) RETURNING *',
            [nome]
        )

        return result.rows[0]
    }

    // PATCH -> atualizar fruta
    async patch(id, nome) {
        const result = await pool.query(
            'UPDATE frutas SET nome = $1 WHERE id = $2 RETURNING *',
            [nome, id]
        )

        return result.rows[0]
    }

    // DELETE -> deletar fruta
    async delete(id) {
        await pool.query(
            'DELETE FROM frutas WHERE id = $1',
            [id]
        )

        return { message: 'Fruta deletada com sucesso' }
    }
}

export default new FrutasService()