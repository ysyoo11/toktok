import { createClient } from 'next-sanity';

import { ENV } from '@/utils/env';

export const client = createClient({
  apiVersion: '2023-12-03',
  dataset: ENV.SANITY_DATASET,
  projectId: ENV.SANITY_PROJECT_ID,
  useCdn: false,
  token: ENV.SANITY_API_TOKEN,
});
