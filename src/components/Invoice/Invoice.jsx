import React, { useRef } from "react";
import { useSelector } from "react-redux";
import date from "date-and-time";

export default function Invoice({ setpdfRef, className }) {
  // redux
  const { products } = useSelector((state) => state.productsReducer);
  const { user } = useSelector((state) => state.voucher);

  const targetRef = useRef();
  setpdfRef(targetRef);

  return (
    <div
      className={"w-[70%] h-[100vh] text-black   " + className}
      ref={targetRef}
    >
      <div className="app-wrapper">
        <div className="app-content">
          <main className="p-6">
            <div className="card bg-white text-black p-6">
              <div className="flex justify-between">
                <div>
                  <h1 className="mt-2 text-lg md:text-xl font-semibold text-black">
                    SHOP X
                  </h1>
                </div>

                <div className="text-end">
                  <h2 className="text-2xl md:text-3xl font-semibold text-black">
                    Invoice #
                  </h2>
                  <span className="mt-1 block text-gray-500">
                    {user && user.vr_no}
                  </span>

                  <address className="mt-4 not-italic text-black">
                    Dharmapuri
                    <br />
                    Tamilnadu
                    <br />
                  </address>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-black">Bill to:</h3>
                  <h3 className="text-lg font-semibold text-black">
                    {user && user?.ac_name}
                  </h3>
                  <address className="mt-2 not-italic text-black">
                    1274 ,
                    <br />
                    Unplugapps,
                    <br />
                    Kerala
                    <br />
                  </address>
                </div>

                <div className="col-start-3">
                  <table className="w-full text-end">
                    <tr>
                      <td className="-1 font-medium text-black">
                        Invoice date:
                      </td>
                      <td className="py-1 font-mediumpy text-black">
                        {user &&
                          user.date &&
                          date.format(user?.vr_date, "DD/MM/YYYY")}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-200">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-black"
                            >
                              <div className="flex items-center gap-x-3 text-black">
                                <span className="text-black">Item Name</span>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                            >
                              Item Code
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                            >
                              QTY
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                            >
                              Rate
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                            >
                              totel
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products &&
                            products.map((item) => {
                              return (
                                <tr>
                                  <td className="px-4 py-4 text-sm font-medium text-black whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                      <span className="text-black">
                                        {item.item_name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                    {item.item_code}
                                  </td>
                                  <td className="px-4 py-4 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1  gap-x-2 ">
                                      <h2 className="text-sm font-normal text text-gray-600">
                                        {item.qty}
                                      </h2>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                    {item.rate}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                    {item.rate * item.qty}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="w-full p-8"></div>

                <div className="w-full max-w-2xl sm:text-end space-y-2">
                  <div className="grid grid-cols-1">
                    <table className="w-full text-end">
                      <tr>
                        <td className="py-1 font-medium text-black">
                          Subtotal:
                        </td>
                        <td className="py-1 font-medium text-black">
                          &#x20b9;{user && user?.ac_amt}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium text text-black">
                          Total:
                        </td>
                        <td className="py-1 font-medium text-black">
                          &#x20b9;{user && user?.ac_amt}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium text-black">Tax:</td>
                        <td className="py-1 font-medium text-black">
                          &#x20b9;0
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium text-black">
                          Amount paid:
                        </td>
                        <td className="py-1 font-medium text-black">
                          &#x20b9;{user && user?.ac_amt}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium text-black">
                          Due balance:
                        </td>
                        <td className="py-1 font-medium text-black">
                          &#x20b9;0.00
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800">
                  Thank you for shoping !
                </h4>
                <p className="text-gray-500">
                  If you have any questions concerning this invoice, use the
                  following contact information:
                </p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800">
                    sakthiveltofficial@gmail.com
                  </p>
                  <p className="block text-sm font-medium text-gray-800">
                    +91 93449 53788
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="mt-5 text-sm text-gray-500">
                  © 2023-2024 sakthivel
                </p>

                <div className="flex gap-2 items-center print:hidden">
                  <a
                    // href="javascript:window.print()"
                    className="btn bg-primary text-black"
                  >
                    <i className="bx bx-printer text-lg me-1"></i> Print
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
