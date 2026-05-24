const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .trim()
    .required()
    .messages({
      "string.empty": "Nome é obrigatório",
      "string.min": "Nome deve ter no mínimo 3 caracteres"
    }),

  quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Quantidade deve ser um número",
      "number.min": "Quantidade não pode ser negativa"
    }),

  price: Joi.number()
    .greater(0)
    .required()
    .messages({
      "number.base": "Preço deve ser um número",
      "number.greater": "Preço deve ser maior que 0"
    })
});

module.exports = productSchema;