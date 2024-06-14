
import { IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { bookmark, locationOutline } from 'ionicons/icons'
import React from 'react'
import book from "/assets/book.png";
export const AppliedJobCard = ({data,fun}) => {

  function timeAgo(dateString) {
    const createdDate = new Date(dateString);
    const now = new Date();
    const timeDifference = now - createdDate;
    
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (daysAgo === 0) {
      return "Today";
    } else if (daysAgo === 1) {
      return "1 day ago";
    } else {
      return `${daysAgo} days ago`;
    }
  }
  return (
    <div style={{width:"100%"}}>
<IonCard onClick={fun} style={{padding:"0px",border:"1px solid #E4E4E4",borderRadius:"15px",background:"#f2f4fe",margin:0}} >
    <IonCardContent style={{padding:"10px"}}>
      
      <div>
        <span style={{fontSize:"12px",color:"#395CFF"}}>{data && timeAgo(data.created_at)}</span>

        <div>
          <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>{data && data.job_title} {`(${data && data.department})`}</span>
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          <div>
            <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>{data && data.name}</span>
          </div>

        
        </div>
         
        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"10px"}}>
            <IonIcon icon={locationOutline}  style={{color:"crimson",fontSize:"18px",fontWeight:"bold"}} />
           <span style={{fontSize:"13px",marginLeft:"2px",marginTop:"3px",color:"black"}}>{data && data.city},  {`(${data && data.state})`}</span> 
          </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"8px"}}>
            
             <img
            src={book}
            alt="Globe Icon"
            style={{
             
            }}
          />
           

           
              <span style={{fontSize:"15px",marginLeft:"3px",color:"black"}}>
              {data && data.experience}
              </span>
             
           
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"8px"}}>
            
            <span style={{fontSize:"16px",color:"#3A9E56",marginLeft:"5px",fontWeight:"bold"}}>₹</span>
           

           
              <span style={{fontSize:"15px",marginLeft:"12px",color:"black"}}>
              {data && data.off_salery}
              </span>
             
           
        </div>
      </div>
        
        {/* <div style={{position:"absolute",top:20,right:20}}>
          <IonIcon style={{color:"#395CFF",fontSize:"24px"}} icon={bookmark} />
        </div> */}

{
 data && data.status === "Not Selected" ?  <div style={{textAlign:"center",position:"absolute",bottom:20,right:20,color:"crimson",padding:"3px",border:"1px solid crimson",borderRadius:"12px",width:"86px"}}>
            
            
  <span style={{fontSize:"14px"}}>{data && data.status}</span>
</div>
:
<div style={{textAlign:"center",position:"absolute",bottom:20,right:20,color:"green",padding:"3px",border:"1px solid green",borderRadius:"12px",width:"86px"}}>
            
            
            <span style={{fontSize:"14px"}}>{data && data.status}</span>
        </div>
}
     
     
    </IonCardContent>
  </IonCard>


  
    </div>
    
  )
}


