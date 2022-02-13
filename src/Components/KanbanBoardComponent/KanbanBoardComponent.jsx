import { Chip } from "@mui/material";
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

  const onDragComplete = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      // copy original data
      let updatedList = [...filteredList];
      // get removed source data
      const tempList = [...filteredList];
      const [removedCandidate] = tempList.splice(source.index, 1);

      // update list with job status
      updatedList = updatedList.map((item) => {
        if (removedCandidate.login.uuid === item.login.uuid) {
          return { ...item, jobStatus: destination.droppableId };
        }
        return item;
      });
      setFilteredList(updatedList);
    } else {
      let updatedList = [...filteredList];
      const srcItem = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, ...srcItem);
      setFilteredList(updatedList);
    }
  };

  return (
    <div id="kanban-job-board">
      <h2>Job Board - {jobTitle}</h2>
      <DragDropContext onDragEnd={(result) => onDragComplete(result)}>
        <Box
          mt={5}
          sx={{ display: "flex", gap: "30px", height: "calc(100vh - 220px)" }}
          className="board-wrapper"
        >
          <Box className="column">
            <Chip label="All Candidate" className="column-chip level-1" />
            <Droppable droppableId="NEW">
              {(provided) => (
                <Box
                  mt={3}
                  className="candidate-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredList?.map((candidate, index) => {
                    if (candidate.jobStatus === "NEW") {
                      return (
                        <CandidateCard
                          key={index}
                          candidate={candidate}
                          index={index}
                        />
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
          <Box className="column">
            <Chip label="Contacted" className="column-chip level-2" />
            <Droppable droppableId="CONTACTED">
              {(provided) => (
                <Box
                  mt={3}
                  className="candidate-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredList?.map((candidate, index) => {
                    if (candidate.jobStatus === "CONTACTED") {
                      return (
                        <CandidateCard
                          key={index}
                          candidate={candidate}
                          index={index}
                        />
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
          <Box className="column">
            <Chip label="Written Test" className="column-chip level-3" />
            <Droppable droppableId="WRITTEN">
              {(provided) => (
                <Box
                  mt={3}
                  className="candidate-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredList?.map((candidate, index) => {
                    if (candidate.jobStatus === "WRITTEN") {
                      return (
                        <CandidateCard
                          key={index}
                          candidate={candidate}
                          index={index}
                        />
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
          <Box className="column">
            <Chip label="Technical Round" className="column-chip level-4" />
            <Droppable droppableId="TECHNICAL">
              {(provided) => (
                <Box
                  mt={3}
                  className="candidate-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredList?.map((candidate, index) => {
                    if (candidate.jobStatus === "TECHNICAL") {
                      return (
                        <CandidateCard
                          key={index}
                          candidate={candidate}
                          index={index}
                        />
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
          <Box className="column">
            <Chip label="Culture Fit Round" className="column-chip level-5" />
            <Droppable droppableId="CULTURE">
              {(provided) => (
                <Box
                  mt={3}
                  className="candidate-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredList?.map((candidate, index) => {
                    if (candidate.jobStatus === "CULTURE") {
                      return (
                        <CandidateCard
                          key={index}
                          candidate={candidate}
                          index={index}
                        />
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
          <Box className="column">
            <Chip label="Offer Initiate" className="column-chip level-6" />
            <Droppable droppableId="OFFER">
              {(provided) => (
                <Box
                  mt={3}
                  className="candidate-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredList?.map((candidate, index) => {
                    if (candidate.jobStatus === "OFFER") {
                      return (
                        <CandidateCard
                          key={index}
                          candidate={candidate}
                          index={index}
                        />
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        </Box>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoardComponent;
