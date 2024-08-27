'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function Dashboard() {
  const router = useRouter();
  return (
    <div className='flex flex-col justify- items-center gap-2'>
      <h1>Dashboard</h1>
      <div
        onClick={() => router.push('addMarket')}
        className=' border-green-500 border-2 p-2 rounded text-black'
      >
        Add market
      </div>
      <div
        onClick={() => router.push('addProduct')}
        className=' border-green-500 border-2 p-2 rounded text-black'
      >
        Add Product
      </div>
      <div
        onClick={() => router.push('updatePrice')}
        className=' border-green-500 border-2 p-2 rounded text-black'
      >
        update price
      </div>
    </div>
  );
}

export default Dashboard;
