import React, { useState } from 'react'
import { CustomBtn1 } from '../Buttons/CustomBtn1'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { IonIcon, IonModal } from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export const ResumeModel = () => {
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
  return (
    <>
       <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="resumeInput"
      />
   
      <input
        id="resumeInput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
       <button
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
      </button>

      <IonModal isOpen={showModal}>
    <div style={{padding:"20px"}}>
      <span style={{fontSize:"22px"}}>Selected Resume:</span>
      {selectedFile && (
        <div style={{marginTop:"20px"}}>
          <div> 
          <span>{selectedFile.name}</span>
          </div>
          <div style={{marginTop:"10px"}}> 
          <span>Size: {selectedFile.size} bytes</span>
          </div>
         
         
          {/* Display other relevant information about the file */}
          <hr />
        
          <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
  <div style={{ width:"100%", height:'400px',overflow:"auto", border: '1px solid #E4E4E4',borderRadius:"10px", marginBottom: '20px' }}>
    <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} width={370} height={300} />
    </Document>
  </div>
  <div>
   <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
   <button onClick={goToPreviousPage} disabled={pageNumber === 1}>
    <IonIcon style={{fontSize:"22px"}} icon={chevronBack} />
    </button>
    <div>
    <span style={{fontSize:"16px",fontWeight:"bold",marginLeft:"10px",marginRight:"10px"}}>{pageNumber} of {numPages}</span>
       </div>
    
    <button onClick={goToNextPage} disabled={pageNumber === numPages}>
    <IonIcon style={{fontSize:"22px"}}  icon={chevronForward} />

    </button>
    </div>
    
    
  
  </div>
</div>
          {/* <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p> */}
        </div>
      )}

      <div>
      <div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handleUpload} title={"Update Resume"}/>

<div style={{marginTop:"20px"}}>

</div>
<CustomBtn1 fun={() => setShowModal(false)} title={"Close"}/>

</div>

      </div>
      
     
    </div>
   </IonModal>
    </>
   
  )
}
