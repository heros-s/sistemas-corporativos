const express = require('express');

const app = express();

app.use(express.json());

const produtos = [
    {
        id: 1,
        nome: "Arroz",
        preco: 10.50,
        dataValidade: "2025-08-01",
        quantidadeEstoque: 150
    },
    {
        id: 2,
        nome: "Feijão",
        preco: 7.80,
        dataValidade: "2025-07-15",
        quantidadeEstoque: 200
    },
    {
        id: 3,
        nome: "Macarrão",
        preco: 5.30,
        datavalidade: "2025-09-10",
        quantidadeEstoque: 180
    },
    {
        id: 4,
        nome: "Óleo",
        preco: 4.20,
        dataValidade: "2026-02-20",
        quantidadeEstoque: 100
    },
    {
        id: 5,
        nome: "Açúcar",
        preco: 3.00,
        dataValidade: "2025-11-05",
        quantidadeEstoque: 250
    }
];

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post("/produtos", (req, res) =>{
    const novoProduto = req.body;
    novoProduto.id = produtos.length + 1;
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});