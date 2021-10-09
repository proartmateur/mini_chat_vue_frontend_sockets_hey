/**
 * Created by Enrique Nieto Martínez on 09/10/21
 */

import {v4 as uuidv4} from "uuid";

export class MessageFakeRepository {

	#items;
	#past_items;

	constructor() {
		this.#items = [
			{
				id: uuidv4(),
				content: "Hola Mundo Chat!",
				date: "2021-10-01",
				time: "08:25",
				type: "out",
				user: "Enrique Nieto Martínez 123"
			},
			{
				id: uuidv4(),
				content: "Hola me encantan tus libros, por cierto te veo el fin",
				date: "2021-10-01",
				time: "08:25",
				type: "in",
				user: "Usagui"
			},
			{
				id: uuidv4(),
				content: "Perfecto, quieres que pase por tí, o nos vemos en algún lugar?",
				date: "2021-10-01",
				time: "08:26",
				type: "out",
				user: "Enrique Nieto Martínez 123"
			},
			{
				id: uuidv4(),
				content: "Te veo en el centro, de allí me llevas a comer, va?",
				date: "2021-10-01",
				time: "08:26",
				type: "in",
				user: "Usagui"
			},
			{
				id: uuidv4(),
				content: "Allí te veo, te deseo un lindo día",
				date: "2021-10-01",
				time: "08:27",
				type: "out",
				user: "Enrique Nieto Martínez 123"
			},
			{
				id: uuidv4(),
				content: "Ya quiero verte Mamoru",
				date: "2021-10-01",
				time: "08:27",
				type: "in",
				user: "Usagui"
			},
		];
		this.#past_items = [
			{
				id: uuidv4(),
				content: "Usagui, te amo!",
				date: "2021-09-18",
				time: "06:00",
				type: "out",
				user: "Enrique Nieto Martínez 123"
			},
			{
				id: uuidv4(),
				content: "Yo a ti... ya no, pero sigue intentando.",
				date: "2021-09-18",
				time: "07:30",
				type: "in",
				user: "Usagui"
			},
			{
				id: uuidv4(),
				content: "No hay problema, al fin que ni quería XD",
				date: "2021-09-18",
				time: "07:31",
				type: "out",
				user: "Enrique Nieto Martínez 123"
			},
			{
				id: uuidv4(),
				content: "Si no quieres para qué me ilusionas?",
				date: "2021-09-18",
				time: "07:31",
				type: "in",
				user: "Usagui"
			},
			{
				id: uuidv4(),
				content: "Entonces si quieres también?",
				date: "2021-09-18",
				time: "07:32",
				type: "out",
				user: "Enrique Nieto Martínez 123"
			},
			{
				id: uuidv4(),
				content: "Obvio menso, pero me haces enojar algunas ocasiones, también te amo pero de lejitos",
				date: "2021-09-18",
				time: "07:32",
				type: "in",
				user: "Usagui"
			},
		];
	}

	async add(message) {
		console.group("MessageFakeRepository: add()");
		console.log("adding...");
		console.log(message);
		console.groupEnd();
		this.#items.push({...message});
	}

	async list() {
		console.group("MessageFakeRepository: list()");
		console.log("Listing...");
		console.groupEnd();
		return [...this.#items];
	}

	async listDeep(start_bubble) {
		this.#items = [...this.#past_items, ...this.#items]
		return this.#items
	}

	async find(text) {
		return this.#items.filter(x => x.content
			.toUpperCase().includes(text.toUpperCase()));
	}

	async findDeep(text) {
		return this.#past_items.filter(x => x.content
			.toUpperCase().includes(text.toUpperCase()));
	}

}
