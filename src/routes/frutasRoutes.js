import express from "express";
import { frutasService } from "../services/frutasServices.js";


const routeFrutas = express.Router();

// GET - listar todas as frutas
routeFrutas.get("/", async (req, res) => {
    const frutas = await frutasService.getAll();
    res.json(frutas);
});

// GET por ID
routeFrutas.get("/:id", async (req, res) => {
    const { id } = req.params;

    // Validação: verifica se é número e se é positivo

    if (isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número positivo." });
    }
    const fruta = await frutasService.getById(id);

    if (!fruta) {
        return res.status(404).json({ message: "Fruta não encontrada." });
    }
    res.json(fruta);
});

// POST - criar fruta
routeFrutas.post("/", async (req, res) => {

    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({
            message: "Nome é obrigatório"
        });
    }

    const fruta = await frutasService.create(nome);

    res.status(201).json(fruta);
});

// PATCH - atualização parcial
routeFrutas.patch("/:id", async (req, res) => {
    
    const { id } = req.params
    const frutaAtualizada = await frutasService.updateFruta(id, req.body);

    if (!frutaAtualizada) {
        return res.status(404).json({ message: "Fruta não encontrada." });
    }

    res.json(frutaAtualizada);
});

// PUT - substituição completa
routeFrutas.put("/:id", async (req, res) => {
    const { id } = req.params;

    const frutaAtualizada = await frutasService.updateFruta(id, {
        nome: nome.trim(),
        categoria: categoria.trim()
    });

    if (!frutaAtualizada) {
        return res.status(404).json({ message: "Fruta não encontrada." });
    }

    res.json(frutaAtualizada);
});

// DELETE
routeFrutas.delete("/:id", async (req, res) => {

    const { id } = req.params;
    const removido = await frutasService.deleteFruta(id);

    // Mensagem de erro em JSON caso não encontre

    if (!removido) {
        return res.status(404).json({
            message: "Erro: Fruta não encontrada para remoção."
        });
    }

    // Retorna mensagem confirmando a remoção (Status 200 para permitir corpo JSON)
    res.status(200).json({ message: "Fruta removida com sucesso." });
});

export default routeFrutas;