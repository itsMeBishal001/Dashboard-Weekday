import { CardContent, Typography, Avatar, CardActionArea } from "@mui/material";

const JobCard = ({ job }) => {
  return (
    <CardActionArea
      disableRipple
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        borderRadius: "4px",
        boxShadow: 2,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          {job.jobRole}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {job.companyName} - {job.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.jobDetailsFromCompany}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Salary: {job.minJdSalary || "Not specified"} -{" "}
          {job.maxJdSalary || "Not specified"} {job.salaryCurrencyCode}
        </Typography>
      </CardContent>
      <Avatar alt={job.companyName} src={job.logoUrl} />
    </CardActionArea>
  );
};

export default JobCard;
