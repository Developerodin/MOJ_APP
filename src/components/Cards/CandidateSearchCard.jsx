import { IonCard, IonCardContent, useIonRouter } from '@ionic/react';
import React from 'react';
import book from "/assets/Ellipse1.png";

export const CandidateSearchCard = ({ data }) => {
    const history = useIonRouter();

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

  // Extracting city from user data
  const city = data.user ? data.user.city : null;
  
  // Extracting experience from work history
  const experience = data.work && data.work.length > 0 
    ? data.work.map(job => `${job.organisation}, ${job.designation}`).join("; ")
    : "No experience information";


    const handelClick = () => {
        history.push(`/search-candidate-view/${data.user_id}`);
    }


  return (
    <div onClick={handelClick} style={{ width: "100%", marginBottom: "30px" }}>
      <IonCard style={{ padding: "0px", border:"1px solid #F3F3F3",borderRadius:"10px",background:"#FAFAFA", margin: 0 }}>
        <IonCardContent style={{ padding: "20px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "", alignItems: "center" }}>
              <div>
                <img src={data.user_img || book} style={{ width: "50px", height: "50px", borderRadius: "100px" }} alt="Candidate" />
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "18px", color: "black", fontWeight: "bold",paddingLeft:'15px' }}>
                  {data.user ? `${data.user.name} ${data.user.last_name}` : "Anonymous"}
                </span><br />
              </div>
            </div>

            {data.job_title && (
              <div style={{ marginTop: "15px" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>Job Title</span>
                </div>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", color: "#555" }}>{data.job_title}</span>
                </div>
              </div>
            )}

       {data.work && data.work.length > 0 && (
  <div style={{ marginTop: "15px" }}>
    <div>
      <span style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>Department</span>
    </div>
    <div style={{ display: "flex", justifyContent: "left", alignItems: "center", flexWrap: "wrap", marginTop: "10px", marginBottom: "10px", gap: "10px" }}>
      {data.work.flatMap((workItem, index) => 
        workItem.department.split(',').map((dept, deptIndex) => (
          <div key={`${index}-${deptIndex}`} style={{ padding: "3px 10px", borderRadius: "74px", backgroundColor: '#F0F0F0' }}>
            <span style={{ fontSize: "11px", color: "#5A5A5A" }}>{dept.trim()}</span>
          </div>
        ))
      )}
    </div>
  </div>
)}

            {city && (
              <div style={{ marginTop: "15px" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>City</span>
                </div>
                <div style={{ display: "flex", justifyContent: "left", alignItems: "center", flexWrap: "wrap", marginTop: "10px", marginBottom: "10px", gap: "10px" }}>
                  <div style={{ padding:"3px 10px",borderRadius:"74px",backgroundColor:'#F0F0F0' }}>
                    <span style={{ fontSize:"11px",color:"#5A5A5A" }}>{city}</span>
                  </div>
                </div>
              </div>
            )}

            {experience && (
              <div style={{ marginTop: "15px" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>Experience</span>
                </div>
                <div style={{ display: "flex", justifyContent: "left", alignItems: "center", flexWrap: "wrap", marginTop: "10px", marginBottom: "10px", gap: "10px" }}>
                  <div style={{ padding:"3px 10px",borderRadius:"74px",backgroundColor:'#F0F0F0' }}>
                    <span style={{ fontSize:"11px",color:"#5A5A5A" }}>{experience}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
