import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import { alertCircleOutline, chevronBackOutline, colorFill } from 'ionicons/icons'
import React, { useContext, useState } from 'react'
import pic from "./Ellipse 1.png"
import { CustomBtn1 } from '../../../components/Buttons/CustomBtn1'
import { useHistory } from 'react-router'
import { Camera, CameraResultType,CameraSource } from "@capacitor/camera";
import axios from 'axios'
import { AppContext } from '../../../Context/AppContext'
import { Base_url } from '../../../Config/BaseUrl'
export const UpdateProfilePhoto = () => {
  const { showToast ,setEditUpdate} = useContext(AppContext);
  const [picture, setPicture] = useState();
 const history = useIonRouter()
 const userDetails = JSON.parse(localStorage.getItem("userDetails" )|| localStorage.getItem("userRegisterDetails"));
    const handelSaveClick = ()=>{
      setEditUpdate((prev)=>prev+1)
      history.goBack();
    }

    const handelBackClick= ()=>{
      history.goBack();
        console.log("Back Presss")
    }

    
    function drawImageScaled(img, ctx) {
      var canvas = ctx.canvas;
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.max(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }
  
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        preserveAspectRatio: true,
        width: 300,
        height: 300,
        correctOrientation: true,
      });
  
      var imageUrl = image.webPath;
      document.getElementById("dp-img").src = imageUrl;
      console.log(imageUrl);
       localStorage.setItem("dp-img", imageUrl);
      //  setPicture(imageUrl);
      const imgobj = new Image();
      imgobj.style.width = "100px";
      imgobj.style.height = "auto";
      imgobj.src = imageUrl;
      imgobj.onload = () => {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        drawImageScaled(imgobj, ctx);
        // ctx.drawImage(imgobj, 0, 0, 500, 500);
        console.log(c.toDataURL());
        const formData = new FormData();
        formData.append("dp", c.toDataURL());
       
      };
      /////////
    };

    const takePicture2 = async () => {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        preserveAspectRatio: true,
        width: 300,
        height: 300,
        correctOrientation: true,
      });
  
      var imageUrl = image.webPath;
      document.getElementById("dp-img").src = imageUrl;
      localStorage.setItem("dp-img", imageUrl);
      // setPicture(imageUrl);
      console.log(imageUrl);
  
      const imgobj = new Image();
      imgobj.style.width = "100px";
      imgobj.style.height = "auto";
      imgobj.src = imageUrl;
      imgobj.onload = () => {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        drawImageScaled(imgobj, ctx);
        // ctx.drawImage(imgobj, 0, 0, 500, 500);
        console.log(c.toDataURL());
        const formData = new FormData();
        formData.append("dp", c.toDataURL());
       
      };
      /////////
    };

  return (
          <IonPage>
            <IonContent>
                <div style={{padding:"20px"}}>
                <div>
            <IonIcon onClick={handelBackClick}  icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>

           <div style={{marginTop:"20px"}}>

            <span style={{fontSize:"30px",fontWeight:"bold"}}>Update your profile photo</span>
           </div>


           <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>
             <img  alt="User DP"
        src={picture || pic}
        data-src={pic}
        width={150}
        height={150}
         style={{borderRadius:"80px"}}
        
        id="dp-img" />

           </div>

           <div style={{marginTop:"30px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           <div onClick={takePicture}  style={{padding:"20px",border:"1px solid black",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"30px"}}>
    <span style={{fontWeight:"bold"}}>Take photo</span>
 </div>

 <div onClick={takePicture2} style={{marginTop:"20px",padding:"20px",border:"1px solid black",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"30px"}}>
    <span style={{fontWeight:"bold"}}>Uplode from photos</span>
 </div>
           </div>

           <div style={{marginTop:"30px",display:"flex",justifyContent:"left",alignItems:"center"}}>
              <IonIcon  icon={alertCircleOutline} style={{fontSize:"30px",color:"grey"}}/>
           <span style={{fontSize:"14px",color:"#575757",marginLeft:"14px"}}>People with a profile photo have higher chances of getting hired.</span>
           
           </div>

           <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handelSaveClick} title={"save"}/>
<div style={{marginTop:"20px"}}>
    <span style={{color:"crimson",fontSize:"16px",fontWeight:"bold"}}>Remove photo</span>
</div>
         </div>

                </div>


            </IonContent>
          </IonPage>
  )
}
