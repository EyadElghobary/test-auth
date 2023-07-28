import HomePage from './Homepage/page';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/options';

import type { GetServerSidePropsContext } from 'next';

export default function Home({}) {
  // This component should only be rendered when the user is already logged in.
  // Since we are redirecting in getServerSideProps, this component will not be
  // rendered for users without a session.
  // if (providers) {
  //   return (<h1>No Providers</h1>)
  // }
  return <HomePage session={null} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/Homepage' } };
  }

  // If no session exists, redirect the user to the signIn page.
  return {
    redirect: {
      destination: '/app/auth/signIn', // Update this with the correct URL for the signIn page
      permanent: false, // Set this to true if signIn page is a permanent location.
    },
  };
}
