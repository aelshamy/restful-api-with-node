import { Router } from 'express';
import {
  deleteContact,
  getContact,
  getContacts,
  postContact,
  putContact
} from '../controllers';
import { AsyncWrapper } from '../utils';

const router = Router();

// GET /contacts
router.get('/', AsyncWrapper(getContacts));

// GET /contacts/:id
router.get('/:id', AsyncWrapper(getContact));

// POST /contacts/
router.post('/:id', AsyncWrapper(postContact));

// PUT /contacts/:ID
router.put('/:id', AsyncWrapper(putContact));

// DELETE /contacts/:ID
router.put('/:id', AsyncWrapper(deleteContact));

export const contacts = {
  baseUrl: '/contacts',
  router
};
