import { ObjectID } from 'bson';
import { Contact } from '../models';
import { errorHandler } from '../utils';

export const getGroups = async (_, res) => {
  const contacts = await Contact.find();
  res.json([...new Set(contacts.flatMap(contact => contact.groups))]);
};

export const getGroupsForContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  contactId || next(errorHandler('Please Enter a contact ID', 422));
  try {
    const contact = await Contact.findOne({
      _id: new ObjectID(contactId)
    });
    res.json(contact.groups);
  } catch (error) {
    next(errorHandler('No groups'));
  }
};
