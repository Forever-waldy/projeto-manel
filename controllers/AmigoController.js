const AmigoService = require('../services/AmigoService.js');
const {Amigo} = require('../models');

class AmigoController {
    constructor () {
        this.amigoService = new AmigoService(Amigo);
    }

    // /amigos
    exibirAmigos = async (req, res) => {
        this.amigoService.getAllAmigos();
        res.render('amigos/index', { amigos });
    }

    // /amigos/novo
    exibirAdicionarAmigos = async (req, res) => res.render('amigos/novo');

    // /amigos/novo
    adicionarAmigos = async (req, res) => {
        const { nome, email } = req.body;
        await this.amigoService.createAmigo({nome, email})
        res.redirect('/amigos');
    }

    // /amigos/editar/:id
    exibirEditarAmigo = async (req, res) => {
        const amigo = await this.amigoService.getAmigoById(req.params.id);
        if (!amigo) return res.status(404).send('Amigo não encontrado.');
        res.render('amigos/editar', { amigo });
    }

    // /amigos/editar/:id
    editarAmigo = async (req, res) => {
        const { nome, email } = req.body;
        await this.amigoService.updateAmigo({ nome, email }, { where: { id: req.params.id } });
        res.redirect('/amigos');
    }

    // /amigos/excluir/:id
    excluirAmigos = async (req, res) => {
        await this.amigoService.deleteAmigo({ id: req.params.id });
        res.redirect('/amigos');
    }
}

module.exports = AmigoController;