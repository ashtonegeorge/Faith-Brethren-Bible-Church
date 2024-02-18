import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'; // Replace 'deskTool' with 'structureTool'
import schemas from './sanity/schemas';

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  title: 'Faith Brethren Bible Church',
  apiVersion: '2023-12-19',
  basePath: '/admin',
  plugins: [structureTool()], // Replace 'deskTool' with 'structureTool'
  schema: { types: schemas }
});

export default config;