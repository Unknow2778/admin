'use client';

import React, { useEffect, useState } from 'react';
import { GET } from '../api/api';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

function page() {
  const [markets, setMarkets] = useState<{ place: string }[]>([]);
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
  return (
    <div className='flex flex-wrap p-4'>
      <Toaster />

      <div className='flex flex-wrap gap-2'>
        {markets?.map((market, index) => (
          <div
            onClick={() => router.push(`updatePrice/${market.place}`)}
            key={index} // Use a unique identifier for the key prop, like `market.id` if available.
            className='flex justify-between items-center border-2 border-green-500 text-black p-2 rounded'
          >
            {market.place}
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
