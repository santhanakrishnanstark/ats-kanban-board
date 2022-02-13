import { Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import JobBoardComponent from './Components/JobBoardComponent/JobBoardComponent';
import KanbanBoardComponent from './Components/KanbanBoardComponent/KanbanBoardComponent';
import Sidebar from './Components/Sidebar/Sidebar';
import { getJobList, getRequestedData } from './services/getRequestData';

function App() {

  const [candidates, setCandidates] = useState([]);
  const candidateURL = 'https://randomuser.me/api/?results=10';
  
  const [jobList, setJobList] = useState([]);

  useEffect(() => {

    // get random candidate profiles
    getRequestedData(candidateURL).then(({results}) => {
      console.log('loading candidates.....')

      // static job id
      const jobIds = ['1101', '1102', '1103', '1104', '1105'];
      const candidateList = results.map((profile) => {
        return {...profile, jobApplied: jobIds[Math.floor((Math.random() * jobIds.length-1)+1)] }
      })
      
      setCandidates(candidateList);

      // group candidates by jobId
      const jobGroup = candidateList.reduce(function (r, a) {
        r[a.jobApplied] = r[a.jobApplied] || [];
        r[a.jobApplied].push(a);
        return r;
      }, Object.create(null));

      // get job list from service file and add candidate count to this object.

      const list =  getJobList().map((job) => {
        return {
          ...job,
          candidateCount: jobGroup[job.jobId]?.length
        }
      })

      setJobList(list);
    
      console.log('candidates loaded')
    })
  }, [])

  return (
    <div className="App">
      <Header />
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route path="/" element={<JobBoardComponent jobList={jobList} />} exact/>
            <Route path="/job/:jobId" element={<KanbanBoardComponent candidateList={candidates} />} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default App;
