import { Router } from 'express';
import { rootControllers } from '../controllers';
import { AsyncWrapper } from '../utils/asyncWrapper';

const rootRouter = Router();

//GET /V1/
rootRouter.get('/', AsyncWrapper(rootControllers.getRoot));

//POST /V1/
rootRouter.post('/', AsyncWrapper(rootControllers.postRoot));

//PUT /V1/
rootRouter.put('/', AsyncWrapper(rootControllers.putRoot));

//DELETE /V1/
rootRouter.delete('/', AsyncWrapper(rootControllers.deleteRoot));

export { rootRouter };
