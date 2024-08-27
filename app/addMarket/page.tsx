'use client';

import React, { useEffect, useState } from 'react';
import { GET, POST } from '../api/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Page() {
  const [markets, setMarkets] = useState<{ place: string }[]>([]); // Changed type
  const [marketName, setMarketName] = useState<string>(''); // Fixed typo
  const router = useRouter();

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const data = (await GET('/markets/allMarkets')) as any;
        console.log(data);
        setMarkets(data.markets);
      } catch (error) {
        console.error('Failed to fetch markets', error);
      }
    };

    fetchMarkets();
  }, []);

  const addMarket = async () => {
    const toastId = toast.loading('Adding Market...');

    try {
      const response = (await POST('/markets/addMarket', {
        place: marketName, // Fixed typo
      })) as any;
      console.log(response);
      if (response?.status === 201) {
        // Changed == to ===
        setMarkets((prev) => [...prev, { place: marketName }]); // Added object structure

        setMarketName('');
        toast.success('Added successfully', {
          // Fixed typo
          id: toastId,
        });
        return;
      }
      toast.error(response.data.error || 'Something went wrong', {
        // Fixed typo
        id: toastId,
      });
    } catch (error) {
      toast.error('An error occurred', {
        // Changed error message
        id: toastId,
      });
    }
  };

  return (
    <div className='flex justify-center items-center flex-col text-white p-2'>
      <Toaster gutter={1} position='top-left' />
      <div>
        <h1>Add New Market</h1>
        <div className='flex gap-2'>
          <input
            className='outline-none border p-1 rounded text-black'
            type='text'
            placeholder='Market Name'
            value={marketName} // Fixed typo
            onChange={(e) => setMarketName(e.target.value)} // Simplified
          />
          <button
            onClick={() => addMarket()}
            className='bg-lime-600 rounded p-2'
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h1>Markets</h1>
        <div className='flex flex-wrap gap-2'>
          {markets.map((market, index) => (
            <div
              key={market.place} // Changed key to use market.place
              className='flex justify-between items-center border-2 border-lime-500 text-black p-2 rounded'
            >
              {market.place}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
