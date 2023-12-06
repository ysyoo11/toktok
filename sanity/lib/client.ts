import { createClient } from 'next-sanity';

import { ENV } from '@/utils/env';

import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: ENV.SANITY_API_TOKEN,
});
