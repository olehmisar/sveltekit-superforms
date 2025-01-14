import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from '$lib/server';
import { fail } from '@sveltejs/kit';
import { schema } from './schemas';

export const load = (async () => {
  const form = await superValidate(schema);

  // Always return { form } in load and form actions.
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, schema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      return fail(400, { form });
    }

    if (form.data.password !== form.data.confirmPassword) {
      setError(form, 'confirmPassword', 'Passwords do not match');
      return fail(400, { form });
    }

    return message(form, 'Submitted!');
  }
} satisfies Actions;
