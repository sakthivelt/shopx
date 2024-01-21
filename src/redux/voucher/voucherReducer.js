import {
  CLEAR_VOUCHER,
  ADD_VOUCHER,
  UPDATE_VOUCHER_TOTEL,
} from "./voucherActionTypes";

const initialUserState = {
  user: {},
};

export function voucherReducer(state = initialUserState, action) {
  switch (action.type) {
    case CLEAR_VOUCHER: {
      return { user: {} };
    }
    case ADD_VOUCHER: {
      return {
        user: {
          ...state.user,
          vr_no: action.payload.vr_no,
          ac_name: action.payload.ac_name,
          status: action.payload.status,
          vr_date: action.payload.vr_date,
          ac_amt: action.payload.ac_amt,
        },
      };
    }
    case UPDATE_VOUCHER_TOTEL: {
      return {
        user: {
          ...state.user,
          ac_amt: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
