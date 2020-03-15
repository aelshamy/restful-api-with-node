import mongoos from 'mongoose';

const contactSchema = new mongoos.Schema({
  firstName: String,
  lastName: String,
  company: String,
  jobTitle: String,
  address: String,
  city: String,
  country: String,
  primaryContactNumber: String,
  otherContactNumbers: [String],
  primaryEmailAddress: String,
  otherEmailAddresses: [String],
  groups: [String],
  socialMedia: [{ name: String, link: String }]
});

export const Contact = mongoos.model('Contact', contactSchema);
