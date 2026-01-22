
class EmprestimosService {
    constructor (model) {
        this.Emprestimo = model;
    }

    createEmprestimo = async (data) => {
        const { jogoId, amigoId, dataInicio, dataFim } = data;
        
        await Emprestimo.create({
            jogoId: Number(jogoId),
            amigoId: Number(amigoId),
            dataInicio,
            dataFim: dataFim || null
        });
    }

    getAllEmprestimos = async () => {
        const emprestimos = await Emprestimo.findAll({
            include: [{ model: Jogo, as: 'jogo' }, { model: Amigo, as: 'amigo' }],
            order: [['id', 'ASC']]
        });

        return emprestimos;
    }

    excluirEmprestimo = async (data) => {
        await Emprestimo.destroy(data);
    }
}

module.exports = EmprestimosService;