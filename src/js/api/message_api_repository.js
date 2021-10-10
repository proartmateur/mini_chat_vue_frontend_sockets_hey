/**
 * Created by Enrique Nieto Martínez on 09/10/21
 */

import axios from "axios";

import dayjs from "dayjs";

export class MessageApiRepository {

	#items;
	#original_items;
	#api_url;

	constructor(api_url) {
		this.#items = [];
		this.#original_items = [];
		this.#api_url = api_url;
	}

	async add(message) {
		this.#items.push({...message});
		const url = `${this.#api_url}/messages`;
		const {id, content, user, user_name} = message;
		await axios.post(url, {
			id,
			user_name: user,
			content
		});
	}

	async addFormSocket(message) {
		this.#items.push({...message});
	}

	list({user_name}) {
		console.log("--> LIST():");
		console.log(user_name);
		return new Promise(((resolve, reject) => {

			if (this.#items.length === 0) {
				const url = `${this.#api_url}/messages?page=0&limit=5`;
				axios.get(url)
					.then((response) => {
						this.#items = this.#sortResultItems([...response.data.messages], user_name);
						this.#original_items = [...response.data.messages];
						resolve([...this.#items]);
					}).catch((error) => {

					reject(error);
				});
			} else {
				resolve([...this.#items]);
			}


		}));

	}

	#sortResultItems(items, user_name) {
		const data = [...items];
		const with_type = data.map(x => {
			let type = "in";
			if (x.user_name.toUpperCase() === user_name.toUpperCase()) {
				type = "out";
			}

			return {
				...x,
				type
			};
		});
		return with_type.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
	}

	async listDeep(start_bubble, user_name) {
		const past_items = await this.findByDate(start_bubble.date);
		const now = dayjs().format("YYYY-MM-DD");
		const is_today = now === start_bubble.date;
		const sorted_past_items = this.#sortResultItems(past_items, user_name);

		if (is_today) {
			this.#items = [...sorted_past_items];
		} else {
			this.#items = [...sorted_past_items, ...this.#items];
		}
		return this.#items;
	}

	async find(text) {
		return this.#items.filter(x => x.content
			.toUpperCase().includes(text.toUpperCase()));
	}

	async findDeep(text) {

		const url = `${this.#api_url}/messages/find`;

		const resultados = await axios.post(url, {
			"content_query": text
		});

		return resultados.data;
	}

	async findByDate(date_str) {

		const url = `${this.#api_url}/messages/find_date`;

		const resultados = await axios.post(url, {
			"content_query": date_str
		});

		return resultados.data;
	}

}
