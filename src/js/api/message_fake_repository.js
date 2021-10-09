/**
 * Created by Enrique Nieto Martínez on 09/10/21
 */

import {v4 as uuidv4} from "uuid";

export class MessageFakeRepository {

	#items;

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
	}

	async add(message) {
		console.group("MessageFakeRepository: add()")
		console.log("adding...")
		console.log(message)
		console.groupEnd()
		this.#items.push({...message});
	}

	async list() {
		console.group("MessageFakeRepository: list()")
		console.log("Listing...")
		console.groupEnd()
		return [...this.#items];
	}

	async find(text) {
		return this.#items.filter(x => x.content.includes(text));
	}

}
