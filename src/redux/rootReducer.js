import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import { voucherReducer } from "./voucher/voucherReducer";

const rootReducer = combineReducers({
  voucher: voucherReducer,
  productsReducer,
});

export default rootReducer;
