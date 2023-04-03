import type { PageServerLoad } from './$types';
import { superValidate } from '$lib/server';
import { schemaDto } from './schema';

export const load = (async () => {
  const form = await superValidate(null, schemaDto);
  return { form };
}) satisfies PageServerLoad;