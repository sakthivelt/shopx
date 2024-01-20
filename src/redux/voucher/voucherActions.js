import {
  CLEAR_VOUCHER,
  ADD_VOUCHER,
  UPDATE_VOUCHER_TOTEL,
} from "./voucherActionTypes";

export const addVoucher = (data) => {
  return { type: ADD_VOUCHER, payload: data };
};

export const clearVoucher = () => {
  return { type: CLEAR_VOUCHER };
};

export const updateVoucherTotel = (data) => {
  return { type: UPDATE_VOUCHER_TOTEL, payload: data };
};
