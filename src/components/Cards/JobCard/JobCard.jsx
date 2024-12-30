import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { bookmark, locationOutline } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import book from "/assets/book.png";
import { Base_url } from '../../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';

export const JobCard = ({ data, fun }) => {
  const [jobSaved, setJobSaved] = useState(false);
  const [savedJobId, setSavedJobId] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { showToast, jobUpdate, setJobUpdate } = useContext(AppContext);

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

  const handelJobSave = async () => {
    try {
      const url = `${Base_url}job_save/store`;
      const formData1 = new FormData();
      formData1.append('user_id', userDetails.user_id);
      formData1.append('job_id', data.id);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data1 = response.data;

      if (data1.status === "success") {
        setJobUpdate((prev) => prev + 1);
        setJobSaved(true); // Update state immediately
        setSavedJobId(data1.job_id); // Assuming the response contains the job_id
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getSavedJobsStatus = async () => {
    try {
      const url = `${Base_url}job_saved/Byuserid/${userDetails.user_id}`;
      const formData1 = new FormData();

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data1 = response.data;

      if (data1.status === "success" && Array.isArray(data1.Job)) {
        const filterData = data1.Job.filter((el) => el.job_id === data.id);

        if (filterData.length > 0) {
          setJobSaved(true);
          setSavedJobId(filterData[0].id);
        } else {
          setJobSaved(false);
        }
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handelDeleteJobSave = async () => {
    try {
      const url = `${Base_url}job_save/delete/${savedJobId}`;
      const formData1 = new FormData();

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data1 = response.data;

      if (data1.status === "success") {
        setJobUpdate((prev) => prev + 1);
        setJobSaved(false); // Update state immediately
        setSavedJobId(""); // Clear saved job ID
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getSavedJobsStatus();
  }, [jobUpdate]);

  return (
    <div style={{ width: "100%" }}>
      <IonCard style={{ padding: "0px", border: "1px solid #E4E4E4", borderRadius: "15px", background: "#f2f4fe", margin: 0, marginTop: '10px' }}>
        <IonCardContent style={{ padding: "10px" }}>
          <div>
            <span style={{ fontSize: "12px", color: "#395CFF" }}>{data && timeAgo(data.created_at)}</span>
            <div onClick={fun}>
              <div style={{ width: "80%" }}>
                <span style={{ fontSize: "18px", color: "black", fontWeight: "bold" }}>{data && data.department} {`(${data && data.sub_department})`}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>{data && data.name}</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                <IonIcon icon={locationOutline} style={{ color: "crimson", fontSize: "18px", fontWeight: "bold" }} />
                <span style={{ fontSize: "13px", marginLeft: "2px", marginTop: "3px", color: "black" }}>{data && data.city},  {`(${data && data.state})`}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "8px" }}>
              <img
                src={book}
                alt="Globe Icon"
                style={{}}
              />
              <span style={{ fontSize: "15px", marginLeft: "3px", color: "black" }}>
                {data && data.experience}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "8px" }}>
              <span style={{ fontSize: "16px", color: "#3A9E56", marginLeft: "5px", fontWeight: "bold" }}>₹</span>
              <span style={{ fontSize: "15px", marginLeft: "12px", color: "black" }}>
                {data && data.off_salery}
              </span>
            </div>
          </div>

          <div style={{ position: "absolute", top: 20, right: 20 }}>
            {
              jobSaved ? <IonIcon onClick={handelDeleteJobSave} style={{ color: "#395CFF", fontSize: "24px" }} icon={bookmark} />
                :
                <IonIcon onClick={handelJobSave} style={{ color: "grey", fontSize: "24px" }} icon={bookmark} />
            }
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  )
}