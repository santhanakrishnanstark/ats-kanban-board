export const getRequestedData = (url) => {
    return fetch(url).then(res => res.json()).then(data => data);
}

export const getJobList = () => {
    return [
        {
            jobId: '1101',
            jobTitle: 'Front End Developer',
            postedDate: 'September 14, 2021',
            location: 'Chennai',
        },
        {
            jobId: '1102',
            jobTitle: 'Software Developer',
            postedDate: 'October 04, 2021',
            location: 'Banglore',
        },
        {
            jobId: '1103',
            jobTitle: 'UI/UX Designer',
            postedDate: 'January 26, 2022',
            location: 'Coimbatore',
        },
        {
            jobId: '1104',
            jobTitle: 'Fullstack Developer',
            postedDate: 'Feb 05, 2022',
            location: 'Chennai',
        },
        {
            jobId: '1105',
            jobTitle: 'Project Manager',
            postedDate: 'December 30, 2021',
            location: 'Pune',
        }
    ]
}