import { fail } from '@sveltejs/kit';
import { superValidate } from '$lib/server';
import { z } from 'zod';

const postSchema = z.object({
  questions: z
    .object({
      text: z.string(),
      generated: z.boolean()
    })
    .array()
    .min(1, {
      message: 'Must have at least one question'
    })
});

export const load = async () => {
  const form = await superValidate(postSchema);
  return { form };
};

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const form = await superValidate(formData, postSchema);

    console.log('🚀 ~ file: +page.server.ts:31 ~ default: ~ form:', form);

    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    return { form };
  }
};
