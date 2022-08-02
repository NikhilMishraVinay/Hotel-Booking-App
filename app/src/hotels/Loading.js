import { LoadingOutlined} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAccountStatus } from '../actions/account'
import {updateUserInLocalStorage} from '../actions/auth'


const Loading = ({history}) => {
  const {auth} = useSelector((state)=>({...state}));
  const dispatch = useDispatch();

  useEffect(()=>{
    if(auth && auth.token) accountStatus();

  },[auth])

  const accountStatus = async() =>{
    try{
      const res = await getAccountStatus(auth.token);
      console.log("USER ACCOUNT STATUS  ",res);
      //update user in local storage
      updateUserInLocalStorage(res.data, ()=>{
        //redux update
        dispatch({
          type:"LOGGED_IN_USER",
          payload: res.data,
        })
      });
      //redirect to dashboard
      //window.location.href = '/dashboard/seller'
    }catch(err){
      console.log(err);
    }
  } 

  return (
    <>
    <div className=' d-flex justify-content-center p-5 m-5 text-center'>
          <h3>Account Verification is under processing...</h3>
    </div>
    <div className='d-flex justify-content-center p-5 m-5'>
      <LoadingOutlined className='display-1 p-5 text-danger m-7' />
      
    </div>
    </>
  )
}

export default Loading
