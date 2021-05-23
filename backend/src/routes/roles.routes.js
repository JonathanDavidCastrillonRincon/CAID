import {Router} from 'express';
const router = Router();

import * as rolesCtrl from '../controllers/roles.controller';

router.get('/',rolesCtrl.getRoles);

router.get('/:id', rolesCtrl.getRole);
router.delete('/:id', rolesCtrl.deleteRole);

export default router;