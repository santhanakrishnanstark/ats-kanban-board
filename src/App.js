import { Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './Components/Header/Header';
import JobBoardComponent from './Components/JobBoardComponent/JobBoardComponent';
import KanbanBoardComponent from './Components/KanbanBoardComponent/KanbanBoardComponent';
import Sidebar from './Components/Sidebar/Sidebar';
import { getJobList, getRequestedData } from './services/getRequestData';

function App() {

  const [candidates, setCandidates] = useState([]);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {

    // set number of candidate profile needed.
    const candidateCount = 100;
    const candidateURL = 'https://randomuser.me/api/?results='+candidateCount;

    // get random candidate profiles from api.
    getRequestedData(candidateURL).then(({results}) => {
      console.log('loading candidates.....')
      const id = toast.loading("Please wait...", {className: 'toast-position' })

      // static job id
      const jobIds = ['1101', '1102', '1103', '1104', '1105'];
      const candidateList = results.map((profile) => {
        return {...profile, jobApplied: jobIds[Math.floor((Math.random() * jobIds.length-1)+1)], jobStatus: 'NEW' }
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
    
      // loading status static extend for 3s.
      console.log('candidates loaded')
      setTimeout(() => {
        // toast.dismiss(toastId.current);
        toast.update(id, { render: "Candidates loaded", type: "success", isLoading: false, autoClose: 0, className: 'toast-position' });
      }, 1000);
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
          <ToastContainer limit={1} />
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
