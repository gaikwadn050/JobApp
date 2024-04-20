//import { verify } from "jsonwebtoken";
import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/custonErros.js";
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = (req, res, next) => {
    const { token } = (req.cookies)

    if (!token) throw new UnauthenticatedError('authentication invalid')
    try {
        const { userId, role } = verifyJWT(token)
        const testUser = userId === "65d9c182a718dd69f439716c"
        req.user = { userId, role, testUser }
        next();
    } catch (error) {
        if (!token) throw new UnauthenticatedError('authentication invalid')
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        console.log(roles)
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized acces to route')
        }
        next()
    }

}



export const checkForTestUser = (req,res,next ) => {
   if(req.user.testUser) throw new BadRequestError('Demo User. Read Only')
   next();
}