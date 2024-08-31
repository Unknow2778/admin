'use client';

import React, { useEffect, useState } from 'react';
import { GET, POST } from '../api/api';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  categoryId: string;
  name: string;
  baseUnit: string;
  imageURL: string;
}

interface Category {
  _id: string;
  name: string;
}

function Page() {
  const [productObj, setProductObj] = useState<Product>({
    categoryId: '66d0a890eceebf68711ea883',
    name: '',
    baseUnit: 'kg',
    imageURL: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await GET('/markets/categories');
      setCategories(res.categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await GET('/markets/products');
      setProducts(res.products);
    };
    fetchProducts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setProductObj({ ...productObj, categoryId });
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('categoryId', productObj.categoryId);
      formData.append('name', productObj.name);
      formData.append('baseUnit', productObj.baseUnit);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      console.log(formData);
      const res = (await POST('/markets/addProduct', formData)) as any;

      if (res.status === 201) {
        toast.success('Added successfully');
        // Fetch updated products list
        const updatedProducts = await GET('/markets/products');
        setProducts(updatedProducts.products);
        // Reset the form
        setProductObj({
          categoryId: '',
          name: '',
          baseUnit: 'kg',
          imageURL: '',
        });
      } else {
        toast.error(res.data?.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='flex flex-col gap-2 justify-center items-center min-h-screen p-4'>
      <Toaster gutter={1} position='top-left' />

      <div className='w-full max-w-md space-y-4'>
        <div className='space-y-2'>
          {categories?.map((category) => (
            <button
              key={category._id}
              className={`w-full p-2 rounded ${
                productObj?.categoryId === category._id
                  ? 'bg-lime-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleCategorySelect(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className='flex flex-col space-y-2'>
          <label className='text-sm'>Name</label>
          <input
            value={productObj.name}
            onChange={(e) =>
              setProductObj({ ...productObj, name: e.target.value })
            }
            type='text'
            className='border rounded outline-none p-2'
            placeholder='Vegetable name'
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label className='text-sm'>Base Unit Type</label>
          <input
            value={productObj.baseUnit}
            onChange={(e) =>
              setProductObj({ ...productObj, baseUnit: e.target.value })
            }
            type='text'
            className='border rounded outline-none p-2'
            placeholder='Quantity type'
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label className='text-sm'>Image</label>
          <input type='file' onChange={handleImageChange} />
        </div>

        <button
          onClick={addProduct}
          className='bg-lime-500 text-white p-2 rounded w-full'
        >
          Add Product
        </button>
      </div>

      <div className='w-full flex flex-wrap gap-2'>
        {products?.map((product, index) => (
          <div className='flex w-40 h-40 aspect-square flex-col justify-between border border-lime-500 p-2 rounded-lg'>
            <div className='h-20 w-20'>
              <img
                className='h-full w-full object-contain'
                src={product.imageURL}
                alt=''
              />
            </div>
            <div key={index} className=' capitalize'>
              {product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
