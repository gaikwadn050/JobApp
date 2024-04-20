import React from 'react'
import Job from "./Job"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useAllJobsContext } from "../pages/AllJobs"
import PageBtnContainer from "./PageBtnContainer"
const JobsContainer = () => {
    const { data } = useAllJobsContext();
    console.log(data, "JobContainer")

    const { totalJobs, numOfPages } = data.data;
    if (!data || !data.data.jobs || data.data.jobs.length === 0) {
        return (
            <Wrapper>
                <h2> No jobs to Display....</h2>
            </Wrapper>)
    }
    const { jobs } = data.data;
    // console.log(jobs, "jobs")
    return (
        <Wrapper>
            <h5>{totalJobs} job {jobs.length > 1 && 's'} found</h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    return (
                        <Job key={job._id} {...job} />
                    )
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer
