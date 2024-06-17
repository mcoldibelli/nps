import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import { FaRegFrown, FaRegMeh, FaRegSmile } from 'react-icons/fa';
import FeedbackButton from '@/Components/FeedbackButton';

export default function Index({ auth, flash }) {
  const { data, setData, post, reset } = useForm({
    score: null,
  });
  const [showFlash, setShowFlash] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route('nps.store'), { onSuccess: () => reset() });
  };

  useEffect(() => {
    if (flash.success) {
      setShowFlash(true);
      const timer = setTimeout(() => {
        setShowFlash(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="NPS" />

      {showFlash && (
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-50 px-24 py-12 mb-4 rounded-lg bg-green-100 text-green-800 text-3xl shadow-lg">
          {flash.success}
        </div>
      )}

      <div className="flex justify-center items-center h-screen relative">
        <div className="max-w-md p-4 sm:p-6 lg:p-8">
          <form method="POST" action="/nps" onSubmit={submit} className="flex justify-center space-x-16">
            <FeedbackButton color="red" onClick={() => setData('score', -1)}>
              <FaRegFrown className="text-8xl" />
            </FeedbackButton>
            <FeedbackButton color="yellow" onClick={() => setData('score', 0)}>
              <FaRegMeh className="text-8xl" />
            </FeedbackButton>
            <FeedbackButton color="green" onClick={() => setData('score', 1)}>
              <FaRegSmile className="text-8xl" />
            </FeedbackButton>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
