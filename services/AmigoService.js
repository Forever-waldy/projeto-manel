
class AmigoService {
    constructor(model) {
        this.Amigo = model;
    }

    createAmigo = async (data) => {
        const { nome, email } = data;
        await this.Amigo.create({ nome, email });
    }

    getAllAmigos = async () => {
        const amigos = await this.Amigo.findAll({ order: [['id', 'ASC']] });

        return amigos;
    }

    getAllAmigosOrderedByName = async () => {
        const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });

        return amigos;
    }

    getAmigoById = async (data) => {
        const {id} = data;
        const amigo = await this.Amigo.findByPk(id);

        return amigo;
    }

    updateAmigo = async (data, id) => {
        const { nome, email} = data;
        await this.Amigo.update({ nome, email }, id);
    }

    deleteAmigo = async (data) => {
        const {id} = data;
        await this.Amigo.destroy({ where: id });
    }
}

module.exports = AmigoService;
