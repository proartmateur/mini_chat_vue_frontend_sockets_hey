/**
 * Created by Enrique Nieto Martínez on 09/10/21
 */

const {MessageFakeRepository} = require("../../api/message_fake_repository");
const {v4: uuidv4} = require("uuid");
it("MessageFakeRepository: LIST", async () => {
	const repo = new MessageFakeRepository();
	const messages = await repo.list();

	expect(messages.length).toBe(6);
});

it("MessageFakeRepository: FIND", async () => {
	const repo = new MessageFakeRepository();
	const messages = await repo.find("Hola");

	expect(messages.length).toBe(2);
});

it("MessageFakeRepository: ADD", async () => {
	const repo = new MessageFakeRepository();
	await repo.add({
		id: uuidv4(),
		content: "Sabes que ya se me pasó el enojo?",
		date: "2021-10-01",
		time: "08:28",
		type: "in",
		user: "Usagui"
	});

	const messages = await repo.list()
	expect(messages.length).toBe(7);
});
