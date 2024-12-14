import React from 'react';
import { auth } from '@/auth';

export default async function Private() {

  const session = await auth();

  return (
    <>
      <h1>{JSON.stringify(session)}</h1>
    </>
  );
}