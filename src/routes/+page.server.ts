import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const userSchema = z.object({
	id: z.string().min(1),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	email: z.string().email()
});

const createUserSchema = userSchema.extend({
	id: userSchema.shape.id.optional()
});

export const load = async (event) => {
	const form = await superValidate(event, userSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, createUserSchema);
		console.log(form);

		// await new Promise((r) => setTimeout(r, 2000));

		if (!form.valid) {
			return fail(400, form);
		}

		const id = Math.random().toString().slice(2);
		console.log(id);
		const user = { ...form.data, id };

		form.data = user;
		return message(form, 'User created!');
	}
};
