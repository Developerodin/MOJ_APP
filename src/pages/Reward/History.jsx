import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import HistoryCard from '../../components/Cards/RewardCard/HistoryCard';

export const History = () => {
  const [history, setHistory] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const userId = userDetails.user_id;
  console.log("User Id", userId);

  const role = userDetails.role;
  console.log("Role", role);

  const fetchHistory = async () => {
    try {
      const response = await axios.post(
        `${Base_url}auth/points_history/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message === "No Data found") {
        setErrorMessage("No history found"); 
        setHistory([]); 
      } else {
        setHistory(response.data.data || []); 
      }
      console.log("History", response.data.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setErrorMessage("Error fetching history");
      setHistory([]); 
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userDetails && userId ]);

  return (
    <div>
      {errorMessage ? (
        <p style={{ marginTop: 10, textAlign: 'center', fontSize: 24 }}>
          {errorMessage}
        </p>
      ) : (
        Array.isArray(history) && history.length === 0 ? (
          <p style={{ marginTop: 10, textAlign: 'center', fontSize: 24 }}>
            No history found
          </p>
        ) : (
          history.map((el, index) => (
            <div key={index}>
              <HistoryCard Data={el} />
            </div>
          ))
        )
      )}
    </div>
  );
};
