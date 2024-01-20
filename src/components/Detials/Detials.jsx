import React, { useEffect, useState } from "react";
import generatePDF, { usePDF, Margin, Resolution } from "react-to-pdf";
import {
  addProduct,
  clearVoucher,
  deleteOneProduct,
  updateVoucherTotel,
} from "../../redux";
import { connect, useSelector } from "react-redux";
import date from "date-and-time";
import { useDispatch } from "react-redux";
// components
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";
import Table from "../Table/Table";

import { productValidate } from "../../validation/productValidation";

// icons
import rupesIcon from "../../assets/icons/rupes.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import productIcon from "../../assets/icons/product.svg";
import qrCodeIcon from "../../assets/icons/qrCode.svg";
import listIcon from "../../assets/icons/list.svg";
import descriptionIcon from "../../assets/icons/description.svg";
import toast from "react-hot-toast";
import { createVoucherValidate } from "../../validation/headerValidation";
import _ from "lodash";
import insertMultiple from "../../API/insertMultiple";
import { clearProduct } from "../../redux/products/productsActions";
import Invoice from "../Invoice/Invoice";

function Detials({ addProducts, product }) {
  const [item_name, setitem_name] = useState("");
  const [item_code, setitem_code] = useState("");
  const [qty, setqty] = useState("");
  const [rate, setrate] = useState("");
  const [description, setDescription] = useState("");
  const [totel, setTotel] = useState(0);
  const [pdfRef, setpdfRef] = useState();

  console.log(pdfRef);

  const { user } = useSelector((state) => state.voucher);
  console.log(user);
  // console.log(product);

  const dispatch = useDispatch();

  const clearInput = () => {
    setitem_name("");
    setitem_code("");
    setqty("");
    setrate("");
    setDescription("");
  };

  const setProductValues = (data) => {
    setitem_name(data.item_name);
    setitem_code(data.item_code);
    setqty(data.qty);
    setrate(data.rate);
    setDescription(data.description);
  };

  const calculateTotal = (data) => {
    if (Array.isArray(data) && product.length > 0) {
      const ans = data.reduce((total, currentValue) => {
        return currentValue.qty * currentValue.rate + total;
      }, 0);
      console.log("calculate dispatched");
      dispatch(updateVoucherTotel(ans));
      return ans;
    }
    return 0;
  };

  const addProductHandler = () => {
    if (_.isEmpty(user))
      return toast.error("add the Voucher detials before add the items");
    let value = productValidate({
      item_name,
      item_code,
      qty,
      rate,
      description,
    });

    if (value.error) {
      toast.error(value.error.message);
    } else {
      addProducts({
        item_name,
        item_code,
        qty,
        rate,
        description,
        vr_no: user.vr_no,
      });

      toast.success("Item Added");
      calculateTotal(product);
      // console.log(product);
      clearInput();
    }
  };

  const handelSave = () => {
    let validateResult = createVoucherValidate({
      vr_no: user.vr_no,
      ac_name: user.ac_name,
      status: user.status,
      vr_date: user.vr_date,
      ac_amt: user.ac_amt,
    });
    console.log(user, validateResult);
    if (_.isEmpty(user) || validateResult.error)
      return toast.error("please add the Voucher detials");

    if (product.length <= 0)
      return toast.error("Please add minimum one product");

    const data = {
      header_table: {
        vr_no: parseInt(user.vr_no),
        vr_date: date.format(user.vr_date, "YYYY-DD-MM"),
        ac_name: user.ac_name,
        ac_amt: user.ac_amt,
        status: user.status,
      },
      detail_table: product,
    };
    const result = insertMultiple(data);
    toast.promise(result, {
      loading: "hold on a moment ",
      success: "saved",
      error: "server error , try againg",
    });
    console.log(result);
  };

  const handelNew = () => {
    dispatch(clearProduct());
    dispatch(clearVoucher());
  };

  useEffect(() => {
    let tempTotel = calculateTotal(product);
    setTotel(tempTotel);
  }, [product]);

  return (
    <div className=" row-span-4 w-full h-full grid grid-rows-5 gap-[1rem] bg-appBg-light ">
      <div className="card grid grid-cols-7 gap-3">
        <InputBox
          style={"col-span-2"}
          name={"Item Name"}
          idName={"user_name"}
          placeholder={"ex: sakthi"}
          icon={productIcon}
          value={item_name}
          setValue={setitem_name}
        />
        <InputBox
          name={"Item Code"}
          idName={"user_name"}
          placeholder={"ex: sakthi"}
          icon={qrCodeIcon}
          value={item_code}
          setValue={setitem_code}
        />
        <InputBox
          name={"QTY"}
          idName={"user_name"}
          placeholder={"ex: sakthi"}
          icon={listIcon}
          value={qty}
          setValue={setqty}
        />
        <InputBox
          name={"rate"}
          idName={"user_name"}
          placeholder={"ex: sakthi"}
          icon={rupesIcon}
          value={rate}
          setValue={setrate}
        />
        <InputBox
          name={"description"}
          idName={"user_name"}
          placeholder={"ex: sakthi"}
          icon={descriptionIcon}
          value={description}
          setValue={setDescription}
        />
        <div className="flex justify-center items-center">
          <Button onClick={addProductHandler}>Add Item</Button>
        </div>
      </div>
      <div className="row-span-5 grid grid-cols-6  gap-2">
        <div className="card h-[35rem] col-span-5 overflow-y-scroll">
          <Table setProductValues={setProductValues} />
        </div>
        <div className=" grid grid-rows-4 h-[35rem] gap-4">
          <div className="card row-span-3  grid grid-rows-3 items-center justify-center ">
            <div>
              <Button onClick={handelNew} className={"w-full"}>
                New
              </Button>
            </div>
            <div>
              <Button onClick={handelSave}>Save</Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  console.log(pdfRef);
                  generatePDF(pdfRef);
                }}
              >
                Print
              </Button>
            </div>
            {/* <div>
              <Button>Delete </Button>
            </div> */}
          </div>
          <div className="card flex flex-col justify-evenly items-center">
            <h1 className="text-2xl">totel</h1>
            <InputBox icon={rupesIcon} value={totel} setValue={setTotel} />
          </div>
        </div>
      </div>
      <Invoice setpdfRef={setpdfRef} className={"absolute -z-50 top-0"} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { product: state.productsReducer.products };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProducts: (data) => dispatch(addProduct(data)),
    deleteOneProduct: (data) => dispatch(deleteOneProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detials);
