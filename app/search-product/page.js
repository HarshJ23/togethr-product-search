'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { History } from '@/components/History';
import { ProtectedRoute } from '@/ProtectedRoute';
import { useRouter } from 'next/navigation';
import supabase from '@/supabase'; // Import your Supabase configuration

export default function Page() {
  const [answer, setAnswer] = useState(null);
  const [query, setQuery] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

//   const { data: { user } } = supabase.auth.getUser();
//   console.log(user)

const router = useRouter();

  const addSearchHistory = async (userId, query, answer) => {
    await supabase
      .from('search_history')
      .insert([
        {
          user_id: userId,
          query,
          output:answer,
          timestamp: new Date().toISOString(),
        },
      ]);
  };

  const onSearchProduct = async (query) => {
    try {
      const question = 'Give pros and cons by analyzing the specs and features of the mobile given in query';

      const response = await fetch('http://localhost:4000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);

      // Store search history in Supabase
      const user = supabase.auth.getSession()?.user;

      if (user) {
        await addSearchHistory(user.id, query, data.answer);
      }

      // Update search history with new query and result
      setSearchHistory((prevHistory) => [
        {
          query,
          result: answer,
        },
        ...prevHistory,
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign-out error:', error.message);
      } else {
        console.log('Sign-out successful.');
        router.push('/');
      }
    } catch (error) {
      console.error('Error during sign-out:', error.message);
    }
  };

  return (
  //  <ProtectedRoute>


      <div>
        <div className="flex flex-col m-6 gap-y-3">
          <h1 className="font-bold text-4xl">Search Product</h1>
          <div className='flex flex-row gap-4'>

          <History searchHistory={searchHistory} />
          <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
          <Link href="/" className="font-semibold hover:underline">
            Back to home
          </Link>

        </div>

        <footer className="flex justify-center border-t border-t-foreground/10 items-center fixed bottom-0 left-0 right-0 mx-auto w-2/3 p-8 text-center text-xs">
          <div className="flex w-full max-w-sm items-center space-x-2 justify-center">
            <Input
              type="text"
              placeholder="Search for product e.g. - Iphone 14"
              className="transition ease-linear"
              onChange={(e) => setQuery(e.target.value)}
              />
            <Button type="submit" onClick={() => onSearchProduct(query)}>
              <FaArrowUp />
            </Button>
          </div>
        </footer>

        <div className='flex justify-center'>
          {answer && (
            <div className="mt-4 mx-auto justify-center font-medium">
              <p dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br>') }}></p>
            </div>
          )}
        </div>
      </div>
          // </ProtectedRoute>
   
  );
}
