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
      if (data?.jdList) {
        setJobs(data.jdList);
      }
    });
  }, []);

  //jobs data results
  console.log(jobs);

  return (
    <div>
      <h1>Jobs Data</h1>
      {jobs ? (
        jobs.map((job) => (
          <div key={job.jdUid}>
            <h2>{job.jobRole}</h2>
            <p>{job.companyName}</p>
            <p>{job.location}</p>
            <p>{job.jobDetailsFromCompany}</p>
            <p>
              Salary:{" "}
              {job.minJdSalary ? `$${job.minJdSalary}` : "Not specified"} -{" "}
              {job.maxJdSalary ? `$${job.maxJdSalary}` : "Not specified"}{" "}
              {job.salaryCurrencyCode}
            </p>
            <img
              src={job.logoUrl}
              alt={job.companyName}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
