'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  const [answer, setAnswer] = useState(null);
const [query , setQuery] = useState(null);

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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col m-6 gap-y-3">
        <h1 className="font-bold text-4xl">Search Product</h1>

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
            onChange={(e) => {
                // Allow any value to be entered, but remove negative signs
                // e.target.value = e.target.value.replace(/^-/, '');
                setQuery(e.target.value);
              }}
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
  );
}
