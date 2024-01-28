import { Router } from 'express'
const router = Router()
import { deleteJob, findJob, getAlljobs, updateJob, createJob } from "../controller/jobController.js"
import { validateJobInput, ValidateIdParam } from '../middleware/validationMiddleware.js'


//router.get('/',getAlljobs )
//router.post('/', createJob ) 

router.route('/').get(getAlljobs).post(validateJobInput, createJob)
router.route('/:id').get(ValidateIdParam, findJob)
    .patch(validateJobInput, ValidateIdParam, updateJob)
    .delete(ValidateIdParam, deleteJob)


export default router;