import { body, param, validationResult } from "express-validator"
import { BadRequestError, UnauthorizedError, NotFoundError, UnauthenticatedError } from "../errors/custonErros.js"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import { mongoose } from "mongoose"
import Job from "../models/JobModel.js";
import User from "../models/userModels.js";

const withValidationErrors = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map((error) => error.msg)
            // return res.status(400).json({errors : errorMessage})
            if (errorMessage[0].startsWith('no job')) {
                throw new NotFoundError(errorMessage)
            }
            if (errorMessage[0].startsWith('not authorized')) {
                throw new UnauthorizedError("not authorized to access this route")
            }
            throw new BadRequestError(errorMessage)
        }
        next()
    },]
}

export const validateJobInput = withValidationErrors([
    body("company").notEmpty().withMessage('company is required'),
    body("position").notEmpty().withMessage('position is required'),
    body("jobLocation").notEmpty().withMessage('jobLocation is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage("jobStatus is Required"),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid jobtype value'),
])

export const ValidateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) throw new BadRequestError('invalid MongoDb id')
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id : ${value}`)
        console.log(req.user)
        const isAdmin = req.user.role = 'admin';
        const isOwner = req.user.userId = job.createdBy.toString();
        if (!isAdmin && !isOwner) throw new UnauthorizedError("not authorized to access this route")
    }),
]);


export const ValidateRegister = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail().withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email })
            if (user) {
                throw new BadRequestError('email already exists')
            }
        }),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be 8 caracters long'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required')

])

export const ValidateLogin = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be 8 caracters long'),


])


export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        if (user && user._id.toString() !== req.user.userId) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('location').notEmpty().withMessage('location is required'),
  ]);

