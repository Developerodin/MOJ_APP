import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { bookmark, chevronBackOutline, locationOutline } from 'ionicons/icons'
import React from 'react'
import book from "/assets/book.png";
import { CustomBtn1 } from '../../components/Buttons/CustomBtn1';
import { useHistory } from 'react-router';
import { isMobile } from '../../IsMobile/IsMobile';
export const JobDetails = () => {
  const history = useHistory()
    const handelApplyClick =()=>{
        console.log("Apply click")
    }

    const handelBackClick = ()=>{
      history.goBack()
    }
  return (
    <IonPage>
        <IonContent>
            <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
           <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
{/* ======================================================== */}
           <div style={{marginTop:"30px"}}>
           <div style={{width:"100%"}}>

      
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
                <span style={{fontSize:"28px",fontWeight:"bold"}}>Job Details</span>
            </div>
            <div>
            <IonIcon style={{color:"#395CFF",fontSize:"24px"}} icon={bookmark} />
            </div>
        </div>
       

        <div style={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>Front Office Associate</span>
         <span style={{fontSize:"12px",color:"#395CFF"}}>3 days ago</span>
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"10px"}}>
          <div>
            <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>Hotel King's palace</span>
          </div>

         
        </div>

        <div style={{marginTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <IonIcon icon={locationOutline}  style={{color:"crimson",fontSize:"18px",fontWeight:"bold"}} />
           <span style={{fontSize:"13px",marginLeft:"2px",marginTop:"3px",color:"black"}}>Jaipur (Raj.)</span> 
          </div>
        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"8px"}}>
            
             <img
            src={book}
            alt="Globe Icon"
            style={{
             
            }}
          />
           

           
              <span style={{fontSize:"15px",marginLeft:"3px",color:"black"}}>
              1-3 Years
              </span>
             
           
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"8px"}}>
            
            <span style={{fontSize:"16px",color:"#3A9E56",marginLeft:"5px",fontWeight:"bold"}}>₹</span>
           

           
              <span style={{fontSize:"15px",marginLeft:"12px",color:"black"}}>
              20-30k/m
              </span>
             
           
        </div>

        </div>

    
      </div>
        
       


     
     
    </div>
           </div>

{/* ======================================================== */}
             
             <div style={{marginTop:"30px"}}>
                <div>
                    <span style={{fontSize:"16px",fontWeight:"bold"}}>First head</span>
                </div>

                <div>
                    <ul>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                    </ul>
                </div>
             </div>


             <div style={{marginTop:"50px"}}>
                <div>
                    <span style={{fontSize:"16px",fontWeight:"bold"}}>Second head</span>
                </div>

                <div>
                    <ul>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                        <li>sub points to be placed here</li>
                    </ul>
                </div>
             </div>



             <div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelBackClick} title={"Apply"}/>
             </div>

            </div>
           
        </IonContent>
    </IonPage>
  )
}
