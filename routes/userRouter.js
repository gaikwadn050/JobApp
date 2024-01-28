import { Router } from 'express';
import { getApplicationStats, getcurrentUser, updatetUser } from '../controller/userController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
const router = Router();


router.get('/current-user', getcurrentUser);
router.get('/admin/app-stats',[ authorizePermissions('admin'),
getApplicationStats,]);
router.patch('/update-user',validateUpdateUserInput, updatetUser)


export default router;