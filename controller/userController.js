import { StatusCodes } from "http-status-codes";
import User from "../models/userModels.js";
import Job from "../models/JobModel.js";

export const getcurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    const userWithoutPassword = user.toJSON()
    res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(StatusCodes.OK).json({ users, jobs })
}

export const updatetUser = async (req, res) => {
    const obj = { ...req.body }
    delete obj.password
    const updateUser = await User.findByIdAndUpdate(req.user.userId, obj)
    res.status(StatusCodes.OK).json({ msg: 'user updated' })
}

