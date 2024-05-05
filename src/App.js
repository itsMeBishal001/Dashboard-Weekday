import React, { useState, useEffect, useRef } from "react";

function App() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              limit: 10,
              offset: 0,
            }),
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        return null;
      }
    };

    // Fetch initial data
    fetchJobs().then((data) => {
      if (data) {
        setJobs(data);
      }
    });
  }, []);

  //jobs data results
  console.log(jobs);

  return (
    <div>
      <h1>jobs Data</h1>
      {jobs ? <>Jobs are fetched </> : <p>Loading...</p>}
    </div>
  );
}

export default App;
