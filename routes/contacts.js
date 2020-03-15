import { Router } from 'express';
import {
  deleteAllContact,
  deleteContact,
  getContact,
  getContacts,
  postContact,
  postContactMany,
  putContact
} from '../controllers';
import { AsyncWrapper } from '../utils';

const router = Router();

// GET /contacts
router.get('/', AsyncWrapper(getContacts));

// GET /contacts/:id
router.get('/:id', AsyncWrapper(getContact));

// POST /contacts
router.post('/', AsyncWrapper(postContact));

// POST /contacts/many
router.post('/many', AsyncWrapper(postContactMany));

// PUT /contacts/:ID
router.put('/:id', AsyncWrapper(putContact));

// DELETE /contacts/:ID
router.delete('/:id', AsyncWrapper(deleteContact));

// DELETE /contacts
router.delete('/', AsyncWrapper(deleteAllContact));

export const contacts = {
  baseUrl: '/contacts',
  router
};
