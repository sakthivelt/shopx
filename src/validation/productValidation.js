import Joi from "joi";

const productSchema = Joi.object({
  item_name: Joi.string().max(200).required(),
  item_code: Joi.string().max(20).required(),
  qty: Joi.number().required(),
  rate: Joi.number().required(),
  description: Joi.string().max(3000).required(),
});

export function productValidate(data) {
  console.log("called");
  return productSchema.validate(data);
}
