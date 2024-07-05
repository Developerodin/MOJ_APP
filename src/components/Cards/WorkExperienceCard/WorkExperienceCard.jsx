import { IonCard, IonCardContent, IonIcon, useIonRouter, useIonActionSheet } from '@ionic/react'
import { createOutline, trash } from 'ionicons/icons'
import React, { useState } from 'react'
import WorkExperienceModelEdit from '../../Models/WorkExperienceEdit'

export const WorkExperienceCard = ({data, UserWorkExperienceDelete}) => {
  const history = useIonRouter()
  const [present] = useIonActionSheet()

  const handelEditWorkExp = () => {
    history.push(`/profile-work-experience-edit/${data.id}`)
  }

  const handleDeleteClick = () => {
    UserWorkExperienceDelete(data.id)
  }

  const showActionSheet = () => {
    present({
      header: 'Are you sure you want to delete your work experience? This action cannot be undone.',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: handleDeleteClick, // Call handleDeleteClick when Delete button is clicked
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    })
  }

  return (
    <div>
      <IonCard style={{ padding: "0px", border: "1px solid #E4E4E4", borderRadius: "15px", background: "#f2f4fe", margin: 0 }}>
        <IonCardContent style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "18px", fontWeight: 800 }}>{data && data.designation} Profile -  {`${data && data.profile}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
              {/* <IonIcon icon={createOutline} style={{fontSize:"22px"}}/> */}
              <IonIcon onClick={showActionSheet} icon={trash} style={{ fontSize: "22px", color: "#FF3939", marginLeft: "10px" }} />
            </div>
          </div>
          <div style={{ marginTop: "3px" }}>
            <span style={{ fontSize: "15px", color: "#575757", fontWeight: 500 }}>Company Name - {data && data.organisation},{data && data.location}</span>
          </div>
          <div style={{ marginTop: "3px" }}>
            <span style={{ fontSize: "15px", fontWeight: 500 }}>Duration - {data && data.start_date} - {data && data.end_date} </span>
          </div>
          <div style={{ marginTop: "3px" }}>
            <span style={{ fontSize: "15px", fontWeight: 500 }}>Place - {data && data.city}, {data && data.state} </span>
          </div>
          <div style={{ marginTop: "3px" }}>
            <span style={{ fontSize: "15px", fontWeight: 500 }}>Reference . {data && data.ref_mobile} </span>
          </div>
          <div style={{ marginTop: "3px" }}>
            <span style={{ fontSize: "15px", fontWeight: 500 }}>Email - {data && data.ref_email} </span>
          </div>
         
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div onClick={handelEditWorkExp} style={{ background: "#0054e9", borderRadius: "10px", width: "30%", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#fff", fontWeight: "bold" }}>Edit</span>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  )
}
