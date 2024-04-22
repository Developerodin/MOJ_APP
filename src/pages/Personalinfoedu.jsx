import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonLabel, IonIcon } from "@ionic/react";
import { calendarOutline } from 'ionicons/icons';
import icon from "/assets/left.png";
import { useHistory } from "react-router";

const Personalinfoedu = () => {
  const history = useHistory()
  const [yearGraduated, setYearGraduated] = useState('');

  const handleYearChange = (event) => {
    setYearGraduated(event.target.value);
  };



  const handelBtnClick= ()=>{
    history.push("/work")
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <button onClick={handelBackClick} style={{ backgroundColor: 'transparent' }}>
            <img
              src={icon}
              style={{
                width: "30px",
                height: "30px",
              }}
            />
          </button>
          <h1
            style={{
              color: "#232323",
              fontSize: "36px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Education
          </h1>

          <div style={{ marginLeft: '10px', marginRight: '10px' }} >
            <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "30px",
                paddingTop: '20px'

              }}
            >
              Degree
            </IonLabel>
            <IonInput
              type="text"
              style={{
                borderRadius: "4px",
                fontSize: "20px",
                border: "1px solid #E2E8F0",
                backgroundColor: '#E1F7F5'
              }}
            />

            <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "30px",
                marginTop: '30px'

              }}
            >
              University
            </IonLabel>
            <IonInput
              type="text"
              style={{
                borderRadius: "4px",
                fontSize: "20px",
                border: "1px solid #E2E8F0",
                backgroundColor: '#E1F7F5'
              }}
            />

            <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "30px",
                marginTop: '30px'

              }}
            >
              Year graduated
            </IonLabel>
            <div style={{ position: 'relative' }}>
              <IonInput
                type="text"
                value={yearGraduated}
                onIonChange={handleYearChange}
                style={{
                  borderRadius: "4px",
                  fontSize: "20px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: '#E1F7F5',
                  paddingRight: '40px' // To make space for the calendar icon

                }}
                
              />
              <button
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
                onClick={() => console.log('Clicked')}
              >
                <IonIcon icon={calendarOutline} style={{ color: '#000' }} />
              </button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "20px", width: "100%", height: '50px', paddingLeft: '20px', paddingRight: '20px' }}>
          <button onClick={handelBtnClick} style={{ borderRadius: "50px", width: '100%', height: '100%', backgroundColor: "#5356FF", color: '#ffffff', fontSize: '20px' }}>
            Proceed
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Personalinfoedu;
