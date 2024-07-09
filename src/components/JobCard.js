import {
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
  Grid,
} from "@mui/material";

const JobCard = ({ job }) => {
  //For looking the job position catchy capitilize first letters
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={3}>
            <Avatar alt={job.companyName} src={job.logoUrl} />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body2" color="text.secondary">
              {job.companyName}
            </Typography>

            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {capitalizeWords(job.jobRole)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.location}
            </Typography>
          </Grid>
        </Grid>
        {job.minJdSalary || job.maxJdSalary ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ padding: ".5rem 0rem" }}
          >
            Estimated Salary : {job.minJdSalary || "0"} -{" "}
            {job.maxJdSalary || "Not specified"} {job.salaryCurrencyCode}
          </Typography>
        ) : (
          <Typography> "No Salary Details Found" </Typography>
        )}
        {job.jobDetailsFromCompany ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxHeight: "10rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Job Description :
            </Typography>{" "}
            {job.jobDetailsFromCompany}
          </Typography>
        ) : (
          <Typography> "No Job Details Found" </Typography>
        )}
      </CardContent>
    </CardActionArea>
  );
};

export default JobCard;
