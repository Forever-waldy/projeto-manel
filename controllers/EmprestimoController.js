const EmprestimoService = require('../services/EmprestimosService.js');
const AmigoService = require('../services/AmigoService.js');
const JogosService = require('../services/JogosService.js');
const { Amigo, Jogo, Emprestimo } = require('../models');
const PDFDocument = require('pdfkit');
class EmprestimoController {
    constructor () {
        this.emprestimoService = new EmprestimoService(Emprestimo);
        this.amigoService = new AmigoService(Amigo);
        this.jogosService = new JogosService(Jogo);
    }

    // /emprestimos
    exibirEmprestimos = async (req, res) => {
        const emprestimos = await this.emprestimoService.getAllEmprestimos();

        res.render('emprestimos/index', { emprestimos });
    }

    // /emprestimos/novo
    exibirCriarEmprestimo = async (req, res) => {
        const jogos = await this.jogosService.getAllJogosOrderedByTitle();
        const amigos = await this.amigoService.getAllAmigosOrderedByName();
        res.render('emprestimos/novo', { jogos, amigos });
    }

    // /emprestimos/novo
    criarEmprestimo = async (req, res) => {
        const { jogoId, amigoId, dataInicio, dataFim } = req.body;
        await this.emprestimoService.createEmprestimo({
            jogoId: Number(jogoId),
            amigoId: Number(amigoId),
            dataInicio,
            dataFim: dataFim || null
        });

        res.redirect('/emprestimos');
    }

    // /emprestimos/excluir/:id
    excluirEmprestimo = async (req, res) => {
        await this.emprestimoService.excluirEmprestimo({ id: req.params.id });
        res.redirect('/emprestimos');
    }

    exibirJson = async (req, res) => {
        const data = await this.emprestimoService.getEmprestimosJson();

        return res.status(200).json(data);
    }

    // /emprestimos/pdf
    gerarPdf = async (req, res) => {
        const emprestimos = await this.emprestimoService.getAllEmprestimos();

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            'inline; filename=relatorio-emprestimos.pdf'
        );

        doc.pipe(res);

        // Título
        doc
            .fontSize(18)
            .text('Relatório de Emprestimos', { align: 'center' });

        doc.moveDown();

        // Cabeçalho
        doc.fontSize(12);
        doc.text('ID', 50, doc.y, { continued: true });
        doc.text('JogoId', 100, doc.y, { continued: true });
        doc.text('AmigoId', 150, doc.y, { continued: true });
        doc.text('DataInicio', 200, doc.y, { continued: true });
        doc.text('DataFim', 260, doc.y);

        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        // Dados
        emprestimos.forEach(e => {
            doc.moveDown(0.5);
            doc.text(String(e.id), 50, doc.y, { continued: true });
            doc.text(e.jogoId, 115, doc.y, { continued: true });
            doc.text(e.amigoId, 190, doc.y, { continued: true });
            doc.text(e.dataInicio, 255, doc.y, { continued: true });
            doc.text(e.dataFim, 305, doc.y);
        });

        doc.end();
    }
}

module.exports = EmprestimoController;