import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import { alertCircleOutline, chevronBackOutline, colorFill } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import pic from "./Ellipse 1.png"

import { useHistory } from 'react-router'
import { CustomBtn1 } from '../../components/Buttons/CustomBtn1'
import { Camera, CameraResultType,CameraSource } from "@capacitor/camera";
import { AppContext } from '../../Context/AppContext'
import { Base_url } from '../../Config/BaseUrl'
import axios from 'axios'
import { isMobile } from '../../IsMobile/IsMobile'
export const UplodeProfilePhoto = ({handelContinue}) => {
  const { showToast ,setEditUpdate} = useContext(AppContext);
  const [picture, setPicture] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [ImgUrl,setImgUrl] = useState("");
  const [update,setUpdate] = useState(0);
 const history = useIonRouter()
 const userDetails = JSON.parse(localStorage.getItem("userDetails" )|| localStorage.getItem("userRegisterDetails"));
    const handelSaveClick = ()=>{
      if(selectedFile){
        AddProfilePhoto();
        setEditUpdate((prev)=>prev+1);
        handelContinue("Details")
        return;
      }
      
      showToast("error", "select a image", "");
      // history.goBack();
    }

    const handelBackClick= ()=>{
      history.goBack();
        console.log("Back Presss")
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0];

      console.log(" Input File  ==>", file);
      if (file) {
        // Check if the file type is an image
        if (file.type.startsWith('image/')) {
          console.log("File  ==>", file);
          setSelectedFile(file);
          
    
          // Read the file and display it in the img tag
          const imageUrl = URL.createObjectURL(file);
          setImgUrl(imageUrl);
        } else {
          // If the selected file is not an image, you can show an error message or take appropriate action
          console.log("Please select an image file.");
        }
     
     
      
    };

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

      console.log(" Camera File  ==>", image);
      axios.get(image.webPath, { responseType: 'blob' })
    .then(response => {
        // Create a File object
        const file = new File([response.data], `image.${image.format}`, { type: `image/${image.format}` });

        // Now you have a File object similar to the one you get from selecting a file
        console.log("Camera file in file formate ==>",file);
        if (file.type.startsWith('image/')) {
          console.log("File  ==>", file);
          setSelectedFile(file);
          
    
          // Read the file and display it in the img tag
          const imageUrl = URL.createObjectURL(file);
          setImgUrl(imageUrl);
        }
        
    })
    .catch(error => {
        console.error('Error fetching camera file:', error);
    });
    
    };

 

    const AddProfilePhoto = async () => {
      try {
        const url = `${Base_url}profile_img_save/store`;
        const formData1 = new FormData();
        formData1.append("user_id", userDetails.user_id);
        formData1.append("profile_img", selectedFile);
  
        const response = await axios.post(url, formData1, {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
          },
        });
        const data = response.data;
        console.log("Response check work experience", data, response);
  
        // if(data === "otp in valid"){
        //   showToast("error", "wrong otp", "");
        //   return;
        // }
  
        if (data.status === "success") {
          //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
          showToast("success", "updated", "");
          setUpdate((prev)=>prev+1);
          setEditUpdate((prev)=>prev+1)
          return;
        }
      
        // showToast("error", "Try After Some Time", "");
      } catch (error) {
        console.error("Error:", error);
      
        showToast("error", "Try After Some Time", "");
      }
    };

    const getProfileImg = async () => {
      try {
        const url = `${Base_url}profile_img_saved/Byuserid/${userDetails.user_id}`;
        const formData1 = new FormData();
        // formData1.append('user_id', userDetails.user_id);
        // formData1.append('resume', selectedFile);
  
      
  
        const response = await axios.post(url,formData1,{
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
       
          }
        });
        const data = response.data
            console.log("Response check work experience",data,response)
            
              // if(data === "otp in valid"){
              //   showToast("error", "wrong otp", "");
              //   return;
              // }
  
            if(data.status === "success"){
                //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
                // setUpdate((prev)=>prev+1);
               const Data = data.img;
               setImgUrl(Data.image_path)
             
                return
              
            }
            // showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        // showToast("error", "Try After Some Time", "");
      }
    };

  


    useEffect(()=>{
      console.log("Calling use effet ==>",)
      getProfileImg()
    },[update])

  return (
        
    <div>
    <div>
        <div style={{display:`${isMobile ? "block" : "flex"}`,justifyContent:"center",alignItems:"center",flexDirection:"column"}} >
     

   <div style={{marginTop:"20px"}}>

    <span style={{fontSize:"30px",fontWeight:"bold"}}>Update your profile photo</span>
   </div>


   <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>
     <img  alt="User DP"
src={ImgUrl ||picture}
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

<div>
<input
type="file"
accept="image/"
onChange={handleFileChange}
style={{ display: "none" }}
id="ImgInput"
/>

<input
id="ImgInput"
type="file"
style={{ display: "none" }}
onChange={handleFileChange}
/>


{/* <div
style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}}
>
<CustomBtn1
  fun={() => document.getElementById("resumeInput").click()}
  title={"Uplode"}
/>
</div> */}

</div>


<div onClick={() => document.getElementById("ImgInput").click()} style={{marginTop:"20px",padding:"20px",border:"1px solid black",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"30px"}}>
<span style={{fontWeight:"bold"}}>Uplode from photos</span>
</div>
   </div>

   <div style={{marginTop:"30px",display:"flex",justifyContent:"left",alignItems:"center"}}>
      <IonIcon  icon={alertCircleOutline} style={{fontSize:"30px",color:"grey"}}/>
   <span style={{fontSize:"14px",color:"#575757",marginLeft:"14px"}}>People with a profile photo have higher chances of getting hired.</span>
   
   </div>

   <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handelSaveClick} title={"save"}/>
<div style={{marginTop:"20px"}}>
<span onClick={()=>handelContinue("Details")} style={{fontSize:"16px",fontWeight:"bold"}}>skip</span>
</div>
 </div>

        </div>


    </div>
  </div>


          
  )
}
