import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addVoucher, clearVoucher, updateVoucherTotel } from "../../redux";
import { clearProduct } from "../../redux/products/productsActions";
import { createVoucherValidate } from "../../validation/headerValidation";

//components
import InputBox from "../../components/InputBox/InputBox";
import DatePicker from "../DatePicker/DatePicker";
import DropDown from "../DropDown/DropDown";
import Button from "../Button/Button";

import toast from "react-hot-toast";
import _ from "lodash";

//icons
import userIcon from "../../assets/icons/user.svg";
import rupes from "../../assets/icons/rupes.svg";
import id from "../../assets/icons/id.svg";

function Header() {
  const [vr_no, setvr_no] = useState(new Date().valueOf());
  const [ac_name, setac_name] = useState("");
  const [status, setStatus] = useState("A");
  const [vr_date, setvr_date] = useState(new Date());
  const [ac_amt, setac_amt] = useState(0);

  // redux
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsReducer);
  const { user } = useSelector((state) => state.voucher);

  const handelClear = () => {
    setvr_no(new Date().valueOf());
    setac_name("");
    setStatus("A");
    setvr_date(new Date());
    setac_amt(0);
    dispatch(clearVoucher());
    dispatch(clearProduct());
  };

  const handelAdd = () => {
    let value = createVoucherValidate({
      vr_no,
      ac_name,
      status,
      vr_date,
      ac_amt,
    });
    if (value.error) return toast.error(value.error.message);

    toast.success("voucher detials Added");
    dispatch(addVoucher({ vr_no, ac_name, status, vr_date, ac_amt }));
  };

  const calculateTotal = (data) => {
    if (Array.isArray(data) && products.length > 0) {
      const ans = data.reduce((total, currentValue) => {
        return currentValue.qty * currentValue.rate + total;
      }, 0);
      dispatch(updateVoucherTotel(ans));
      return ans;
    }
    return 0;
  };

  useEffect(() => {
    setac_amt(calculateTotal(products));
  }, [products]);

  useEffect(() => {
    if (_.isEmpty(user)) {
      setvr_no(new Date().valueOf());
      setac_name("");
      setStatus("A");
      setvr_date(new Date());
      setac_amt(0);
    }
  }, [user]);

  return (
    <div className="card  Header  grid grid-rows-2 grid-cols-3 gap-[.5rem] ">
      <div className="vr_no">
        <InputBox
          disabled={true}
          name={"Vr No"}
          idName={"vr_no"}
          placeholder={"ex: 1234xxx"}
          icon={id}
          value={vr_no}
          setValue={setvr_no}
        />
      </div>
      <div className="ac_name">
        <InputBox
          name={"AC Name"}
          idName={"ac_name"}
          placeholder={"ex: sakthi"}
          icon={userIcon}
          value={ac_name}
          setValue={setac_name}
        />
      </div>
      <div className="status">
        <DropDown
          name={"Status"}
          idName={"status"}
          list={[
            {
              lable: "Active",
              value: "A",
            },
            {
              lable: "InActive",
              value: "I",
            },
          ]}
          value={status}
          setValue={setStatus}
        />
      </div>
      <div className=" flex justify-center items-center flex-1">
        <DatePicker
          name={"Vr Date"}
          idName={"vr_date"}
          placeholder={"ex: DD-MM-YYYY"}
          value={vr_date}
          setValue={setvr_date}
        />
      </div>
      <div className="ac_amt">
        <InputBox
          name={"Grand Totel"}
          idName={"ac_amt"}
          placeholder={"ex: 350"}
          icon={rupes}
          value={ac_amt}
          setValue={setac_amt}
        />
      </div>
      <div className="flex justify-evenly items-center">
        <Button onClick={handelAdd} className={"mr-3"}>
          Add
        </Button>
        <Button onClick={handelClear}>Clear</Button>
      </div>
    </div>
  );
}

export default Header;
