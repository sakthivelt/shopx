import {
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  DELETE_ONE_PRODUCT,
} from "./productsActionTypes";

let id = 0;
const initialState = {
  products: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        products: [
          ...state.products,
          {
            ...action.payload,
            qty: parseInt(action.payload.qty),
            rate: parseInt(action.payload.rate),
            vr_no: parseInt(action.payload.vr_no),
            sr_no: id++,
          },
        ],
      };
    case DELETE_ONE_PRODUCT:
      let result =
        state.products &&
        state.products.filter((item) => {
          return item.srNo != action.payload;
        });

      return {
        products: result,
      };
    case CLEAR_PRODUCT:
      return {
        products: [],
      };

    default:
      return state;
  }
}
