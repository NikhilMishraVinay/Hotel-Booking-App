//getting the user data and token stored in local storage
let userState;
if(window.localStorage.getItem('auth')){
  userState = JSON.parse(window.localStorage.getItem('auth'));
  //console.log(userState);
}else{
  userState = null;//{}
}


//2. create user reduser function to update the states
//each action attribute contain an object like {type:'LOGGED_IN_USER', payload: {name: 'nikhil', role:'Seller' } }

export const authReducer = (state = userState,action) => {
    switch(action.type){
      case "LOGGED_IN_USER":
        return {...state,...action.payload}
      case "LOGOUT":
        return action.payload
      default:
        return state;
    }
}

 