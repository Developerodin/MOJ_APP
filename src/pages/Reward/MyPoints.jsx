import React, { useState, useEffect } from 'react';
import axios from 'axios';
import icon from "/assets/Coin.png";
import { RewardCard } from '../../components/Cards/RewardCard/RewardCard';
import { RewardCard2 } from '../../components/Cards/RewardCard/RewardCard2';
import { Base_url } from '../../Config/BaseUrl';

export const MyPoints = () => {
  const [rewardPoints, setRewardPoints] = useState(0);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    const handelPointsDataGet = async () => {
      try {
        console.log("In Change status ==>");

        const url = `${Base_url}auth/points/${userDetails.user_id}`;
        const formData1 = new FormData();

        const response = await axios.post(url, formData1, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        const data1 = response.data;
        console.log("Response check work experience", data1, response);

        if (data1.status === "success") {
          console.log("Points Data", data1);
          const points = data1.data.points;
          setRewardPoints(points);
          return;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    handelPointsDataGet();
  }, [userDetails &&  userDetails.user_id]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={icon} alt='' />
        <span style={{ fontWeight: "bold", fontSize: "22px" }}>{rewardPoints}</span>
      </div>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <span style={{ fontSize: "15px" }}>
          To earn more, invite a friend/colleague by clicking here
        </span>
      </div>

      <div>
        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #E4E4E4", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "30px", background: "#F7A708" }}>
          <span style={{ color: "#fff", fontWeight: "bold" }}>Refer and Earn</span>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <RewardCard  points={rewardPoints}/>
      </div>
      {/* <div style={{ marginTop: "30px" }}>
        <RewardCard2 points={rewardPoints} />
      </div> */}
    </div>
  );
}
