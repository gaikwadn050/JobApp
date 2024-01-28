import Job from "../models/JobModel.js";
import { StatusCodes } from 'http-status-codes'
/*
import { nanoid } from 'nanoid';
let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
];*/


export const getAlljobs = async (req, res) => {
    try {
        let jobs = await Job.find({ createdBy: req.user.userId })
        return res.status(StatusCodes.OK).json({ jobs })
    } catch (error) {
        console.error('Error fetching jobs:', error)
    }
}

export const createJob = async (req, res) => {
    /* const { company, position } = req.body; 
    const job = await JobModel.create({company, position})
     if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
     }
     const id = nanoid(10);
     console.log(id);
    const job = { id, company, position };
    jobs.push(job);
*/
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job });

}


export const findJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    // const job = await Job.find((job) => job.id === id);
    if (!job) {
        throw new NotFoundError(`no job with id : ${id}`)
        return res.status(404).json({ msg: `No job found with ${id}` })
    }
    res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
    /*  const { company, position } = req.body;
      if (!company || !position) {
          return res.status(404).json({ msg: `Please provide company and position` })
      } */
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true })
    if (!job) {
        throw new NotFoundError(`no job with id : ${id}`)
        //return res.status(404).json({ msg: `no job found with id ${id}` })
    }
    /* job.company = company;
   job.position = position; */
    res.status(StatusCodes.OK).json({ msg: 'job modified', job });
}


export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id)
    /*if (!job) {
      throw new NotFoundError(`no job with id : ${id}`)
      //return res.status(404).json({ msg: `no job found with id ${id}` })
  }
 const newJobs = jobs.filter((job) => job.id !== id)
   jobs = newJobs */
    res.status(200).json({ msg: `job deleted `, job: job });
}
