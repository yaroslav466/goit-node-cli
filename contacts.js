const fs = require("fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");


/*  Розкоментуй і запиши значення */
const contactsPath = path.join(__dirname, "db/contacts.json");


async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  console.log(data)
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
   const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;

}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
   const contacts = await listContacts();
   const index = contacts.findIndex((contact) => contact.id === contactId);
   
  if (index === -1) {
    return null;  
  }

  const [contact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

async function addContact(data) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();

  const newContact = { id: crypto.randomUUID(), ...data };

  contacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
  return newContact;

}

module.exports = {
  listContacts, 
  getContactById,
  removeContact,
  addContact
};