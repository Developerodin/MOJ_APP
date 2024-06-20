import { IonButton, IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { isMobile } from '../../../IsMobile/IsMobile'
import { bookmarkOutline, chatbubbleEllipsesOutline, chatbubbleOutline, chevronBackOutline, personOutline } from 'ionicons/icons'
import book from "/assets/Ellipse1.png";
import { useLocation, useParams } from 'react-router';
import { Base_url } from '../../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';

export const CandidateView = () => {
    const history = useIonRouter();



    

    const {id,id2} = useParams();
    // const location = useLocation();
    // const { status } = location.state || null;
   const [update,setUpdate] = useState(0)
    const [ApplicantsData,setApplicantsData] = useState(null);
    const { showToast,CandidateJobStatus,setCandidateJobStatus} = useContext(AppContext);
    const [StatusValue,setStatusValue] = useState(status)
    const getApplicantsData = async (id) => {
      try {
        const url = `${Base_url}all_user_data/${id}`;
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
        console.log("Response check user DAta ", data, response);
  
        // if(data === "otp in valid"){
        //   showToast("error", "wrong otp", "");
        //   return;
        // }
  
        if (data.status === "success") {
           console.log("data of user  ==>",data.Job)
          setApplicantsData(data.Job[0])
          return;
        }
        // showToast("error", "Try After Some Time", "");
      } catch (error) {
        console.error("Error:", error);
        // showToast("error", "Try After Some Time", "");
      }
    };
    const navigateToChat = () => {
      const id = ApplicantsData.user_id;
      console.log("Navigating to chat with ID:", id); // Debugging log
      history.push(`/personal-chat/${id}`);
    };
    
    const ChangeStatus = async (value) => {
      try {
        console.log("In Cahnge status ==>",id2)
        
        
        const url = `${Base_url}job_apply/status_update/${id2}`;
        console.log("In Cahnge status 2==>")
        const formData1 = new FormData();
        formData1.append('status', value);
        
      
    
        const response = await axios.post(url, formData1,{
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
       
          }
        });
        const data1 = response.data
            console.log("Response check work experience",data1,response)
            
              // if(data === "otp in valid"){
              //   showToast("error", "wrong otp", "");
              //   return;
              // }
    
            if(data1.status === "success"){
                //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
                showToast("success", "updated", "");
                setCandidateJobStatus((prev)=>prev+1)
                return
            }
            showToast("error", "Try After Some Time", "");
    
              
           
            
      } catch (error) {
        console.error('Error:', error);
        showToast("error", "Try After Some Time", "");
      }
    };

  
    useEffect(()=>{
      console.log("DAta ==>",id,id2,status)
    if(id){
      getApplicantsData(id)
    }
    },[id,id2,CandidateJobStatus])
    
    const handelBackClick= ()=>{
      history.goBack();
        console.log("Back Presss")
    }

    const openPDFInNewTab = () => {
      
      if (ApplicantsData && ApplicantsData.resume) {
        window.open(ApplicantsData.resume, '_blank');
      }
    };

    useEffect(() => {
      const storedStatus = localStorage.getItem('candidateStatus');
      if (storedStatus) {
        setStatusValue(storedStatus);
      }
      // Optionally, you can remove the item from localStorage if it's no longer needed
      return () => localStorage.removeItem('candidateStatus');
    }, []);

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
            <div>
    <img src={(ApplicantsData && ApplicantsData.user_img) ? ApplicantsData.user_img : "https://dashboard.masterofjobs.in/public/images/user_img.png"} style={{width:"50px",height:"50px",borderRadius:"100px"}} />
</div>
            <div style={{textAlign:"center"}}>
            <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>{ApplicantsData && ApplicantsData.user.name}</span><br/>
            {/* <span style={{color:"grey",fontSize:"12px"}}>3 days ago</span> */}
            </div>

            <div>
              {
               StatusValue && StatusValue === "Not Selected" ? <span style={{color:"crimson"}}>{StatusValue && StatusValue}</span>
                :
                <span style={{color:"#0054e9"}}>{StatusValue && StatusValue}</span>
              }
           
            </div>
             
            </div>
    
            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Department</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              {
                 ApplicantsData &&  ApplicantsData.job_pref && ApplicantsData.job_pref.map((el,index)=>{
                    return  <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>{el.department}</span>
                </div>
                  })
                }
              </div>
             
            </div>
    
            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>City</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
               

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>{ApplicantsData && ApplicantsData.user && ApplicantsData.user.city}</span>
                </div>

                

              </div>
             
            </div>

            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              
                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>
                      {
                        ApplicantsData && ApplicantsData.work && ApplicantsData.work.length > 0 ?
                        "Experienced"
                        :
                        "Fresher"
                      }
                      
                      </span>
                </div>

                
              </div>
             
            </div>

            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Education</span>
              </div>
              {
                ApplicantsData && ApplicantsData.user_edu && ApplicantsData.user_edu[0].ten_th === "true" &&
                <div>
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].ten_school}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",color:"grey"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].ten_year}</span>
                </div>
  
              
  
                </div>
              }
              {
                ApplicantsData && ApplicantsData.user_edu && ApplicantsData.user_edu[0].to_th === "true" &&
                <div>
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].to_th_school}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",color:"grey"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].to_th_year}</span>
                </div>
  
              
  
                </div>
              }
              {
               ApplicantsData && ApplicantsData.user_edu  && ApplicantsData.user_edu[0].doc === "true" &&
                <div>
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].doc_degree}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",color:"grey"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].doc_university}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold",color:"black"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].doc_year}</span>
                </div>
  
                </div>
              }

