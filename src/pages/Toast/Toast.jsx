/* eslint-disable react/prop-types */
import { IonToast } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext';


const Toast = ({props}) => {
    const {toastStatus,setToastStatus}=useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(false);
    // {type,heading,msg,status:'show'};
    useEffect(()=>{
        console.log("I am Toast")
if(toastStatus.status==='show'){
    // console.log("I am Toast show======> ")
    setIsOpen(true)
}
else{
    // console.log("I am Toast in false ====>+")
    setIsOpen(false)
}
    },[toastStatus])
  return (
    <IonToast
          isOpen={isOpen}
          message={props.heading || ""}
          onDidDismiss={() => setIsOpen(false)}
          duration={5000}
          position='top'
          style={{height:"60px",fontSize:"17px",fontWeight:"bold",color:"#fff"}}
          color={props.type === 'error' ? 'danger' : 'success'}
        ></IonToast>
  )
}

export default Toast
