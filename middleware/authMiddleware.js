//import { verify } from "jsonwebtoken";
import { UnauthenticatedError, UnauthorizedError } from "../errors/custonErros.js";
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser =  (req, res, next) => {
    const { token } = (req.cookies)
    if (!token) throw new UnauthenticatedError('authentication invalid')
    try {
        const { userId, role } = verifyJWT(token)
        req.user = { userId, role }
        next();
    } catch (error) {
        if (!token) throw new UnauthenticatedError('authentication invalid')
    }
};

export const authorizePermissions = (...roles ) => {
    return (req,res,nest) => {
        console.log(roles)
if(!roles.includes(req.user.role)){
    throw new UnauthorizedError('Unauthorized acces to route')
}
next()
    }

}