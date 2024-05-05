import React, { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import { Grid, CircularProgress } from "@mui/material";
import "./App.css";

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

  return (
    <div className="app-container">
      <h1 className="app-title">Job Openings</h1>
      {jobs ? (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item key={job.jdUid} xs={12} sm={6} md={4} lg={3}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="loading-message">
          <p>Loading...</p>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
}

export default App;
