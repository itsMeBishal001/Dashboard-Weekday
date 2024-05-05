import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";

const JobCard = ({ job }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.jobRole}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.companyName} - {job.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.jobDetailsFromCompany}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Salary: {job.minJdSalary || "Not specified"} -{" "}
          {job.maxJdSalary || "Not specified"} {job.salaryCurrencyCode}
        </Typography>
        <Avatar alt={job.companyName} src={job.logoUrl} />
      </CardContent>
    </Card>
  );
};

export default JobCard;
