import {MessageApiRepository} from "../../api/message_api_repository";
import {v4 as uuidv4} from "uuid";

/**
 * Created by Enrique Nieto Martínez on 09/10/21
 */
it("List", async () => {
	const url = "http://localhost:3009/hey/api";

	const repo = new MessageApiRepository(url);
	const messages = await repo.list();
	const messages2 = await repo.list();
	const messages3 = await repo.list();

	expect(messages.length).toBeGreaterThanOrEqual(3);
	expect(messages2.length).toBeGreaterThanOrEqual(3);
	expect(messages3.length).toBeGreaterThanOrEqual(3);

});


it("Add", async () => {
	const url = "http://localhost:3009/hey/api";

	const repo = new MessageApiRepository(url);
	const messages = await repo.list();
	console.log(messages.length);

	await repo.add({
		id: uuidv4(),
		content: "Desde Jest 2",
		date: "2021-10-01",
		time: "08:25",
		type: "out",
		user: "JEST User"
	});
	const messages2 = await repo.list();
	console.log(messages2.length);
	console.log(messages[0]);
	expect(messages2.length).toBeGreaterThan(messages.length);
	expect(messages2.length).toBeGreaterThanOrEqual(3);

});


it("Find", async () => {
	const url = "http://localhost:3009/hey/api";

	const repo = new MessageApiRepository(url);
	const lista = await repo.list();
	await repo.add({
		id: uuidv4(),
		content: "Finding from Jest",
		date: "2021-10-01",
		time: "08:25",
		type: "out",
		user: "JEST"
	});

	const finded = await repo.find("finding");
	console.log(finded.length);
	expect(finded.length).toBeGreaterThan(0);

});


it("Find Deep",     async () => {
	const url = "http://localhost:3009/hey/api";

	const repo = new MessageApiRepository(url);
	const lista = await repo.list();

	await repo.add({
		id: uuidv4(),
		content: "Finding from Jest",
		date: "2021-10-01",
		time: "08:25",
		type: "out",
		user: "JEST"
	});

	const finded = await repo.findDeep("finding");
	console.log(finded);
	expect(finded.length).toBeGreaterThan(0);

});


it("Find Date",     async () => {
	const url = "http://localhost:3009/hey/api";

	const repo = new MessageApiRepository(url);

	const finded = await repo.findByDate("2021-10-08");
	console.log(finded);
	expect(finded.length).toBeGreaterThan(1);

});
