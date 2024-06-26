import { IonButton, IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { isMobile } from '../../../IsMobile/IsMobile';
import { bookmarkOutline, chatbubbleEllipsesOutline, chatbubbleOutline, chevronBackOutline, personOutline } from 'ionicons/icons';
import book from "/assets/Ellipse1.png";
import { useParams } from 'react-router';
import { Base_url } from '../../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';

const SearchCandidateView = () => {
    const history = useIonRouter();
    const { id, id2 } = useParams();
    const [ApplicantsData, setApplicantsData] = useState(null);
    const { showToast, CandidateJobStatus, setCandidateJobStatus } = useContext(AppContext);
    const [StatusValue, setStatusValue] = useState(null);

    const getApplicantsData = async (id) => {
        try {
            const url = `${Base_url}all_user_data/${id}`;
            const response = await axios.post(url, {}, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
               
            });
            const data = response.data;
    
            if (data.status === "success") {
                setApplicantsData(data.Job[0]);
                return;
            }
            showToast("error", "Try After Some Time", "");
        } catch (error) {
            console.error("Error:", error);
            showToast("error", "Try After Some Time", "");
        }
    };

    const navigateToChat = () => {
        const id = ApplicantsData.user_id;
        history.push(`/personal-chat/${id}`);
    };

    // const ChangeStatus = async (value) => {
    //     try {
    //         const url = `${Base_url}job_apply/status_update/${id2}`;
    //         const formData = new FormData();
    //         formData.append('status', value);

    //         const response = await axios.post(url, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             }
    //         });
    //         const data1 = response.data;

    //         if (data1.status === "success") {
    //             showToast("success", "updated", "");
    //             setCandidateJobStatus(prev => prev + 1);
    //             return;
    //         }
    //         showToast("error", "Try After Some Time", "");
    //     } catch (error) {
    //         console.error('Error:', error);
    //         showToast("error", "Try After Some Time", "");
    //     }
    // };

    useEffect(() => {
        if (id) {
            getApplicantsData(id);
        }
    }, [id, id2, CandidateJobStatus]);

    const handelBackClick = () => {
        history.goBack();
    };

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
        return () => localStorage.removeItem('candidateStatus');
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen style={{ '--ion-background-color': '#FAFAFA' }}>
                <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
                    <div style={{ marginTop: "20px" }}>
                        <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{ fontSize: "28px" }}></IonIcon>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <span style={{ fontSize: "30px", fontWeight: "bold" }}>Candidates Applied</span>
                    </div>

                    <div>
                        <div style={{ marginTop: "30px" }}>
                            <div style={{ display: "flex", justifyContent: "", alignItems: "center" }}>
                                <div>
                                    <img src={(ApplicantsData && ApplicantsData.user_img) ? ApplicantsData.user_img : "https://dashboard.masterofjobs.in/public/images/user_img.png"} style={{ width: "50px", height: "50px", borderRadius: "100px" }} />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <span style={{ fontSize: "18px", color: "black", fontWeight: "bold",paddingLeft:'15px' }}>{ApplicantsData && ApplicantsData.user && ApplicantsData.user.name}</span><br />
                                </div>
                                <div>
                                    {
                                        StatusValue && StatusValue === "Not Selected" ? <span style={{ color: "crimson" }}>{StatusValue && StatusValue}</span>
                                            :
                                            <span style={{ color: "#0054e9" }}>{StatusValue && StatusValue}</span>
                                    }
                                </div>
                            </div>

                            <div style={{ marginTop: "30px" }}>
                                <div>
                                    <span style={{ fontSize: "15px", color: "black", fontWeight: "bold" }}>Department</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "left", alignItems: "center", flexWrap: "wrap", marginTop: "10px", marginBottom: "10px", gap: "10px" }}>
                                {
  ApplicantsData && ApplicantsData.job_pref && ApplicantsData.job_pref.map((el, index) => {
    const departments = el.department.split(',');
    return departments.map((dept, deptIndex) => (
      <div key={`${index}-${deptIndex}`} style={{ padding: "3px 10px", borderRadius: "74px", backgroundColor: '#F0F0F0', marginBottom: '5px' }}>
        <span style={{ fontSize: "11px", color: "#5A5A5A" }}>{dept}</span>
      </div>
    ));
  })
}
                                </div>
                            </div>

                            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>City</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
               

                <div style={{padding:"3px 10px",borderRadius:"74px",backgroundColor:'#F0F0F0'}}>
                    <span style={{fontSize:"11px",color:"#5A5A5A"}}>{ApplicantsData && ApplicantsData.user && ApplicantsData.user.city}</span>
                </div>

                

              </div>
             
            </div>

            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              
                <div style={{padding:"3px 10px",borderRadius:"74px",backgroundColor:'#F0F0F0'}}>
                    <span style={{fontSize:"11px",color:"#5A5A5A"}}>
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

                            <div style={{ marginTop: "30px" }}>
                                <div>
                                    <span style={{ fontSize: "15px", color: "black", fontWeight: "bold" }}>Education</span>
                                </div>
                                {
                                    ApplicantsData && ApplicantsData.user && ApplicantsData.user_edu && ApplicantsData.user_edu[0].to_th === "true" &&
                                    <div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", fontWeight: "bold" }}>{ApplicantsData.user_edu[0].to_th_school}</span>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", color: "grey" }}>{ApplicantsData.user_edu[0].to_th_year}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    ApplicantsData && ApplicantsData.user && ApplicantsData.user_edu && ApplicantsData.user_edu[0].doc === "true" &&
                                    <div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", fontWeight: "bold" }}>{ApplicantsData.user_edu[0].doc_degree}</span>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", color: "grey" }}>{ApplicantsData.user_edu[0].doc_university}</span>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", fontWeight: "bold", color: "black" }}>{ApplicantsData.user_edu[0].doc_year}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    ApplicantsData && ApplicantsData.user && ApplicantsData.user_edu && ApplicantsData.user_edu[0].gra_dip === "true" &&
                                    <div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", fontWeight: "bold" }}>{ApplicantsData.user_edu[0].gr_degree}</span>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", color: "grey" }}>{ApplicantsData.user_edu[0].gr_university}</span>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ fontSize: "13px", fontWeight: "bold", color: "black" }}>{ApplicantsData.user_edu[0].gr_year}</span>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div style={{ marginTop: "30px" }}>
                                <div>
                                    <span style={{ fontSize: "15px", color: "black", fontWeight: "bold" }}>Work Experience</span>
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <span style={{ fontSize: "13px", color: "grey" }}>
                                        {
                                            ApplicantsData && ApplicantsData.user && ApplicantsData.work && ApplicantsData.work.length > 0 &&
                                            ApplicantsData.work.map((el, index) => {
                                                return (<div>
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
                                                );
                                            })
                                        }
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginTop: "30px" }}>
                                <div style={{ marginTop: "10px" }}>
                                    {
                                        ApplicantsData && ApplicantsData.user && ApplicantsData.skills && ApplicantsData.skills.map((skill, index) => (
                                            <div key={index} style={{ padding: "5px 10px", border: "1px solid #0054e9", borderRadius: "18px", display: "inline-block", marginRight: "5px", marginBottom: "5px" }}>
                                                <span style={{ fontSize: "11px", color: "#0054e9" }}>{skill}</span>
                                            </div>
                                        ))
                                    }
                                </div>
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

            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px",backgroundColor:'#F0F0F0',borderRadius:'10px',height:'52px'}}>
                <div>
                    <IonIcon style={{fontSize:"25px",color:"grey"}} icon={chatbubbleEllipsesOutline}></IonIcon>
                </div>
                <div style={{marginLeft:"20px"}} onClick={navigateToChat}>
                    <span style={{fontSize:"18px",color:"grey"}}>Connect with the candidate</span>
                </div>
            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};



export default SearchCandidateView;
