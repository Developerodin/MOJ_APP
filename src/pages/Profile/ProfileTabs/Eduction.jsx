


import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonItem,
  IonCheckbox,
  useIonRouter,
} from "@ionic/react";
import { addOutline, arrowBack, bookOutline, createOutline, trash } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import EducationModel from "../../../components/Models/EducationModel";
import { EducationCard } from "../../../components/Cards/EducationCard/EducationCard";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";
import { Base_url } from "../../../Config/BaseUrl";



export const ProfileEduction = () => {
  const history = useIonRouter()
  const { showToast,editUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const token =localStorage.getItem("token");
   const [update,setUpdate] =  useState(0)
  const [educationData,setEducationData] = useState(null)

  const [showDoctorateField, setshowDoctorateField] = useState(false);
  const [isDoctorateChecked, setisDoctorateChecked] = useState(false);

  const [showPostGField, setshowPostGField] = useState(false);
  const [isPostGChecked, setisPostGChecked] = useState(false);

  const [showGraduationField, setshowGraduationField] = useState(false);
  const [isGraduationChecked, setisGraduationChecked] = useState(false);

  const [showHigherSecondaryField, setshowHigherSecondaryField] = useState(false);
  const [isHigherSecondaryChecked, setisHigherSecondaryChecked] = useState(false);

  const [showSchoolField, setshowSchoolField] = useState(false);
  const [isSchoolChecked, setisSchoolChecked] = useState(false);

  const [showHdegreeField, setshowHdegreeField] = useState(false);
  const [isHdegreeChecked, setisHdegreeChecked] = useState(false);

  const handleDoctorateCheckboxChange = (event) => {
    setisDoctorateChecked(event.detail.checked);
    setshowDoctorateField(event.detail.checked);
  };

  const handlePostGCheckboxChange = (event) => {
    setisPostGChecked(event.detail.checked);
    setshowPostGField(event.detail.checked);
  };

  const handleGraduationCheckboxChange = (event) => {
    setisGraduationChecked(event.detail.checked);
    setshowGraduationField(event.detail.checked);
  };

  const handleHigherSecondaryCheckboxChange = (event) => {
    setisHigherSecondaryChecked(event.detail.checked);
    setshowHigherSecondaryField(event.detail.checked);
  };

  const handleSchoolCheckboxChange = (event) => {
    setisSchoolChecked(event.detail.checked);
    setshowSchoolField(event.detail.checked);
  };

  const handleHdegreeCheckboxChange = (event) => {
    setisHdegreeChecked(event.detail.checked);
    setshowHdegreeField(event.detail.checked);
  };
  

   
    const getUserEduaction = async () => {
      try {
        const url = `${Base_url}user_education/By_userId/${userDetails.user_id}`;
        
      
  
        const response = await axios.get(url,{
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
       
          }
        });
        const data = response.data
            // console.log("Response check work experience data",data,response)
            
              if(data){
                console.log("Education data",data.data)
                setEducationData(data.data);
              }
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        // showToast("error", "Try After Some Time", "");
      }
    };

    const UserWorkEducationDelete = async (id) => {
      try {
        const url = `${Base_url}user_education/delete/${id}`;
        
         const formData = new FormData();
  
        const response = await axios.post(url,formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
       
          }
        });
        const data = response.data
            // console.log("Response check work experience data",data,response)
            
              if(data.status === "success"){
                console.log("work experience delete",data.data)
                setUpdate((pre)=>pre+1)
              }
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        // showToast("error", "Try After Some Time", "");
      }
    };

    const handelSubmit=()=>{
      history.goBack()
    }

    useEffect(()=>{
      getUserEduaction()
    },[update,editUpdate])
    
    return (
      <IonPage>
        <IonContent>
 
           <div style={{padding:"20px"}}>
           <ProfileHeaders icon={<IonIcon icon={bookOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Education"}  />
           <div style={{marginTop:"10px"}}>
            <span>Please fill in your highest educaion details</span>
           </div>

           <div style={{marginTop:"60px"}}>
              
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <div>
            <span style={{fontSize:"16px"}}>10th pass</span>
           </div>
           <div>
           <IonCheckbox slot="end" checked={isSchoolChecked} onIonChange={handleSchoolCheckboxChange} />
           </div>
          
        </div>
  
        {showSchoolField && (
          <>
            <div lines="none">
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              School name
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
            <div>
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Year
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
          </>
        )}
  
              </div>


              <div style={{marginTop:"30px"}}>
              
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <div>
            <span style={{fontSize:"16px"}}>12th pass</span>
           </div>
           <div>
           <IonCheckbox slot="end" checked={isHigherSecondaryChecked} onIonChange={handleHigherSecondaryCheckboxChange} />
           </div>
          
        </div>
  
        {showHigherSecondaryField && (
          <>
            <div lines="none">
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              School name
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
            <div>
        
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Year
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
          </>
        )}
  
              </div>

              <div style={{marginTop:"30px"}}>
              
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <div>
            <span style={{fontSize:"16px"}}>Graduation / diploma</span>
           </div>
           <div>
           <IonCheckbox slot="end" checked={isGraduationChecked} onIonChange={handleGraduationCheckboxChange} />
           </div>
          
        </div>
  
        {showGraduationField && (
          <>
            <div lines="none">
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Collage name
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
            <div>
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Degree
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="degree"
            
             
            />
          </div>
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Year
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
          </>
        )}
  
              </div>

              <div style={{marginTop:"30px"}}>
              
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <div>
            <span style={{fontSize:"16px"}}>Post graduation</span>
           </div>
           <div>
           <IonCheckbox slot="end" checked={isPostGChecked} onIonChange={handlePostGCheckboxChange} />
           </div>
          
        </div>
  
        {showPostGField && (
          <>
            <div lines="none">
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Collage name
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
            <div>
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Degree
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="degree"
            
             
            />
          </div>
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Year
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
          </>
        )}
  
              </div>

           
            <div style={{marginTop:"30px"}}>
              
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
         <div>
          <span style={{fontSize:"16px"}}>Doctorate</span>
         </div>
         <div>
         <IonCheckbox slot="end" checked={isDoctorateChecked} onIonChange={handleDoctorateCheckboxChange} />
         </div>
        
      </div>

      {showDoctorateField && (
        <>
          <div lines="none">
          <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Collage name
          </label>
          {/* <IonItem> */}
          <input
          className="round-input"
            type="text"
            name="email"
          
           
          />
        </div>
          
          </div>
          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Degree
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="degree"
            
             
            />
          </div>
          <div>
          <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Year
          </label>
          {/* <IonItem> */}
          <input
          className="round-input"
            type="text"
            name="email"
          
           
          />
        </div>
          
          </div>
        </>
      )}

            </div>


          



             


            


              

              <div style={{marginTop:"30px",marginBottom:"90px"}}>
              
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <div>
            <span style={{fontSize:"16px"}}>Do you have hotel management degree</span>
           </div>
           <div>
           <IonCheckbox slot="end" checked={isHdegreeChecked} onIonChange={handleHdegreeCheckboxChange} />
           </div>
          
        </div>
  
        {showHdegreeField && (
          <>
            <div lines="none">
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Collage name
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
            <div>
            <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Year
            </label>
            {/* <IonItem> */}
            <input
            className="round-input"
              type="text"
              name="email"
            
             
            />
          </div>
            
            </div>
          </>
        )}
  
              </div>


              <div style={{background:"#fff",padding:"10px",width:"100%",position:"fixed",bottom:0,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handelSubmit} title={"Submit"}/>

        </div>
      
           </div>

         
        </IonContent>
      </IonPage>
    );
}








// export const ProfileEduction = () => {
//   const history = useHistory()
//   const { showToast,editUpdate } = useContext(AppContext);
//   const userDetails = JSON.parse(localStorage.getItem("userDetails"));
// const token =localStorage.getItem("token");
// const [update,setUpdate] =  useState(0)
//     const [educationData,setEducationData] = useState(null)

//     const handelBackClick = ()=>{
//       history.goBack()
//     }
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleOpenModal = () => {
//       setIsModalOpen(true);
//     };
  
//     const handleCloseModal = () => {
//       setIsModalOpen(false);
//     };
//     const handelSaveClick= ()=>{
//     //   history.push("/home")
//     }

//     const getUserEduaction = async () => {
//       try {
//         const url = `${Base_url}user_education/By_userId/${userDetails.user_id}`;
        
      
  
//         const response = await axios.get(url,{
//           headers: {
//             "Content-Type": "multipart/form-data",
//             // "Authorization" :`Berear ${token}`,
       
//           }
//         });
//         const data = response.data
//             // console.log("Response check work experience data",data,response)
            
//               if(data){
//                 console.log("Education data",data.data)
//                 setEducationData(data.data);
//               }
  
              
           
            
//       } catch (error) {
//         console.error('Error:', error);
//         // showToast("error", "Try After Some Time", "");
//       }
//     };

//     const UserWorkEducationDelete = async (id) => {
//       try {
//         const url = `${Base_url}user_education/delete/${id}`;
        
//          const formData = new FormData();
  
//         const response = await axios.post(url,formData,{
//           headers: {
//             "Content-Type": "multipart/form-data",
//             // "Authorization" :`Berear ${token}`,
       
//           }
//         });
//         const data = response.data
//             // console.log("Response check work experience data",data,response)
            
//               if(data.status === "success"){
//                 console.log("work experience delete",data.data)
//                 setUpdate((pre)=>pre+1)
//               }
  
              
           
            
//       } catch (error) {
//         console.error('Error:', error);
//         // showToast("error", "Try After Some Time", "");
//       }
//     };

//     useEffect(()=>{
//       getUserEduaction()
//     },[update,editUpdate])
    
//     return (
//       <IonPage>
//         <IonContent>
 
//           <div style={{ padding: "20px" }}>

//                <ProfileHeaders icon={<IonIcon icon={bookOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Education"}  />

          
//                <div style={{padding:"5px"}}>


// {
// educationData ? educationData && educationData.map((el,index)=>{
//     return  <div key={index} style={{marginTop:"30px"}} >
//     <EducationCard  data={el} UserWorkEducationDelete={UserWorkEducationDelete}/>
//    </div>
//   })
//   :
//   <div style={{marginTop:"30px"}}>

//   <span>No Education Records Available</span>
//  </div>
// }








// </div>

// <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

// <CustomBtn1 fun={handleOpenModal} title={"Add"}/>

//          </div>




//              <EducationModel isOpen={isModalOpen} onClose={handleCloseModal} setUpdate={setUpdate} />
           
//           </div>
//         </IonContent>
//       </IonPage>
//     );
// }



