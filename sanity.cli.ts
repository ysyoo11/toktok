import { defineCliConfig } from 'sanity/cli';

import { ENV } from '@/utils/env';

const projectId = ENV.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = ENV.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });
