import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

const JobCard = ({
  data: { jobId, jobTitle, candidateCount, postedDate, location },
}) => {
  return (
    <Link underline="none" component={RouterLink} to={"/job/" + jobId}>
      <Card sx={{ width: 300, maxWidth: 350 }}>
        <CardHeader title={jobTitle} subheader={postedDate} />
        <CardContent sx={{ paddingTop: "0px" }}>
          <Box sx={{ marginBottom: "30px" }}>
            <Typography variant="h3" color="text.secondary">
              {candidateCount ? candidateCount : 0}
            </Typography>
            <Typography variant="string">Candidates</Typography>
          </Box>
          <Typography variant="string" color="text.secondary">
            Location:
            <Typography
              variant="string"
              sx={{ fontWeight: 800, marginLeft: "10px" }}
            >
              {location}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
