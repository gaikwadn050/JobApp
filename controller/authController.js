import { StatusCodes } from "http-status-codes";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs"
import { comparePassword, hashedPassword } from "../utils/passwordUtil.js";
import { UnauthenticatedError } from "../errors/custonErros.js";
import { createJWT } from "../utils/tokenUtil.js";
export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount ? 'admin' : 'user';
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const hashed = await hashedPassword(req.body.password)
    req.body.password = hashed
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: "user is created" })
};

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const isPasswortCorrect = await comparePassword(req.body.password, user.password)
    const isValidUser = user && isPasswortCorrect
    if (!isValidUser) {
        throw new UnauthenticatedError("invalid Credentials")
    }
    const token = createJWT({ userId: user._id, role: user.role })

    const OneDAy = 1000 * 60 * 60 * 24
    res.cookie('token', token,
        {
            httpOnly: true,
            expires: new Date(Date.now() + OneDAy),
            secure: process.env.NODE_ENV === 'production',
        }
    )
    res.status(StatusCodes.OK).json({ msg: 'user logged in' })
};


export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

