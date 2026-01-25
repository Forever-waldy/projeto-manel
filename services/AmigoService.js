const {Amigo} = require('../models');

class AmigoService {
    constructor(model) {
        this.Amigo = model;
    }

    createAmigo = async (data) => {
        const { nome, email } = data;
        await this.Amigo.create({ nome, email });
    }

    getAllAmigos = async () => {
        const amigos = await Amigo.findAll({ order: [['id', 'ASC']] });

        return amigos;
    }

    getAllAmigosOrderedByName = async () => {
        const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });

        console.log(amigos);

        return amigos;
    }

    getAmigoById = async (data) => {
        const amigo = await Amigo.findByPk(data);

        return amigo;
    }

    updateAmigo = async (data, id) => {
        await Amigo.update(data, id);
    }

    deleteAmigo = async (data) => {
        const {id} = data;
        await Amigo.destroy({where: {id: data.id}});
    }

    getAmigosJson = async () => {
        const amigos = await this.Amigo.findAll({ order: [['nome', 'ASC']] });

        const resultado = {};

        amigos.forEach(amigo => {
            resultado[amigo.id] = {
                nome: amigo.nome,
                email: amigo.email
            };
        });

        return resultado;
    }
}

module.exports = AmigoService;
