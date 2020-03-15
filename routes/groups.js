import { Router } from 'express';
import { getGroups, getGroupsForContact } from '../controllers';
import { AsyncWrapper } from '../utils/';

const router = Router();

// GET /groups
router.get('/', AsyncWrapper(getGroups));

// GET /groups/:contactId
router.get('/:contactId', AsyncWrapper(getGroupsForContact));

// DELETE /contacts/:Id
router.delete('/:id', () => null);

export const groups = {
  baseUrl: '/groups',
  router
};
