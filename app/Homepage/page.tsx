import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

async function HomePage({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!session) {
    // redirect('../api/auth/signin');
    return null;
  }

  return <div>Welcome {session.user?.name}</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default HomePage;
