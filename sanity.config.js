import { defineConfig } from 'sanity';
import schemas from './sanity/schemas';

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  title: 'Faith Brethren Bible Church',
  apiVersion: '2023-12-19',
  basePath: '/admin',
  plugins: [],
  schema: { types: schemas }
});

export default config;