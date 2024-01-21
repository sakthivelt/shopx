import React from "react";

import toast from "react-hot-toast";

// redux
import { connect } from "react-redux";
import { deleteOneProduct } from "../../redux";

function Table({ product, deleteOneProduct, setProductValues }) {
  return (
    <div className="w-full ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
          <thead className="text-xs border-b  uppercase bg-appBg-dark text-appColor-light ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Item name
              </th>
              <th scope="col" className="px-6 py-3">
                Item Code
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                rate
              </th>
              <th scope="col" className="px-6 py-3">
                Totel
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {/* product items */}
          <tbody>
            {product &&
              product.map((item, index) => {
                return (
                  <tr
                    className="bg-appBg-dark border-b border-appBg-semilight  hover:bg-appBg-light "
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-appColor-light whitespace-nowrap dark:text-appColor-dark"
                    >
                      {item?.item_name}
                    </th>
                    <td className="px-6 py-4">{item?.item_code}</td>
                    <td className="px-6 py-4">{item?.qty}</td>
                    <td className="px-6 py-4">${item?.rate}</td>
                    <td className="px-6 py-4">${item?.rate * item.qty}</td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => {
                          setProductValues(item);
                          deleteOneProduct(item?.srNo);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          deleteOneProduct(item?.srNo);
                          toast.success("deleted");
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.productsReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOneProduct: (data) => dispatch(deleteOneProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
