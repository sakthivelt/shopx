import Joi from "joi";

// schemes
const productSchema = Joi.object({
  item_name: Joi.string().max(200).required(),
  item_code: Joi.string().max(20).required(),
  qty: Joi.number().required(),
  rate: Joi.number().required(),
  description: Joi.string().max(3000).required(),
});

// validation functions
export function productValidate(data) {
  return productSchema.validate(data);
}
