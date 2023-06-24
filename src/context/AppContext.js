import { createContext, useContext, useReducer } from "react";


const AppContext = createContext()
const defaultValue = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')):{
    user:null,
    cPage:'/'
}

const reducer = (state,action) =>{
    if(action.type === "REGISTER"){
        localStorage.setItem('state',JSON.stringify({...state,user:action.payload}))
        return {...state,user:action.payload}
    }
    else if (action.type === "LOGIN"){
        // if (action.admin){
        //     localStorage.setItem('state',JSON.stringify({...state,user:action.payload,admin:true}))
        //     return {...state,user:action.payload,admin:true}
        // }
        localStorage.setItem('state',JSON.stringify({...state,user:action.payload}))

        return {...state,user:action.payload}
    }
    else if(action.type === 'LOGOUT'){
        localStorage.removeItem('state')
        return {...state,user:null,admin:false}
    }
    else if(action.type === 'PAGE'){
        return {...state,cPage:action.payload}
    }
}

export default function GlobalAppContext ({children}){
    const [state,dispatch] = useReducer(reducer,defaultValue)
    return<AppContext.Provider value={{...state,dispatch}}>
        {children}
    </AppContext.Provider>
}


export const useAppContext = () => {
    const context = useContext(AppContext);
    return context
}