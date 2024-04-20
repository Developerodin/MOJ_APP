import React, { useContext, useState } from "react";
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import {arrowRedoSharp,ellipsisHorizontalSharp } from 'ionicons/icons';

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";
import img1 from "./SelectVehicleSwiperImages/All.png";
import img2 from "./SelectVehicleSwiperImages/Hyundai.png";
import img3 from "./SelectVehicleSwiperImages/MG.png";
import img4 from "./SelectVehicleSwiperImages/Tata.png";
import { AppContext } from "../../Context/AppContext";

const data = [
  {
    name: "Tata Nexon EV",
    subtitle: "Mileage range 315 km",
    img: "",
    CompanyName: "TATA",
  },
  {
    name: "Tata Xpres-T EV",
    subtitle: "Mileage range 295 km",
    img: "",
    CompanyName: "TATA",
  },
  {
    name: "Tata Tigor EV",
    subtitle: "Mileage range 295 km",
    img: "",
    CompanyName: "TATA",
  },
  {
    name: "Tata Tiago EV",
    subtitle: "Mileage range 315 km",
    img: "",
    CompanyName: "TATA",
  },
  {
    name: "MG Z5 EV",
    subtitle: "Mileage range 315 km",
    img: "",
    CompanyName: "MG",
  },
];

const CompanyData = [
  { Img: img1, title: "All" },
  { Img: img2, title: "TATA" },
  { Img: img3, title: "MG" },
  { Img: img4, title: "Hyundai" },
  { Img: img1, title: "All" },
  { Img: img2, title: "TATA" },
  { Img: img3, title: "MG" },
  { Img: img4, title: "Hyundai" },
  { Img: img1, title: "All" },
  { Img: img2, title: "TATA" },
  { Img: img3, title: "MG" },
  { Img: img4, title: "Hyundai" },
];

const IMGurl =
  "https://images.ctfassets.net/hrltx12pl8hq/7JnR6tVVwDyUM8Cbci3GtJ/bf74366cff2ba271471725d0b0ef418c/shutterstock_376532611-og.jpg";

const EventFeedCard = () => {
  const [DataValue, setDataValue] = useState(data);

  const {itemData}=useContext(AppContext);
  const handelClick = (e) => {
    let clickedValue = e.target.innerText;
    let SelectData;
    // console.log("Values:",e.currentTarget);

    if (clickedValue === "All") {
      setDataValue(data);
    } else if (clickedValue) {
      SelectData = data.filter((el) => {
        return el.CompanyName === clickedValue;
      });
      setDataValue(SelectData);
    }
  };

  const handelBackground = (e) => {
    //  console.log(e.wrapperEl.childNodes[0].children[0])
    let AllSlides = e.wrapperEl.childNodes;
    let SelectedCard = e.clickedSlide.children[0];
    SelectedCard.style.backgroundColor = "#1B9A8B";

    for (let i = 0; i < AllSlides.length; i++) {
      let SelectedSlide = AllSlides[i];
      if (SelectedSlide.children[0] === SelectedCard) {
        SelectedSlide.children[0].style.backgroundColor = "#1B9A8B";
        SelectedSlide.children[0].style.color = "#FFF";
      } else {
        SelectedSlide.children[0].style.backgroundColor = "#FFF";
        SelectedSlide.children[0].style.color = "black";
      }
    }
  };
  return (
    <div onClick={handelClick} >
      <Swiper
        slidesPerView={1.7}
        style={{ height: "100%" }}
        //   onTap={handelBackground}
      >
        {itemData.map((el) => {
          return (
            <SwiperSlide
              style={{ padding: "0px", justifyContent: "space-around" }}
            >
              <IonCard
                style={{
                  borderRadius: "25px",
                  
                }}
              >
                <div style={{ width: "100%", height: "50%" }}>
                  <img
                    src={el.img}
                    alt="user Image"
                    style={{ width: "100%", maxHeight: "100%",marginBottom:"-3px" }}
                  />

                  <div style={{position:"absolute",top:"10px",left:"85%",display:"flex",justifyContent:"end",alignItems:"end"}}>
                  <div style={{padding:"5px",borderRadius:"25px",backgroundColor:"#F8F8F8",display:"flex",justifyContent:"center",alignItems:"center",width:"24px",height:"24px"}}>
                       <IonIcon icon={ellipsisHorizontalSharp}></IonIcon>
                       </div>
                  </div>
                 
                </div>

                <div style={{backgroundColor:"#2E2E2E",padding:"10px"}}>
                  <div>
                    <IonText color="light" style={{display:"flex", textAlign:"left",fontSize:"10px",fontWeight:"700"}}>
                      SUN,31 JULY AT 9:10 RIDES IN MOUNTAINS - 2022 Meet over
                      Brunch 57 Interested 69 Attending
                    </IonText>
                  </div>

                  
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"10px 0px 3px "}}>
                        
                       <button   style={{height:"23px",borderRadius:"7px",fontSize:"12px",width:"90px",backgroundColor:"#F8F8F8"}}>Intrested</button>

                       <div style={{padding:"5px",borderRadius:"9px",backgroundColor:"#F8F8F8",display:"flex",justifyContent:"center",alignItems:"center"}}>
                       <IonIcon icon={arrowRedoSharp}></IonIcon>
                       </div>


                    </div>




                </div>
              </IonCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default EventFeedCard;
