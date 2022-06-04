const express = require("express");
const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");
const Joi = require("joi");
const { Contact } = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const contacts = await Contact.find({});
		res.status(200).json({
			status: "yeah",
			contacts,
		});
	} catch (error) {
		next(error);
	}
});

// const contSchema = Joi.object({
// 	name: Joi.string().required(),
// 	phone: Joi.string()
// 		.length(10)
// 		.pattern(/^[0-9]+$/)
// 		.required(),
// 	email: Joi.string()
// 		.email({ tlds: { allow: false } })
// 		.required(),
// });

// router.get("/:contactId", async (req, res, next) => {
// 	try {
// 		const { contactId } = req.params;
// 		const response = await contactsOperations.getContactById(contactId);

// 		if (!response) {
// 			throw new NotFound(`Id ${contactId} not found `);
// 		}
// 		res.status(200).json({
// 			status: "success",
// 			code: 200,
// 			data: { response },
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.post("/", async (req, res, next) => {
// 	try {
// 		const data = req.body;
// 		const { error } = contSchema.validate(data);

// 		if (error) {
// 			error.status = 400;
// 			throw error;
// 		}

// 		const response = await contactsOperations.addContact(data);
// 		res.status(201).json({
// 			status: "success",
// 			code: 201,
// 			data: { response },
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.delete("/:contactId", async (req, res, next) => {
// 	try {
// 		const { contactId } = req.params;
// 		const response = await contactsOperations.removeContact(contactId);
// 		if (!response) {
// 			throw new NotFound(`Id ${contactId} not found `);
// 		}
// 		res.status(200).json({
// 			status: "success",
// 			code: 200,
// 			data: { response },
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.put("/:contactId", async (req, res, next) => {
// 	try {
// 		const { contactId } = req.params;
// 		const data = req.body;
// 		const { error } = contSchema.validate(data);

// 		if (error) {
// 			error.status = 400;
// 			throw error;
// 		}

// 		const response = await contactsOperations.updateContact(
// 			contactId,
// 			data
// 		);

// 		if (!response) {
// 			throw new NotFound(`Id ${contactId} not found `);
// 		}
// 		res.status(200).json({
// 			status: "success",
// 			code: 200,
// 			data: { response },
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

module.exports = router;
