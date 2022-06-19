const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");
const { Contact } = require("../../models/contacts");
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

const contSchema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string()
		.length(10)
		.pattern(/^[0-9]+$/)
		.required(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
});

router.get("/", authenticate, async (req, res, next) => {
	try {
		const { page = 1, limit = 20 } = req.query;
		const { _id } = req.user;
		const skip = (page - 1) * limit;
		const contacts = await Contact.find(
			{ owner: _id },
			"-createdAt -updateAt",
			{ skip, limit: +limit }
		);
		res.status(200).json({
			status: "success",
			contacts,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const response = await Contact.findOne({ _id: contactId });

		if (!response) {
			throw new NotFound(`Id ${contactId} not found `);
		}
		res.status(200).json({
			status: "success",
			code: 200,
			data: { response },
		});
	} catch (error) {
		next(error);
	}
});

router.post("/", authenticate, async (req, res, next) => {
	try {
		const data = req.body;
		const { error } = contSchema.validate(data);

		if (error) {
			error.status = 400;
			throw error;
		}

		const { _id } = req.user;
		const newContact = await Contact.create({ ...req.body, owner: _id });

		res.status(201).json({
			status: "success",
			code: 201,
			data: { newContact },
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const response = await Contact.findByIdAndRemove(contactId);
		if (!response) {
			throw new NotFound(`Id ${contactId} not found `);
		}
		res.status(200).json({
			status: "success",
			code: 200,
			data: { response },
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const data = req.body;

		const { error } = contSchema.validate(data);

		if (error) {
			error.status = 400;
			throw error;
		}

		const response = await Contact.findByIdAndUpdate(contactId, data, {
			new: true,
		});

		if (!response) {
			throw new NotFound(`Id ${contactId} not found `);
		}
		res.status(200).json({
			status: "success",
			code: 200,
			data: { response },
		});
	} catch (error) {
		if (error.message.includes("validation failed")) {
			error.statis = 400;
		}
		next(error);
	}
});

router.patch("/:contactId/favorite", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const data = req.body;
		const favData = "favorite" in data;
		if (!favData) {
			throw new NotFound("missing field favorite");
		}

		const updateContacts = await Contact.findByIdAndUpdate(
			contactId,
			data,
			{ new: true }
		);
		if (!updateContacts) {
			throw new BadRequest();
		}
		res.json(updateContacts);
	} catch (error) {
		if (error.message.includes("validation failed")) {
			error.statis = 404;
		}
		next(error);
	}
});

// router.post("/", async (req, res, next) => {
// 	try {
// 		const newContacts = await Contact.create(req.body);
// 		res.status(201).json(newContacts);
// 	} catch (error) {
// 		if (error.message.includes("validation failed")) {
// 			error.statis = 400;
// 		}
// 		next(error);
// 	}
// });
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
