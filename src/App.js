import React, { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import { Grid, CircularProgress } from "@mui/material";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setJobs,
  setOffset,
  setJobTypeFilter,
  setLocationFilter,
} from "./Store";

function App() {
  // const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  // const offset = useSelector((state) => state.offset);
  // const jobTypeFilter = useSelector((state) => state.jobTypeFilter);
  // const locationFilter = useSelector((state) => state.locationFilter);

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
            offset,
          }),
        }
      );
      const data = await response.json();
      if (data) {
        dispatch(setJobs(data?.jdList)); // Dispatch action to update jobs
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [offset]); // Fetch jobs on offset change

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY + 10 >=
      document.documentElement.offsetHeight
    ) {
      dispatch(setOffset(offset + 10)); // Dispatch action to update offset
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleJobTypeChange = (event) => {
    dispatch(setJobTypeFilter(event.target.value));
  };

  const handleLocationChange = (event) => {
    dispatch(setLocationFilter(event.target.value));
  };

  const handleClearFilters = () => {
    dispatch(setJobTypeFilter(""));
    dispatch(setLocationFilter(""));
    fetchJobs(); // Refetch all jobs on clear
  };
  const FilterSection = ({
    jobTypeFilter,
    setJobTypeFilter,
    locationFilter,
    setLocationFilter,
  }) => {
    // const handleJobTypeChange = (event) => {
    //   setJobTypeFilter(event.target.value);
    // };

    // const handleLocationChange = (event) => {
    //   event.preventDefault();
    //   setLocationFilter(event.target.value);
    // };
    // const handleClearFilters = () => {
    //   setLocationFilter("");
    //   setJobTypeFilter("");
    //   fetchJobs().then((data) => {
    //     if (data) {
    //       setJobs(data?.jdList);
    //     }
    //   });
    // };
    return (
      <div className="filter-section">
        <h2>Filter Jobs</h2>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="job-type-label">Job Type</InputLabel>
          <Select
            labelId="job-type-label"
            id="jobType"
            value={jobTypeFilter}
            onChange={handleJobTypeChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="frontend">Frontend Devoloper</MenuItem>
            <MenuItem value="Data Scientist">Data Scientist</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Location"
          id="location"
          value={locationFilter}
          onChange={handleLocationChange}
          sx={{ m: 1, minWidth: 120 }}
        />

        <Button
          variant="contained"
          type="submit"
          onClick={handleClearFilters}
          sx={{ m: 1 }}
        >
          Clear Filters
        </Button>
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Job Openings</h1>
      <FilterSection
        jobTypeFilter={jobTypeFilter}
        setJobTypeFilter={setJobTypeFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />
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
