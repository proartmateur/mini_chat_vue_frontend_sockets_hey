/**
 * Created by Enrique Nieto Martínez on 21/08/21
 */

import {Vue} from 'vue';
import {mount} from '@vue/test-utils';

import {render, fireEvent, userEvent} from '@testing-library/vue'

import {portada_vue} from "../../components/solo_texto/portada";



test("Mount Portada Vue", ()=>{
	const wrapper = mount(portada_vue);
	console.log(wrapper.text());
	expect(wrapper.text()).toContain('Fundamentación');
});

test("Mount Portada Vue TL", ()=>{

	const {getByText, getByLabelText} = render(portada_vue);
	const h6 = getByText('Fundamentación');
	console.log(h6)

	//console.log(getByLabelText('Fecha de inicio de la verificación'))
	expect(1).toBe(1);
});


test("Mount Example Vue TL", async ()=>{
	const test_component = {
	data: () => ({
      user: 'Alice',
    }),
	template:`
		<div>
  <div>
    <p>Hi, my name is {{ user }}</p>

    <label for="username">Username:</label>
    <input v-model="user" id="username" name="username" />
  </div>
</div>
	`
};
	const {getByText, getByLabelText} = render(test_component);
	const fisrt = getByText('Hi, my name is Alice');
	const usernameInput = getByLabelText(/username/i)
	await fireEvent.update(usernameInput, 'Bob')
    const second = getByText('Hi, my name is Bob')
	console.log(typeof second)
	console.dir(second)

	//console.log(getByLabelText('Fecha de inicio de la verificación'))
	//expect(second).toBe('<p>Hi, my name is Bob</p>');
});