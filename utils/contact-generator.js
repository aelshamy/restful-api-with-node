import { address, company, internet, name, phone, random } from 'faker';

const fakeContacts = new Map();

new Array(3).fill('toto').forEach(() => {
  fakeContacts.set(random.uuid(), {
    firstName: name.firstName(),
    lastName: name.lastName(),
    company: company.companyName(),
    jobTitle: name.jobTitle(),
    address: address.streetAddress(),
    city: address.city(),
    country: address.country(),
    primaryContactumber: phone.phoneNumberFormat(1),
    otherContactNumbers: [
      phone.phoneNumberFormat(1),
      phone.phoneNumberFormat(1)
    ],
    primaryEmailAddress: internet.email(),
    otherEmailAddresses: [internet.email(), internet.email()],
    groups: ['Dev', 'Node.js'],
    socialMedia: [
      { name: 'Linkedin', link: internet.url() },
      { name: 'Twitter', link: internet.url() }
    ]
  });
});

export { fakeContacts };
