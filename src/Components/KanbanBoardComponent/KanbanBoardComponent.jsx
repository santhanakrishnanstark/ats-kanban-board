import { Chip, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { getJobList, getkanbanColumns } from "../../services/getRequestData";
import CandidateCard from "../CandidateCard/CandidateCard";
import "./KanbanBoardComponent.css";

const KanbanBoardComponent = ({ candidateList }) => {
  // filter candidateList by jobid
  const [initialfilteredList, setInitialFilteredList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [jobTitle, setJobTitle] = useState();
  const { jobId } = useParams();
  const [columns, setCoulumns] = useState(getkanbanColumns());

  useEffect(() => {
    const filterList = candidateList.filter((candidate) => {
      return candidate.jobApplied === jobId;
    });
    setFilteredList(filterList);
    setInitialFilteredList(filterList);

    // get Job Title from service file joblist function.
    const title = getJobList().filter((job) => job.jobId === jobId)[0];
    setJobTitle(title.jobTitle);
  }, [jobId, candidateList]);

  const onDragComplete = (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = [...columns];
      const srcItem = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, ...srcItem);

      setCoulumns(newColumnOrder);
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
      setInitialFilteredList(updatedList);
    } else {
      let updatedList = [...filteredList];
      const srcItem = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, ...srcItem);
      setFilteredList(updatedList);
      setInitialFilteredList(updatedList);
    }
  };

  const searchHandler = ({ target }) => {
    const searchValue = target.value.toLowerCase();
    const newList = initialfilteredList.filter((candidate) => {
      return candidate.name.first.toLowerCase().includes(searchValue);
    });
    setFilteredList(newList);
  };

  return (
    <div id="kanban-job-board">
      <div className="board-header">
        <h2>Job Board - {jobTitle}</h2>
        <TextField
          id="input-with-icon-textfield"
          label="Search"
          type="search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          onChange={(event) => searchHandler(event)}
        />
      </div>
      <DragDropContext onDragEnd={(result) => onDragComplete(result)}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Box
              mt={5}
              sx={{
                display: "flex",
                gap: "30px",
                height: "calc(100vh - 220px)",
              }}
              className="board-wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.map((column, index) => {
                return (
                  <Draggable
                    draggableId={" " + index}
                    index={index}
                    key={index}
                  >
                    {(columnProvided) => (
                      <Box
                        className="column"
                        key={index}
                        {...columnProvided.draggableProps}
                        ref={columnProvided.innerRef}
                      >
                        <Chip
                          label={column.label}
                          className={"column-chip " + column.level}
                          {...columnProvided.dragHandleProps}
                        />
                        <Droppable droppableId={column.id} type="candidates">
                          {(candidateDroppableProvided) => (
                            <Box
                              mt={3}
                              className="candidate-wrapper"
                              ref={candidateDroppableProvided.innerRef}
                              {...candidateDroppableProvided.droppableProps}
                            >
                              {filteredList?.map((candidate, index) => {
                                if (candidate.jobStatus === column.id) {
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
                              {candidateDroppableProvided.placeholder}
                            </Box>
                          )}
                        </Droppable>
                        {columnProvided.placeholder}
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoardComponent;
