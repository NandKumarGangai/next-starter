"use client";
import TopNavigation from '@/components/topNavigation'
import axios from 'axios';
import {use} from 'react';

// If u define this function inside component you won't need to mention host name
// As it is defined outside you must provide hostname.
async function getDataX() {
  try {
    const response = await axios.get("http://localhost:3000/api/user/getusers");
    console.log("response: ", response);

    return response.data;
  } catch (error) {
    console.log("error: ", error);
    throw new Error('Failed to fetch data')
  }
}

const Resources = () => {
  const data = use(getData());
  
  async function getData() {
    try {
      const response = await axios.get("http://localhost:3000/api/user/getusers");
      console.log("response: ", response);
  
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error('Failed to fetch data')
    }
  }
  console.log("++", data);
  return (
    <>
      <TopNavigation />
      <div className='mt-20'>
        Resources
      </div>
    </>
  )
}

export default Resources