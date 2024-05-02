import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,

  IonLabel,
  useIonRouter,
  IonModal,
} from "@ionic/react";
import { arrowBack, chevronBack, chevronBackOutline, chevronForward } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { ResumeModel } from "../../components/Models/ResumeModel";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const Personalinfo = ({handelContinue,setActiveTab}) => {
  const history = useIonRouter()
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);


  function goToPreviousPage() {
    setPageNumber(prevPageNumber => (prevPageNumber === 1 ? prevPageNumber : prevPageNumber - 1));
  }

  function goToNextPage() {
    setPageNumber(prevPageNumber => (prevPageNumber === numPages ? prevPageNumber : prevPageNumber + 1));
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setShowModal(true);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleUpload = () => {
    // Logic to upload the file to the server
    // You can add your upload logic here
    // After uploading, you may want to close the modal or show a success message
    setShowModal(false);
  };
  const handelBtnClick= ()=>{
    // localStorage.setItem("Auth",true);
    history.push("/phone",'replace');

    // window.location.reload();
    // handelContinue("/home")
  }
 

  const handelButtonSelected = (value) =>{
        history.push(value)
                  
  }
 
  const handelSkipClick =()=>{
    setActiveTab("PersonalDetails")
    history.push("/phone",'replace');
  }

 
  return (
   
        <div>
        <div >
       
          <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Tell us a bit about yourself
          </h1>
          <div style={{ marginTop:'30px', width: "100%", height: "50px" }}>
              <button
              onClick={()=>{handelButtonSelected("/edu")}}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  border: "1px solid black"
                }}
              >
                Education
              </button>
              <button
              onClick={()=>{handelButtonSelected("/job-pref")}}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  border: "1px solid black",
                }}
              >
                Job Preference
              </button>
              <button
              onClick={()=>{handelButtonSelected("/work")}}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  border: "1px solid black",
                }}
              >
                Work Experience
              </button>

              <button
              onClick={()=>{handelButtonSelected("/profile-resume")}}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  border: "1px solid black",
                }}
              >
                Resume
              </button>
              <div>
 

         {/* <ResumeModel /> */}
 
    </div>
            </div>

          
          
        </div>
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <CustomBtn1 fun={handelBtnClick} title={"Finish"} />
          <div onClick={handelSkipClick} style={{marginTop:"20px"}}>
    <span style={{color:"black",fontSize:"16px",fontWeight:"bold"}}>Skip</span>
</div>
      
        </div>

        </div>

  );
};

export default Personalinfo;