{
                ApplicantsData && ApplicantsData.user_edu && ApplicantsData.user_edu[0].gra_dip === "true" &&
                <div>
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].gr_degree}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",color:"grey"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].gr_university}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold",color:"black"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].gr_year}</span>
                </div>
  
                </div>
              }

{
                ApplicantsData && ApplicantsData.user_edu && ApplicantsData.user_edu[0].hotel_de === "true" &&
                <div>
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].h_college}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",color:"grey"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].h_year}</span>
                </div>
  
               
  
                </div>
              }

{
                ApplicantsData && ApplicantsData.user_edu && ApplicantsData.user_edu[0].post_gra === "true" &&
                <div>
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].pg_degree}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",color:"grey"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].pg_university}</span>
                </div>
  
                <div style={{marginTop:"10px"}}>
                <span style={{fontSize:"13px",fontWeight:"bold",color:"black"}}>{ApplicantsData && ApplicantsData.user_edu &&ApplicantsData.user_edu[0].pg_year}</span>
                </div>
  
                </div>
              }
             
              
             
            </div>

            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Work experience</span>
              </div>
 {
  ApplicantsData && ApplicantsData.work ? ApplicantsData.work.map((el,index)=>{
    return <div>
    <div style={{marginTop:"10px"}}>
    <span style={{fontSize:"13px",fontWeight:"bold",color:"grey"}}>{el.designation}</span>
    </div>

    <div style={{marginTop:"10px"}}>
    <span style={{fontSize:"13px",color:"grey"}}>{el.organisation},{el.location}</span>
    </div>

    <div style={{marginTop:"5px"}}>
    <span style={{fontSize:"14px",color:"grey"}}>{el.start_date} - {el.end_date} </span>
    </div>
    </div>
  })
  :
  <span style={{marginTop:"20px",fontSize:"13px",}}>Fresher</span>
 }
              

             
            
             
            </div>

          

            <div style={{marginTop:"30px"}}>
            {
          ApplicantsData && ApplicantsData.resume ?
           <div style={{marginTop:"30px",border:"1px solid grey",borderRadius:"10px",padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             
             <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <IonIcon icon={personOutline} style={{marginRight:"10px"}}/>
             {ApplicantsData && ApplicantsData.user.name}.resume
               </div>

               <div onClick={openPDFInNewTab}>
                <span style={{fontWeight:"bold",color:"#3351CC"}}>view</span>
                 </div>
            
             </div>
          :
          <div style={{marginTop:"30px"}}>

            <span>No Resume added</span>
           </div>
         } 

            </div>
             
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px"}}>
                <div>
                    <IonIcon style={{fontSize:"25px",color:"grey"}} icon={chatbubbleEllipsesOutline}></IonIcon>
                </div>
                <div style={{marginLeft:"20px"}} onClick={navigateToChat}>
                    <span style={{fontSize:"18px",color:"grey"}}>Connect with the candidate</span>
                </div>
            </div>
            
            {/* {
               status &&  <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
              {
              status === "In Review" && <IonButton onClick={()=>ChangeStatus("Selected")} size="small" shape="round" style={{width:"140px"}}>Selected</IonButton>
              }

              {
               status !== "In Touch" && <IonButton onClick={()=>ChangeStatus("In Review")} size="small" shape="round" style={{width:"140px"}}>Accept</IonButton>
              }
              
              {
              status !== "Not Selected" &&   <IonButton onClick={()=>ChangeStatus("Not Selected")} size="small" shape="round" color={"danger"} style={{width:"120px"}} fill="outline">Decline</IonButton>
              }
            

           </div>
            } */}
           

            
          </div>
               </div>

               


               
           </div>
        </IonContent>
    </IonPage>
  )
}
