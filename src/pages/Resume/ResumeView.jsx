import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { ProfileHeaders } from '../../components/Headers/ProfileHeaders'
import { chevronBack, chevronForward, cloudUploadOutline, personOutline, settingsOutline } from 'ionicons/icons'
import { ResumeUplodeProfile } from '../../components/Models/ResumeUplodeProfile'
import { AppContext } from '../../Context/AppContext'
import { Base_url } from '../../Config/BaseUrl'
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import axios from 'axios'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const ResumeView = () => {
  const { showToast,profileHealthUpdate,setProfileHealthUpdate,languageUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails" )|| localStorage.getItem("userRegisterDetails"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [resumeUrl,setResumeUrl] = useState(null);
  const [update,setUpdate] = useState(0)

  const [showModal, setShowModal] = useState(false);
 
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  useEffect(() => {
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);
  function goToPreviousPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber === 1 ? prevPageNumber : prevPageNumber - 1
    );
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber === numPages ? prevPageNumber : prevPageNumber + 1
    );
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const getResume = async () => {
    try {
      const url = `${Base_url}res_saved/Byuserid/${userDetails.user_id}`;
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
             const Resume = data.resume;
             setResumeUrl(Resume.resume)
             setSelectedFile(Resume.resume)
              return
            
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const openPDFInNewTab = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  };

  useEffect(()=>{
    console.log("Calling update",update)
    getResume();
  },[update,profileHealthUpdate]);
  const fileObject = { url: 'https://dashboard.masterofjobs.in/writable/uploads/27-resume/1714633073_f3e413dd32aef5679dde.pdf' };
  return (
    <IonPage>
        <IonContent>
          <div style={{padding:"20px"}}>
          <ProfileHeaders icon={<IonIcon icon={cloudUploadOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={ selectedLanguage === "English" ? "Resume" : "बायोडाटा"}  />
           
         {
          resumeUrl ?
           <div style={{marginTop:"30px",border:"1px solid grey",borderRadius:"10px",padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             
             <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <IonIcon icon={personOutline} style={{marginRight:"10px"}}/>
             {userDetails.name}.resume
               </div>

               <div onClick={openPDFInNewTab}>
                <span style={{fontWeight:"bold",color:"#3351CC"}}>
                  
                  { selectedLanguage === "English" ? "view" : "देखना"}
                  </span>
                 </div>
            
             </div>
          :
          <div style={{marginTop:"30px"}}>

            <span>
            { selectedLanguage === "English" ? "No Resume added" : "कोई बायोडाटा नहीं जोड़ा गया"}
            </span>
           </div>
         }  

        
             



          <div style={{width:"100%",position:"absolute",bottom:10,left:"50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <ResumeUplodeProfile  setUpdate={setUpdate}  />
                </div>
          </div>
        </IonContent>
    </IonPage>
  )
}
