import { IonButton, IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { isMobile } from '../../../IsMobile/IsMobile'
import { bookmarkOutline, chatbubbleEllipsesOutline, chatbubbleOutline, chevronBackOutline } from 'ionicons/icons'
import book from "/assets/Ellipse1.png";
import { useParams } from 'react-router';
import { Base_url } from '../../../Config/BaseUrl';
import axios from 'axios';
export const CandidateView = () => {
    const history = useIonRouter();

    const {id} = useParams();
    const [ApplicantsData,setApplicantsData] = useState(null);

    const getApplicantsData = async (id) => {
      try {
        const url = `${Base_url}job_apply/Byid_user/${id}`;
        const formData1 = new FormData();
        // formData1.append('user_id', userDetails.user_id);
        // formData1.append('resume', selectedFile);
  
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
         
          // setApplicantsData(data)
          return;
        }
        // showToast("error", "Try After Some Time", "");
      } catch (error) {
        console.error("Error:", error);
        // showToast("error", "Try After Some Time", "");
      }
    };
  
    useEffect(()=>{
    if(id){
      getApplicantsData(id)
    }
    },[id])
    const handelBackClick= ()=>{
      history.goBack();
        console.log("Back Presss")
    }

  return (
    <IonPage>
        <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}> 
        <div style={{marginTop:"20px"}}>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"28px"}}></IonIcon>
        </div>
               <div style={{marginTop:"30px"}}>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>Candidates Applied</span>
               </div>


               <div>

               <div style={{marginTop:"30px"}}>
            
    
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div >
            <img src={book} style={{width:"50px",height:"50px",borderRadius:"100px"}} />
            </div>
            <div style={{textAlign:"center"}}>
            <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>Dayal Jat</span><br/>
            <span style={{color:"grey",fontSize:"12px"}}>3 days ago</span>
            </div>

            <div>
            <IonIcon  icon={bookmarkOutline} style={{fontSize:"26px",marginRight:"10px"}} />
            </div>
             
            </div>
    
            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Department</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Front Office Executive</span>
                </div>

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Receptionist</span>
                </div>

               


                <div style={{padding:"5px"}}>
                    <span style={{fontSize:"13px",color:"#0054e9"}}>+4</span>
                </div>
              </div>
             
            </div>
    
            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>City</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
               

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Rajkot</span>
                </div>

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Jaipur</span>
                </div>

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Ajmer</span>
                </div>

              </div>
             
            </div>

            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              
                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Experienced</span>
                </div>

                
              </div>
             
            </div>

            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Education</span>
              </div>
              <div style={{marginTop:"10px"}}>
              <span style={{fontSize:"13px",fontWeight:"bold"}}>Saint University</span>
              </div>

              <div style={{marginTop:"10px"}}>
              <span style={{fontSize:"13px",color:"grey"}}>Jaipur (Raj.)</span>
              </div>

              <div style={{marginTop:"10px"}}>
              <span style={{fontSize:"13px",fontWeight:"bold",color:"black"}}>Bachelors in Hotel Management 2020-2030</span>
              </div>
             
            </div>

            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Work experience</span>
              </div>

              <div>
              <div style={{marginTop:"10px"}}>
              <span style={{fontSize:"13px",fontWeight:"bold",color:"grey"}}>Front office manager</span>
              </div>

              <div style={{marginTop:"10px"}}>
              <span style={{fontSize:"13px",color:"grey"}}>Hotel King's palace ,Jaipur</span>
              </div>

              <div style={{marginTop:"5px"}}>
              <span style={{fontSize:"14px",color:"grey"}}>Full Time  Jan 2023 - Mar 2024 (1 year) </span>
              </div>
              </div>

              <div style={{marginTop:"20px"}}>
              <div style={{marginTop:"10px"}}>
              <span style={{fontSize:"13px",fontWeight:"bold",color:"grey"}}>Front office manager</span>
              </div>

              <div style={{marginTop:"10px"}}>
              <span style={{fontSize:"13px",color:"grey"}}>Hotel King's palace ,Jaipur</span>
              </div>

              <div style={{marginTop:"5px"}}>
              <span style={{fontSize:"14px",color:"grey"}}>Full Time  Jan 2023 - Mar 2024 (1 year) </span>
              </div>
              </div>
            
             
            </div>

            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px"}}>
                <div>
                    <IonIcon style={{fontSize:"25px",color:"grey"}} icon={chatbubbleEllipsesOutline}></IonIcon>
                </div>
                <div style={{marginLeft:"20px"}}>
                    <span style={{fontSize:"18px",color:"grey"}}>Connect with the candidate</span>
                </div>
            </div>


            <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"10px"}}>
               
               <IonButton style={{width:"200px"}}  shape="round" >Accept</IonButton>
               <IonButton style={{width:"200px"}} shape="round" color={"danger"}  fill="outline">Reject</IonButton>

            </div>
          </div>
               </div>

               


               
           </div>
        </IonContent>
    </IonPage>
  )
}
