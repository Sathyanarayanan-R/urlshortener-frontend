import React, { useEffect, useState } from "react";
import axios from "axios";

const UrlCount = () => {

    const [dailyCount, setDailyCount] = useState(0);
    const [monthlyCount, setMonthlyCount] = useState(0);

    const url = `https://urlshortener-backend-sj.onrender.com/api/url/count`;

	useEffect(() => {
		const getUrlCount = async () => {
			try {
				const { data } = await axios.get(url);
                setDailyCount(data.dailyCount);
                setMonthlyCount(data.monthlyCount);
			} catch (error) {
				console.log(error);
			}
		}
		getUrlCount();
	}, [url]);

	return (
		<>
			<div style={{paddingBottom: "8px", display: "flex", alignItems: "center", borderBottom: "1px solid grey"}}><h1 style={{display: "inline-block", margin: "0 10px"}}>{dailyCount}</h1> <span>Links Created Today</span></div>
            <div style={{paddingBottom: "20px", display: "flex", alignItems: "center"}}><h1 style={{display: "inline-block", margin: "0 10px"}}>{monthlyCount}</h1> <span>Links Created Monthly</span></div>
		</>
	);
}

export default UrlCount;
