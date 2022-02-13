import { Box } from "@mui/system";
import JobCard from "../JobCard/JobCard";

const JobBoardComponent = ({ jobList }) => {
  return (
    <div id="job-list-container">
      <h2>List of Jobs</h2>
      <Box mt={5} sx={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        {jobList.map((job, index) => (
          <JobCard key={index} data={job} />
        ))}
      </Box>
    </div>
  );
};

export default JobBoardComponent;
