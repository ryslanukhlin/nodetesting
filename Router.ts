import { Router } from 'express';
import recordController from './controller/record.controller';
import userControler from './controller/user.controller';
import { isCreatedUser } from './middleware/isCreatedUser';
import { validResult } from './middleware/validation';
import { validRegisterChema } from './middleware/validation/validRegistration';
import { upload } from './Multer';

const router = Router();

router.post('/register', validRegisterChema, validResult, isCreatedUser, userControler.register);

router.post('/login', userControler.login);

router.get('/records/:page', recordController.getRecords);

router.patch('/record/:recordId', upload.single('message'), recordController.editRecord);

router.delete('/record/:recordId', recordController.deleteRecord);

export default router;
