import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, useIonRouter } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagHandleOutline, checkmarkCircleOutline, closeCircleOutline, medkitOutline } from 'ionicons/icons'
import { Base_url } from '../../../Config/BaseUrl'
import axios from 'axios'
import { AppContext } from '../../../Context/AppContext'
import { isMobile } from '../../../IsMobile/IsMobile'

export const ProfileHealth = () => {
       const history = useIonRouter();
       const {profileHealthUpdate } = useContext(AppContext);
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const [phHeathPercentage,setPhHeathPercentage] = useState(0);
    const [userProfileHealthData,setUserProfileHealthData] = useState(null);
    const Data =[
        {name:"user_Job_pref",value:0,route:"/profile-job-preference",name2:"Job Preference"},
        {name:"user_edu",value:0,route:"/profile-eduction",name2:"Eduction"},
        {name:"user_img",value:0,route:"/update-profile-photo",name2:"Profile Photo"},
        {name:"user_pro",value:0,route:"/profile-personal-details",name2:"Personal Details"},
        {name:"user_resume",value:0,route:"/profile-resume",name2:"Resume"},
        {name:"user_work",value:0,route:"/profile-work-experience",name2:"Work Experience"},
        {name:"users",value:0,route:"/profile-contact-details",name2:"Contact Details"},
    ]
    const [dataPh,setDataPh] = useState(Data)
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
 
 const handelRouteClick = (route) =>{
    history.push(route)
 }
    

    const getProfileHealth = async () => {
        try {

            const formData = new FormData()
          const url = `${Base_url}basic/profile_health_userid/${userDetails.user_id}`;
          
        
    
          const response = await axios.post(url,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
              // "Authorization" :`Berear ${token}`,
         
            }
          });
          const data = response.data
              // console.log("Response check work experience data",data,response)
              
                if(data){
                  console.log("Basic data",data.post)
                  const Data = data.post;
                  setUserProfileHealthData(Data);
                  const updatedData = dataPh.map(item => {
                    if (Data.hasOwnProperty(item.name)) {
                        return {...item, value: Data[item.name]};
                    }
                    return item;
                });

                setDataPh(updatedData);

                const totalCount = updatedData.length;
                const pendingCount = updatedData.filter(item => item.value === 1).length;
                const healthPercentage = ((totalCount - pendingCount) / totalCount) * 100;
                const formattedPercentage = healthPercentage.toFixed(2);
                setPhHeathPercentage(formattedPercentage);
                  
                }
    
                
             
              
        } catch (error) {
          console.error('Error:', error);
          // showToast("error", "Try After Some Time", "");
        }
      };

      useEffect(()=>{
        getProfileHealth()
      },[profileHealthUpdate])

    useEffect(() => {
        const interval = setInterval(() => {
          if (completionPercentage < parseInt(phHeathPercentage)) {
            setCompletionPercentage(completionPercentage + 1);
          } else {
            clearInterval(interval);
          }
        }, 20);
    
        return () => clearInterval(interval);
      }, [phHeathPercentage,completionPercentage]);
    
      const width = 300;
      const height = 300;
      const radius = 80;
      const circumference = 2 * Math.PI * radius;
      const strokeWidth = 25;
      const offset = ((100 - completionPercentage) / 100) * circumference;
  return (
   <IonPage>
    <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
        <ProfileHeaders icon={<IonIcon icon={medkitOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Profile Health"} />
         

         <div style={{marginTop:"60px"}}>
               
                <div style={{textAlign:"center"}}>
                     <span style={{fontSize:"18px",color:"grey",fontWeight:"bold"}}>Complete your profile</span>
                </div>
                
              
                <div className="profile-progress" style={{textAlign:"center"}}>
      <svg width={width} height={height}>
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          fill="none"
          stroke={phHeathPercentage < 30 ? "crimson" : "#51B248" }
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="22"  fontWeight="bold" fill="#000">
          {phHeathPercentage}%
        </text>
      </svg>
    </div>
    <div style={{textAlign:"center",marginTop:"-30px"}}>
                     <span style={{fontSize:"30px",color:`${phHeathPercentage < 30 ? "crimson" : "#51B248" }`,fontWeight:"bold"}}>{phHeathPercentage < 30 ? "Poor !" : "Good !" }</span>
                </div>
     

         </div>



         <div style={{marginTop:"60px"}}>
             
             <IonGrid>
                <IonRow >
                    {
                        dataPh.map((el,index)=>{
                            return  <IonCol size="6">
                        
                            <div onClick={()=>handelRouteClick(el.route)} style={{position:"relative",border:"1px solid #E4E4E4",height:"120px",borderRadius:"20px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                                    {
                                        el.value === 0 ?  <IonIcon icon={checkmarkCircleOutline}  style={{fontSize:"40px",color:"#51B248"}}/>
                                        :
                                        <IonIcon icon={closeCircleOutline}  style={{fontSize:"40px",color:"crimson"}}/>
                                    }
                                   
                                    <span style={{marginTop:"10px",fontSize:"13px",fontWeight:"bold"}}>{el.name2}</span>

                                    {
                                        el.value === 0 ?
                                        <span style={{fontSize:"13px",fontWeight:"bold"}}>Completed</span>
                                        :
                                       <span style={{fontSize:"13px",fontWeight:"bold"}}>Pending</span>
                                    }
                                   
        
                                    
                              </div>
                            </IonCol>
                        })
                    }
                   

                    
                </IonRow>
             </IonGrid>
            

         </div>
       
       
        </div>
       
    </IonContent>
   </IonPage>
  )
}
