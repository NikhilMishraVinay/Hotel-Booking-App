import { useState } from "react";
import { toast } from "react-toastify";
import { createConnectAccount } from "../actions/account";
import AccountForm from "../components/AccountForm";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserInLocalStorage } from "../actions/auth";

const Account = ({loading, setLoading, sented, setSented }) => {
    const [ifsc,setIfsc] =useState("");
    const [account,setAccount] = useState("");
    const [confirmAccount,setConfirmAccount] = useState("");
    const [name,setName] = useState("");
    const { auth } = useSelector((state) => ({ ...state }));
    const history = useHistory();
    const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { account, name });
    try {
        const accDetail = { ifsc,account,name}
        const res = await createConnectAccount(accDetail,auth.token);
        console.log("REGISTER USER ===> ", res);
        //update user in local storage
      updateUserInLocalStorage(res.data, ()=>{
        //redux update
        dispatch({
          type:"LOGGED_IN_USER",
          payload: res.data,
        })
      });
        toast.success("Successfully Submited. under the verification process..");
        setLoading(false);
        setSented(true);
        //window.location.href = '/dashboard/seller'
      } catch (err) {
        console.log(err);
        setLoading(false);
        setSented(true);
        if (err.response.status === 400) toast.error(err.response.data);
        window.location.href = '/dashboard/seller'
      }
  };

  return (
    <>
      <div className="container-fluid  p-5 text-center">
        <h1>Bank Detail</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <AccountForm
              handleSubmit={handleSubmit}
              ifsc={ifsc}
              setIfsc={setIfsc}
              account={account}
              setAccount={setAccount}
              confirmAccount={confirmAccount}
              setConfirmAccount={setConfirmAccount}
              name={name}
              setName={setName}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;