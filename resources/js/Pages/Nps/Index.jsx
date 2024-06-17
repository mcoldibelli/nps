import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import { FaRegFrown, FaRegMeh, FaRegSmile } from 'react-icons/fa';
import ApplicationLogo from '../../Components/ApplicationLogo';

export default function Index({ auth }) {
  const { data, setData, post, reset } = useForm({
    score: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('nps.store'), { onSuccess: () => reset() });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="NPS" />

      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md p-4 sm:p-6 lg:p-8">
          <form method="POST" action="/nps" onSubmit={submit} className="flex justify-center space-x-16">
            <button
              className="rounded-full p-16 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              type="submit"
              onClick={() => setData('score', -1)}
            >
              <FaRegFrown className="text-6xl" />
            </button>
            <button
              className="rounded-full p-16 bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              type="submit"
              onClick={() => setData('score', 0)}
            >
              <FaRegMeh className="text-6xl" />
            </button>
            <button
              className="rounded-full p-16 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="submit"
              onClick={() => setData('score', 1)}
            >
              <FaRegSmile className="text-6xl" />
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
