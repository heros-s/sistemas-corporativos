const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'senha'
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

app.post('/login', (req,res) => {
    const {usuario, senha} = req.body;

    if(usuario === 'admin' && senha === '1234') {
        const token = jwt.sign({ usuario }, SECRET_KEY, {
            expiresIn: '1h',
        });

        return res.json({
            mensagem: 'Login executado com sucesso!',
            token,
        });
    }

    return res.status(401).json({
        mensagem: 'Usuário ou senha inválidos.',
    });
});

const autenticarToken = (req, res, next) => {
    console.log(req);
    const token = req.headers["authorization"];

    if(!token) {
        return res.status(403).json({
            mensagem: "Token não encontrado.",
        })
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                mensagem: "Token inválido",
            })
        }

    req.usuario = decoded.usuario;
    next();
    })
}

app.get('/produtos', autenticarToken, (req, res) => {
    res.json(produtos);
});

app.post("/produtos", (req, res) =>{
    const novoProduto = req.body;
    novoProduto.id = produtos.length + 1;
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
    console.log(req);
    const id = parseInt(req.params.id);
    const produtoAtualizado = req.body;

    let index = produtos.findIndex((produto) => produto.id === id);

    if (index !== -1) {
        produtos [index] = { id, ...produtoAtualizado };
        res.json(produtos[index]);
    } else {
        res.status(404).json({
            mensagem: "Este produto não existe.",
        })
    }
});

app.delete("/produtos/:id", (req,res) => {
    const id = parseInt(req.params.id);
    let index = produtos.findIndex((produto) => produto.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Este produto não existe.",
        })
    }

    produtos.splice(index, 1);

    res.json({
        mensagem: "Produto eliminado com sucesso!",
    })
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});