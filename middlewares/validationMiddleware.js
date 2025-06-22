const { body, validationResult } = require('express-validator');

// Função para converter data BR para um objeto Date
// Retorna um objeto Date válido ou null se o formato for inválido
const parseBrDate = (value) => {
    if (!value || !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        return null; // Formato inválido
    }
    const [dia, mes, ano] = value.split('/');
    // O mês no construtor Date é 0-indexado (0 = Janeiro, 11 = Dezembro)
    const date = new Date(ano, mes - 1, dia);
    // Verifica se a data é válida (ex: 31/02/2025 se torna 03/03/2025)
    if (date.getFullYear() !== parseInt(ano) || date.getMonth() !== parseInt(mes) - 1 || date.getDate() !== parseInt(dia)) {
        return null;
    }
    return date;
};


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    // O erro na sua versão original era `err.param`, que pode ser o nome do campo.
    // Para a sua estrutura de erro `{[err.param]: err.msg}`, isso está correto.
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

const clientValidationRules = () => {
    return [
        body('nome').isString().isLength({ min: 3, max: 255 }).withMessage('Nome deve ter entre 3 e 255 caracteres.'), // 
        body('sobrenome').isString().isLength({ min: 3, max: 255 }).withMessage('Sobrenome deve ter entre 3 e 255 caracteres.'), // 
        body('email').isEmail().withMessage('Email deve ser um formato válido.'), // 
        // A idade máxima no PDF é 120, mas a validação isInt é exclusiva no `max`, então 119 está correto para ser "menor que 120".
        body('idade').isInt({ min: 1, max: 119 }).withMessage('Idade deve ser maior que 0 e menor que 120.'), // 
    ];
};

const productValidationRules = () => {
    return [
        body('nome').isString().isLength({ min: 3, max: 255 }).withMessage('Nome do produto deve ter entre 3 e 255 caracteres.'), // 
        body('descricao').isString().isLength({ min: 3, max: 255 }).withMessage('Descrição deve ter entre 3 e 255 caracteres.'), // 
        body('preco').isFloat({ gt: 0 }).withMessage('Preço deve ser um número positivo.'), // 
    ];
};


module.exports = {
    validate,
    clientValidationRules,
    productValidationRules,
};