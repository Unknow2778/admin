'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GET, POST } from '../api/api';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  categoryId: any;
  name: string;
  baseUnit: string;
  imageURL: string;
}

interface Category {
  _id: string;
  name: string;
}

function Page() {
  // Capitalize component name
  const [productObj, setProductObj] = useState<Product>({
    categoryId: [],
    name: '',
    baseUnit: 'kg',
    imageURL:
      'https://5.imimg.com/data5/OK/DJ/WH/SELLER-39032470/plastic-vegetable-crate-500x500.jpg',
  });

  //get all categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = (await GET('/markets/categories')) as any;
      setCategories(res.categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchproducts = async () => {
      const res = (await GET('/markets/products')) as any;
      console.log(res.products);
      setProducts(res.products);
    };
    fetchproducts();
  }, []);

  const addVegetable = async () => {
    // Fix spelling and use productObj
    try {
      const res = (await POST('/markets/addProduct', productObj)) as any;
      console.log(res);

      if (res?.status == 201) {
        toast.success('added successfuly');
        return;
      }
      toast.error(res.data.error || 'somthing went wrong');
      console.log(res);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Toaster gutter={1} position='top-left' />
      {categories?.map((category, index) => (
        <div
          className={` p-2 rounded ${
            productObj.categoryId.includes(category._id) ? 'bg-lime-500' : ''
          }`}
          onClick={() =>
            setProductObj({ ...productObj, categoryId: [category._id] })
          }
          key={index}
        >
          {category?.name}
        </div>
      ))}
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <div className='text-sm'>Name</div>
          <input
            onChange={(e) =>
              setProductObj({
                ...productObj,
                name: e.target.value,
              })
            }
            type='text'
            className='border rounded outline-none p-2'
            placeholder='vegetable name'
          />
        </div>

        <div className='flex flex-col'>
          <div className='text-sm'>baseUnit Type</div>
          <input
            onChange={(e) =>
              setProductObj({
                ...productObj,
                baseUnit: e.target.value,
              })
            }
            type='text'
            className='border rounded outline-none p-2'
            placeholder='quantity type'
          />
        </div>
        <div>
          <button
            onClick={addVegetable}
            className='bg-lime-500 text-white p-2 rounded w-full'
          >
            Add
          </button>
        </div>
        <div className='flex  gap-2'>
          {products?.map((product, index) => (
            <div className='border border-lime-500 p-2' key={index}>
              {product.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page; // Capitalize component name
