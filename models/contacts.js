const { Schema, model } = require("mongoose");

const contactsSchema = Schema({
	name: {
		type: String,
		required: [true, "Set name for contact"],
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
});

const Contact = model("contact", contactsSchema);

module.exports = Contact;
// const fs = require("fs/promises");
// const path = require("path");
// const { v4 } = require("uuid");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
// 	const response = await fs.readFile(contactsPath);
// 	const allContacts = JSON.parse(response);
// 	console.log(allContacts);
// 	return allContacts;
// };

// const getContactById = async (contactId) => {
// 	const response = await listContacts();
// 	const result = response.find((item) => item.id === contactId);

// 	if (!result) {
// 		return null;
// 	}
// 	return result;
// };

// const removeContact = async (contactId) => {
// 	const response = await listContacts();
// 	const idx = response.findIndex((item) => item.id === contactId);
// 	if (idx === -1) {
// 		return null;
// 	}
// 	const cutContact = response.splice(idx, 1);
// 	await fs.writeFile(contactsPath, JSON.stringify(response, null, "\t"));
// 	return cutContact;
// };

// const addContact = async (data) => {
// 	const contacts = await listContacts();
// 	const newContact = { id: v4(), ...data };
// 	contacts.push(newContact);
// 	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
// 	return newContact;
// };

// const updateContact = async (contactId, { phone, name, email }) => {
// 	const response = await listContacts();
// 	const idx = response.findIndex((item) => item.id === contactId);
// 	if (idx === -1) {
// 		return null;
// 	}
// 	response[idx] = { contactId, phone, name, email };
// 	await fs.writeFile(contactsPath, JSON.stringify(response, null, "\t"));
// 	return response[idx];
// };

// module.exports = {
// 	listContacts,
// 	getContactById,
// 	removeContact,
// 	addContact,
// 	updateContact,
// };
