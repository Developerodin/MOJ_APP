import { IonCard, IonCardContent, IonIcon, IonToggle } from '@ionic/react'
import { bookmark, locationOutline } from 'ionicons/icons'
import React from 'react'
import book from "/assets/book.png";
export const PostJobCard = ({fun}) => {
  return (
    <div style={{width:"100%"}}>
<IonCard  style={{padding:"0px",border:"1px solid #E4E4E4",borderRadius:"15px",background:"#f2f4fe",margin:0}} >
    <IonCardContent style={{padding:"10px"}}>
      
      <div>
        <span style={{fontSize:"12px",color:"#395CFF"}}>3 days ago</span>

        <div>
          <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>Front Office Associate</span>
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          <div>
            <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>Hotel King's palace</span>
          </div>

          <div style={{marginLeft:"20px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <IonIcon icon={locationOutline}  style={{color:"crimson",fontSize:"18px",fontWeight:"bold"}} />
           <span style={{fontSize:"13px",marginLeft:"2px",marginTop:"3px",color:"black"}}>Jaipur (Raj.)</span> 
          </div>
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
              20-30k
              </span>
             
           
        </div>
      </div>
        
        <div style={{position:"absolute",top:20,right:20}}>
        <IonToggle checked={true} />
        </div>


     
     
    </IonCardContent>
  </IonCard>
    </div>
    
  )
}
