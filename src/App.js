import React, { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import { Grid, CircularProgress } from "@mui/material";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);

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
              offset: offset,
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
        if (offset === 0) {
          setJobs(data?.jdList);
        } else {
          setJobs((prevData) => {
            return [...prevData, ...data?.jdList];
          });
        }
      }
    });
  }, [offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY + 10 >=
      document.documentElement.offsetHeight
    ) {
      setOffset((prevOffset) => prevOffset + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(jobs);
  return (
    <div className="app-container">
      <h1 className="app-title">Job Openings</h1>
      {jobs ? (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item key={job.jdUid} xs={12} sm={6} md={4} lg={4} xl={3}>
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
