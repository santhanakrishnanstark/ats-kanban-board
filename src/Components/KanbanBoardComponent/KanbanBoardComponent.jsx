import { Avatar, Chip } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { getJobList } from "../../services/getRequestData";
import CandidateCard from "../CandidateCard/CandidateCard";
import "./KanbanBoardComponent.css";

const KanbanBoardComponent = ({ candidateList }) => {
  // filter candidateList by jobid
  const [filteredList, setFilteredList] = useState([]);
  const [jobTitle, setJobTitle] = useState();
  const { jobId } = useParams();

  useEffect(() => {
    const filterList = candidateList.filter((candidate) => {
      return candidate.jobApplied === jobId;
    });
    setFilteredList(filterList);

    // get Job Title from service file joblist function.
    const title = getJobList().filter((job) => job.jobId === jobId)[0];
    setJobTitle(title.jobTitle);
  }, [jobId, candidateList]);

  return (
    <div id="kanban-job-board">
      <h2>Job Board - {jobTitle}</h2>
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <Box
          mt={5}
          sx={{ display: "flex", gap: "30px", height: "calc(100vh - 220px)" }}
          className="board-wrapper"
        >
          <Box className="column">
            <Chip
              // avatar={<Avatar>10</Avatar>}
              label="All Candidate"
              className="column-chip level-1"
            />
            <Droppable droppableId="static-column-id-1">
              {(provided) => (
                <Box
                  mt={3}
                  className="candidate-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredList?.map((candidate, index) => (
                    <CandidateCard
                      key={index}
                      candidate={candidate}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
          <Box className="column">
            <Chip
              // avatar={<Avatar>10</Avatar>}
              label="Contacted"
              className="column-chip level-2"
            />
            <Box mt={3} className="candidate-wrapper"></Box>
          </Box>
          <Box className="column">
            <Chip
              // avatar={<Avatar>10</Avatar>}
              label="Written Test"
              className="column-chip level-3"
            />
            <Box mt={3} className="candidate-wrapper"></Box>
          </Box>
          <Box className="column">
            <Chip
              // avatar={<Avatar>10</Avatar>}
              label="Technical Round"
              className="column-chip level-4"
            />
            <Box mt={3} className="candidate-wrapper"></Box>
          </Box>
          <Box className="column">
            <Chip
              // avatar={<Avatar>10</Avatar>}
              label="Culture Fit Round"
              className="column-chip level-5"
            />
            <Box mt={3} className="candidate-wrapper"></Box>
          </Box>
          <Box className="column">
            <Chip
              // avatar={<Avatar>10</Avatar>}
              label="Offer Initiate"
              className="column-chip level-6"
            />
            <Box mt={3} className="candidate-wrapper"></Box>
          </Box>
        </Box>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoardComponent;
