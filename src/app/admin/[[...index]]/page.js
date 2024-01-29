"use client"

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config.js';

export default function AdminPage() {
  return (
    // embed the Sanity Studio within the app using the NextStudio component
    <NextStudio config={config} />
  
  );
}