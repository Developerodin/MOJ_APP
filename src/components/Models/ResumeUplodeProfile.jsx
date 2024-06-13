import React, { useContext, useEffect, useState } from "react";
import { CustomBtn1 } from "../Buttons/CustomBtn1";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { IonIcon, IonItem, IonLabel, IonModal, IonSpinner } from "@ionic/react";
import {
  chevronBack,
  chevronForward,
  chevronForwardOutline,
  cloudUploadOutline,
} from "ionicons/icons";
import { AppContext } from "../../Context/AppContext";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import up from "/assets/uplode.gif";
export const ResumeUplodeProfile = ({setUpdate}) => {
  const { showToast ,setProfileHealthUpdate,languageUpdate} = useContext(AppContext);
  const userDetails = JSON.parse(
    localStorage.getItem("userDetails") ||
      localStorage.getItem("userRegisterDetails")
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showgif,setShowGif] = useState(false);
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log("File  ==>", file);
    setSelectedFile(file);
    if(file){
      setShowModal(true);
    }
    
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleUpload = () => {
    console.log("Selected File ==>", selectedFile);
    // Logic to upload the file to the server
    // You can add your upload logic here
    // After uploading, you may want to close the modal or show a success message
    if(selectedFile){
      setShowGif(true);
      AddResume();
      setUpdate((prev)=>prev+1);
    }
   
    // setShowModal(false);
  };

  const AddResume = async () => {
    try {
      const url = `${Base_url}res_save/store`;
      const formData1 = new FormData();
      formData1.append("user_id", userDetails.user_id);
      formData1.append("resume", selectedFile);

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
       
        setShowGif(false);
        setShowModal(false);
        setProfileHealthUpdate((prev)=>prev+1)
        setUpdate(prev=>prev+1);
        showToast("success", "updated", "");
        return;
      }
      setUpdate((prev)=>prev+1);
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      setShowGif(false);
      showToast("error", "Try After Some Time", "");
    }
  };

  useEffect(()=>{
    setUpdate(prev=>prev+1)
  },[showModal])
  return (
    <>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="resumeInput"
      />

      <input
        id="resumeInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* <IonItem  button onClick={() => document.getElementById('resumeInput').click()} style={{marginTop:"10px",border:"1px solid red",width:"100%"}}>
                  <IonIcon icon={cloudUploadOutline} style={{color:`#395CFF`}} slot="start"></IonIcon>
                  <IonLabel style={{fontWeight:"bold"}}>Resume</IonLabel>
                  <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon>
                </IonItem> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomBtn1
          fun={() => document.getElementById("resumeInput").click()}
          title={ selectedLanguage === "English" ? "Upload" : "बायोडाटा अपडेट करें"}
        />
      </div>
      {/* <button
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '50px',
          width: '100%',
          height: '50px',
          color: 'black',
          fontSize: '17px',
          fontWeight: 'bold',
          marginTop: '20px',
          border: '1px solid black',
        }}
        onClick={() => document.getElementById('resumeInput').click()}
      >
        Resume
      </button> */}

      <IonModal isOpen={showModal} >
        <div style={{ padding: "20px" }}>
          <span style={{ fontSize: "22px" }}>

          { selectedLanguage === "English" ? "Selected Resume:" : "चयनित बायोडाटा:"}
          </span>
          {selectedFile && (
            <div style={{ marginTop: "20px" }}>
              <div>
                <span>{selectedFile.name}</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span>Size: {selectedFile.size} bytes</span>
              </div>

              {/* Display other relevant information about the file */}
              <hr />

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >

                {
                   showgif ?
                  <div >

                    <img src={up} />
                    
                     </div>
                     :
                     <>
                         <div
                  style={{
                    width: "100%",
                    height: "400px",
                    overflow: "auto",
                    border: "1px solid #E4E4E4",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <Document
                    file={selectedFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} width={370} height={300} />
                  </Document>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={goToPreviousPage}
                      disabled={pageNumber === 1}
                    >
                      <IonIcon
                        style={{ fontSize: "22px" }}
                        icon={chevronBack}
                      />
                    </button>
                    <div>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginLeft: "10px",
                          marginRight: "10px",
                        }}
                      >
                        {pageNumber} of {numPages}
                      </span>
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={pageNumber === numPages}
                    >
                      <IonIcon
                        style={{ fontSize: "22px" }}
                        icon={chevronForward}
                      />
                    </button>
                  </div>
                </div>

                     </>
                  
                }
                

               
              </div>
              {/* <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p> */}
            </div>
          )}

          <div>
            <div
              style={{
                width: "100%",
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CustomBtn1 fun={handleUpload} title={ selectedLanguage === "English" ? "Update Resume" : "बायोडाटा अपडेट करें"} />

              <div style={{ marginTop: "20px" }}></div>
              <CustomBtn1 fun={() => setShowModal(false)} title={ selectedLanguage === "English" ? "Close" : "बंद करना"} />
            </div>
          </div>
        </div>
      </IonModal>
    </>
  );
};
