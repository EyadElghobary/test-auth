import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
// // import { getServerSession } from 'next-auth/next';
import { getProviders, getCsrfToken } from 'next-auth/react';
// // import { authOptions } from '../../api/auth/[...nextauth]/options';

export default function LoginPage({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!providers) {
    return <h1>No Providers</h1>;
  }
  return (
    <>
      <form method='post' action='/api/auth/callback/credentials'>
        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
        <label>
          Username
          <input name='username' type='text' />
        </label>
        <label>
          Password
          <input name='password' type='password' />
        </label>
        <button type='submit'>Sign in</button>
      </form>
      {Object.values(providers).map((provider) => {
        if (provider.name === 'Credentials') {
          return;
        }
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Continue with {provider.name}
            </button>
          </div>
        );
      })}

      <div>------- or -------</div>
      <div>
        Don't have an account? <Link href='../Register'>SignUp</Link>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // I tried this methed before to bypass the getProviders() method
  // const res = await fetch('http://localhost:3000/api/auth/providers', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  // });

  // if (!res.ok) {
  //   // Handle the case where the response is not successful
  //   throw new Error('Network response was not ok');
  // }

  // const providers = await res.json(); // Parse the response body as JSON data

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
