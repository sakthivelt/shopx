import Joi, { date } from "joi";

const fetchVoucherSchema = Joi.object({
  vr_no: Joi.string().alphanum().required(),
});

const createVoucherSchema = Joi.object({
  vr_no: Joi.number().required(),
  ac_name: Joi.string().min(3).max(200).required(),
  status: Joi.string().min(1).max(1).required(),
  vr_date: Joi.date().required(),
  ac_amt: Joi.number().required(),
});

export function fetchVoucherValidate(data) {
  console.log("called");
  return fetchVoucherSchema.validate(data);
}

export function createVoucherValidate(data) {
  console.log(data);
  return createVoucherSchema.validate(data);
}
