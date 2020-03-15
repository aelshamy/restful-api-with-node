import { contacts } from '../routes';
import { errorHandler, fakeContacts } from '../utils';

const getGroups = async (_, res) => {
  res.json([
    ...new Set([...fakeContacts].flatMap(([, contact]) => contact.groups))
  ]);
};

const getGroupsForContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  fakeContacts.has(contacts)
    ? res.json(fakeContacts.get(contactId).groups)
    : next(errorHandler('Unknown contact', 422));
};

export { getGroups, getGroupsForContact };
