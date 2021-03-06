import React, { useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import getUserNumber from "../components/getUserNumber";

function Statistics(props) {
  const user_name = JSON.parse(sessionStorage.getItem("info"))[0].user_name;

  useEffect(() => {
    const user_no = getUserNumber();

    if(user_no !== -1) {
      console.log(user_no);
      fetch("/userData/intake", {
        method: "POST",
        body: JSON.stringify({ userNumber: user_no }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
    }
  }, []);

  const state = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  };

  return (
    <div>
      <Bar
        data={state}
        width={300}
        height={50}
        options={{
          title: {
            display: true,
            text: user_name + '의 일주일 통계',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'top'
          }
        }}
      />
    </div>
  );
}


export default Statistics;