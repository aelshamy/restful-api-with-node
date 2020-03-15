import { ObjectID } from 'bson';
import { Contact } from '../models';
import { errorHandler, fakeContacts } from '../utils';

export const getContacts = async (_, res) => {
  const contacts = await Contact.find();
  res.format({
    text: () => {
      const contactsAsText = contacts
        .map(contact => Object.entries(contact).map(t => t.join(':')))
        .join('\n\n ===========================>>   \n\n');
      res.send(contactsAsText);
    },
    html: () => {
      const html = [
        `<table style="border:1px solid black;">`,
        `<th style="border:1px solid black;background:red;">Contact ID</th>`,
        `<th style="border:1px solid black;background:black; color:white;">Contact Data</th>`
      ];

      contacts.forEach(({ _id, ...contact }) => {
        html.push(`
          <tr style="border:1px solid black;">
          <td style="border:1px solid black; background:yellow">${_id}</td>
          <td style="border:1px solid black;">${Object.entries(contact)
            .map(([key, value]) => {
              return `<p><b>${key}</b>: ${JSON.stringify(value).replace(
                /"/g,
                ''
              )}</p>`;
            })
            .join('\n')} </td>
          </tr>
        `);
      });
      res.send(html.join('\n'));
    },
    json: () => res.send(contacts)
  });
};

export const getContact = async (req, res, next) => {
  const contactId = req.params.id;
  contactId || next(errorHandler('Unknown contact', 422));

  const contact = await Contact.findOne({
    _id: new ObjectID(contactId)
  });

  res.json(contact);
};

export const postContact = async (req, res, next) => {
  const contact = req.body;
  (contact && contact.primaryContactNumber) ||
    next(errorHandler('Please submit valid contact', 422));

  const newContact = new Contact({ ...contact });

  try {
    await newContact.save();
    res.json({ message: 'Contact created' });
  } catch (error) {
    next(errorHandler('No data inserted'));
  }
};

export const postContactMany = async (_, res, next) => {
  try {
    await Contact.insertMany([...fakeContacts.values()]);
    res.json({ message: 'Many contacts generated' });
  } catch (error) {
    next(errorHandler('There was a problem generating many contacts'));
  }
};

export const putContact = async (req, res, next) => {
  const contactId = req.params.id;
  const contact = req.body;
  contactId || next(errorHandler('Please enter a contact ID', 422));
  (contact && contact.primaryContactNumber) ||
    next(errorHandler('Please submit valid contact', 422));

  try {
    await Contact.updateOne(
      { _id: new ObjectID(contactId) },
      { $set: contact }
    );
    res.json({ message: 'Contact upated' });
  } catch (error) {
    next(errorHandler('No data inserted'));
  }
};

export const deleteContact = async (req, res, next) => {
  const contactId = req.params.id;
  contactId || next(errorHandler('Please enter a contact ID', 422));

  try {
    await Contact.deleteOne({
      _id: new ObjectID(contactId)
    });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(errorHandler('No data deleted'));
  }
};

export const deleteAllContact = async (_, res, next) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: 'All contacts deleted' });
  } catch (error) {
    next(errorHandler('There was a problem deleting all contacts'));
  }
};
