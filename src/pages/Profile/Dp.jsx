import React, { useState, useContext, useEffect } from "react";
import dp from "./dp.jpeg";
import { Link } from "react-router-dom";

import { Camera, CameraResultType } from "@capacitor/camera";


const Dp = (props) => {
  // const { sessionId } = useContext(SessionContext);
  // const { showToast } = useContext(CatalogContext);
  // const [picture, setPicture] = useState();
  // const userDetails = props.userDetails;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: response } = await httpService.get(
  //         httpService.apiEndpointLong + "rest/account/getPicture",
  //         { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
  //       );
  //       console.log(response);
  //       if (response && "success" in response && response.success === 1) {
  //         if (response.data != "") {
  //           setPicture(response.data);
  //         }
  //       } else if (
  //         response &&
  //         "success" in response &&
  //         response.success !== 1
  //       ) {
  //         showToast(
  //           "error",
  //           "unable to fetch profile picture",
  //           "Please try again later"
  //         );
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //       if (error.response) {
  //         showToast(
  //           "error",
  //           "unable to fetch profile picture",
  //           "Please try again later"
  //         );
  //       } else {
  //         showToast(
  //           "error",
  //           "unable to fetch profile picture",
  //           "Please try again later"
  //         );
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const DataURIToBlob = (dataURI) => {
  //   const splitDataURI = dataURI.split(",");
  //   const byteString =
  //     splitDataURI[0].indexOf("base64") >= 0
  //       ? atob(splitDataURI[1])
  //       : decodeURI(splitDataURI[1]);
  //   const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  //   const ia = new Uint8Array(byteString.length);
  //   for (let i = 0; i < byteString.length; i++)
  //     ia[i] = byteString.charCodeAt(i);

  //   return new Blob([ia], { type: mimeString });
  // };

  // function drawImageScaled(img, ctx) {
  //   var canvas = ctx.canvas;
  //   var hRatio = canvas.width / img.width;
  //   var vRatio = canvas.height / img.height;
  //   var ratio = Math.max(hRatio, vRatio);
  //   var centerShift_x = (canvas.width - img.width * ratio) / 2;
  //   var centerShift_y = (canvas.height - img.height * ratio) / 2;
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.drawImage(
  //     img,
  //     0,
  //     0,
  //     img.width,
  //     img.height,
  //     centerShift_x,
  //     centerShift_y,
  //     img.width * ratio,
  //     img.height * ratio
  //   );
  // }

  // const takePicture = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 70,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri,
  //     preserveAspectRatio: true,
  //     width: 300,
  //     height: 300,
  //     correctOrientation: true,
  //   });

  //   var imageUrl = image.webPath;
  //   document.getElementById("dp-img").src = imageUrl;
  //   console.log(imageUrl);

  //   const imgobj = new Image();
  //   imgobj.style.width = "100px";
  //   imgobj.style.height = "auto";
  //   imgobj.src = imageUrl;
  //   imgobj.onload = () => {
  //     var c = document.getElementById("myCanvas");
  //     var ctx = c.getContext("2d");
  //     drawImageScaled(imgobj, ctx);
  //     // ctx.drawImage(imgobj, 0, 0, 500, 500);
  //     console.log(c.toDataURL());
  //     const formData = new FormData();
  //     formData.append("dp", c.toDataURL());
  //     const fetchData = async () => {
  //       try {
  //         const { data: response } = await httpService.post(
  //           httpService.apiEndpointLong + "rest/account/savePicture",
  //           formData,
  //           { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
  //         );
  //         console.log(response);
  //         if (response && "success" in response && response.success === 1) {
  //           showToast("success", "Picutre updated", "");
  //           setPicture(response.data);
  //         } else if (
  //           response &&
  //           "success" in response &&
  //           response.success !== 1
  //         ) {
  //           showToast("error", "Could not update", "Please try again later");
  //         }
  //       } catch (error) {
  //         console.log("error", error);
  //         if (error.response) {
  //           showToast("error", "Could not update", "Please try again later");
  //         } else {
  //           showToast("error", "Could not update", "Please try again later");
  //         }
  //       }
  //     };
  //     fetchData();
  //   };
  //   /////////
  // };

  // const defaultAddress = false;

  return (
    <div>
      </div>
    // <div>
    //   <img
    //     alt="User DP"
    //     src={picture || dp}
    //     data-src={dp}
    //     width={150}
    //     height={150}
    //     className="mt-n5 preload-img mx-auto  rounded-circle shadow-xl entered loaded"
    //     onClick={takePicture}
    //     id="dp-img"
    //   />

    //   <canvas
    //     id="myCanvas"
    //     width="150"
    //     height="150"
    //     style={{ display: "none" }}
    //   >
    //     Your browser does not support the HTML5 canvas tag.
    //   </canvas>

    //   <div className="content text-center">
    //     <div className="px-3 mb-n3">
    //       <h1 className="font-700">
    //         {userDetails.firstname} {userDetails.lastname}
    //       </h1>
       
    //     </div>
    //   </div>

    //   <div className="content">
    //     <div className="row mb-0">
    //       <div className="col-8 offset-2">
    //         <Link
    //           to="../Editprofile"
    //           className="btn btn-full btn-s rounded-s text-uppercase font-900 gradient-highlight shadow-bg shadow-bg-s"
    //         >
    //           <i className="bi bi-pencil"></i> Edit
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Dp;
