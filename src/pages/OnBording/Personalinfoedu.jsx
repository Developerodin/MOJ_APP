import React, { useContext, useEffect, useState } from "react";
import { IonPage, IonContent, IonLabel, IonIcon, IonButton, useIonRouter, IonCheckbox } from "@ionic/react";
import { addOutline, bookOutline, calendarOutline, chevronBackOutline } from 'ionicons/icons';
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { EducationCard } from "../../components/Cards/EducationCard/EducationCard";
import EducationModel from "../../components/Models/EducationModel";
import { AppContext } from "../../Context/AppContext";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { ProfileHeaders } from "../../components/Headers/ProfileHeaders";


const Personalinfoedu = () => {
  const history = useIonRouter()
  const { showToast,editUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || JSON.parse(localStorage.getItem("userRegisterDetails"));
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

  const [formDataTenth,setformDataTenth] = useState({
    schoolName:"",
    year:""
  })

  const [formDataTwelvth,setformDataTwelvth] = useState({
    schoolName:"",
    year:""
  })

  const [formDataGraduation,setformDataGraduation] = useState({
    collegeName:"",
    degree:"",
    year:"",
  })

  const [formDataPostGraduation,setformDataPostGraduation] = useState({
    collegeName:"",
    degree:"",
    year:"",
  })

  const [formDataDoctorate,setformDataDoctorate] = useState({
    collegeName:"",
    degree:"",
    year:"",
  })

  const [formDataHotelManagment,setformDataHotelManagment] = useState({
    collegeName:"",
    year:"",
  })

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
                
                const Data=data.data[0];
                console.log("Education data",Data)
                setformDataTenth({
                  schoolName:Data.ten_school,
                  year:Data.year
                });

                setformDataTwelvth({
                  schoolName:Data.to_th_school,
                  year:Data.to_th_year
                })

                setformDataGraduation({
                  collegeName:Data.gr_university,
                  degree:Data.gr_degree,
                  year:Data.gr_year,
                })

                setformDataPostGraduation({
                  collegeName:Data.pg_university,
                  degree:Data.pg_degree,
                  year:Data.pg_year,
                })

                setformDataDoctorate({
                  collegeName:Data.doc_university,
                  degree:Data.doc_degree,
                  year:Data.doc_year,
                })
                  
                setformDataHotelManagment({
                  collegeName:Data.h_college,
                  year:Data.h_year,
                })

                if(Data.ten_th === "true"){
                  setshowSchoolField(true)
                  setisSchoolChecked(true)
                }
               

                if(Data.to_th === "true"){
                  setisHigherSecondaryChecked(true)
                  setshowHigherSecondaryField(true)
                }


                if(Data.gra_dip === "true"){
                  setisGraduationChecked(true)
                  setshowGraduationField(true)
                }

                

                if(Data.post_gra === "true"){
                  setisPostGChecked(true)
                  setshowPostGField(true) 
                }

              if(Data.doc === "true"){
                setisDoctorateChecked(true)
                setshowDoctorateField(true)
              } 

                
               if(Data.hotel_de === "true"){
                setisHdegreeChecked(true)
                setshowHdegreeField(true)
               }
                

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

    const AddEducation = async () => {
      try {
        const url = `${Base_url}user_education/store`;
        const formData1 = new FormData();
        formData1.append('user_id', userDetails.user_id);

        formData1.append('ten_th', isSchoolChecked || false);
        formData1.append('ten_school', formDataTenth.schoolName || "");
        formData1.append('ten_year', formDataTenth.year|| "");

        formData1.append('to_th', isHigherSecondaryChecked || false);
        formData1.append('to_th_school', formDataTwelvth.schoolName || "");
        formData1.append('to_th_year', formDataTwelvth.year || "");

        formData1.append('gra_dip', isGraduationChecked || false);
        formData1.append('gr_degree', formDataGraduation.degree || "");
        formData1.append('gr_university', formDataGraduation.collegeName || "");
        formData1.append('gr_year', formDataGraduation.year || "");

        formData1.append('post_gra', isPostGChecked || false);
        formData1.append('pg_degree', formDataPostGraduation.degree || "");
        formData1.append('pg_university', formDataPostGraduation.collegeName || "");
        formData1.append('pg_year', formDataPostGraduation.year || "");

        formData1.append('doc', isDoctorateChecked || false);
        formData1.append('doc_degree', formDataDoctorate.degree || "");
        formData1.append('doc_university', formDataDoctorate.collegeName || "");
        formData1.append('doc_year', formDataDoctorate.year || "");
       
        formData1.append('hotel_de', isHdegreeChecked || false);
        formData1.append('h_college', formDataHotelManagment.collegeName || "");
        formData1.append('h_year', formDataHotelManagment.year || "");
        
      
  
        const response = await axios.post(url, formData1,{
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
                showToast("success", "Updated", "");
                history.goBack()
                return
            }
            // showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        showToast("error", "Try After Some Time", "");
      }
    };

    const handelSubmit=()=>{
         
      console.log("DAta==>",formDataTenth,formDataTwelvth,formDataGraduation,formDataPostGraduation,formDataDoctorate,formDataHotelManagment)
      AddEducation()
     
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
           
            value={formDataTenth.schoolName} 
            onChange={(e) => setformDataTenth({...formDataTenth, schoolName: e.target.value})}
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
            value={formDataTenth.year} 
            onChange={(e) => setformDataTenth({...formDataTenth, year: e.target.value})}
          
           
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
            value={formDataTwelvth.schoolName} 
            onChange={(e) => setformDataTwelvth({...formDataTwelvth, schoolName: e.target.value})}
          
           
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
            value={formDataTwelvth.year} 
            onChange={(e) => setformDataTwelvth({...formDataTwelvth, year: e.target.value})}
          
           
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
            value={formDataGraduation.collegeName} 
           onChange={(e) => setformDataGraduation({...formDataGraduation, collegeName: e.target.value})}
          
           
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
            value={formDataGraduation.degree} 
            onChange={(e) => setformDataGraduation({...formDataGraduation, degree: e.target.value})}
          
           
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
            value={formDataGraduation.year} 
           onChange={(e) => setformDataGraduation({...formDataGraduation, year: e.target.value})}
          
           
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
            value={formDataPostGraduation.collegeName} 
           onChange={(e) => setformDataPostGraduation({...formDataPostGraduation, collegeName: e.target.value})}
          
           
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
            value={formDataPostGraduation.degree} 
            onChange={(e) => setformDataPostGraduation({...formDataPostGraduation, degree: e.target.value})}
          
           
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
            value={formDataPostGraduation.year} 
           onChange={(e) => setformDataPostGraduation({...formDataPostGraduation, year: e.target.value})}
          
           
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
          value={formDataDoctorate.collegeName} 
           onChange={(e) => setformDataDoctorate({...formDataDoctorate, collegeName: e.target.value})}
        
         
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
            value={formDataDoctorate.degree} 
            onChange={(e) => setformDataDoctorate({...formDataDoctorate, degree: e.target.value})}
          
           
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
          value={formDataDoctorate.year} 
           onChange={(e) => setformDataDoctorate({...formDataDoctorate, year: e.target.value})}
        
         
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
            value={formDataHotelManagment.collegeName} 
           onChange={(e) => setformDataHotelManagment({...formDataHotelManagment, collegeName: e.target.value})}
          
           
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
            value={formDataHotelManagment.year} 
            onChange={(e) => setformDataHotelManagment({...formDataHotelManagment, year: e.target.value})}
          
           
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
};










// const Personalinfoedu = () => {
//   const history = useHistory()
//   const { showToast,editUpdate } = useContext(AppContext);
//   const userDetails = JSON.parse(localStorage.getItem("userRegisterDetails"));
// const token =localStorage.getItem("token");
// const [update,setUpdate] =  useState(0)
//     const [educationData,setEducationData] = useState([])

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
//         showToast("error", "Try After Some Time", "");
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
//         showToast("error", "Try After Some Time", "");
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


//                {
// educationData ? educationData && educationData.map((el,index)=>{
//     return  <div key={index} style={{marginTop:"30px"}} >
//     <EducationCard  data={el} UserWorkEducationDelete={UserWorkEducationDelete}/>
//    </div>
//   })
//   :
//   <div style={{marginTop:"30px"}}>

//   <span>Add  Education Records </span>
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
// };

export default Personalinfoedu;
