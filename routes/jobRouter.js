import { Router } from 'express'
const router = Router()
import { deleteJob, findJob, getAlljobs, updateJob, createJob, showStats } from "../controller/jobController.js"
import { validateJobInput, ValidateIdParam } from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'


//router.get('/',getAlljobs )
//router.post('/', createJob ) 




router.route('/').get(getAlljobs).post(checkForTestUser, validateJobInput, createJob)

router.route('/stats').get(showStats)
router.route('/:id').get(ValidateIdParam, findJob)
    .patch(checkForTestUser, validateJobInput, ValidateIdParam, updateJob)
    .delete(checkForTestUser, ValidateIdParam, deleteJob)


export default router;