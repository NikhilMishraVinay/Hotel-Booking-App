import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getAccountBalance } from "../actions/account";

const { Meta } = Card;
const {Ribbon} = Badge;

const ConnectNav = () => {
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  useEffect(()=>{
    if(auth && auth.token) accountBalance()
  },[])
  
  const accountBalance = async() =>{
    try{
      const res = await getAccountBalance(auth.token);
      setBalance(res.data.balance);
    }catch(err){
      console.log(err);
    }
  } 

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller && (
          <>
            <Ribbon text="Balance" color="yellow">
              <Card className="bg-light">{balance}</Card>
            </Ribbon>
            <div>Payout settings</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
