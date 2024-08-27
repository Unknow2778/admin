'use client';

import { GET, POST } from '@/app/api/api';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function addProductPrice() {
  const { slug } = useParams();
  console.log(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [updateProduct, setUpdateProduct] = useState<any>({
    productId: '',
    price: 0,
    name: '',
  });

  useEffect(() => {
    const fetchproducts = async () => {
      const res = (await GET(`/markets/products`)) as any;
      console.log(res.products);
      setProducts(res.products);
    };
    fetchproducts();
  }, []);

  const handleAddProduct = async (productId: string) => {
    const res = (await POST(`/markets/addProductPrice`, {
      productId: productId,
      marketName: slug[0],
      price: 100,
    })) as any;

    if (res.success) {
      toast.success('Product added successfully');
      setUpdateProduct({ productId: '', name: '' });
    } else {
      toast.error('Error adding product');
      setUpdateProduct({ productId: '', name: '' });
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen ${
        updateProduct.productId ? 'bg-black/20' : ''
      }`}
    >
      <Toaster gutter={1} position='top-left' />
      addProductPrice
      {updateProduct.productId && (
        <div className='flex z-50 flex-col gap-2 absolute top-1/2 bg-lime-500/20 backdrop-blur-sm p-4 rounded-md'>
          <span className='text-lime-600 font-bold text-lg'>
            {updateProduct.name}
          </span>
          <input
            className='bg-transparent border-2 border-lime-500 rounded-md p-2 outline-none'
            type='number'
            placeholder='Price'
          />
          <div className='flex justify-between text-white'>
            <button
              className='bg-lime-500 p-2 rounded-md '
              onClick={() => setUpdateProduct({ productId: '', name: '' })}
            >
              Cancel
            </button>
            <button
              className='bg-lime-500 p-2 rounded-md '
              onClick={() => handleAddProduct(updateProduct.productId)}
            >
              Add Product
            </button>
          </div>
        </div>
      )}
      <div className='flex  gap-2'>
        {products.map((product) => (
          <div
            onClick={() =>
              setUpdateProduct({ productId: product._id, name: product.name })
            }
            className='flex  p-2 border-2 border-lime-500 rounded-md'
            key={product._id}
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default addProductPrice;
