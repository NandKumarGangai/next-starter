

// If u define this function inside component you won't need to mention host name
// As it is defined outside you must provide hostname.
// Change the host based env i.e. localhost or deployed env

import axios from "axios";

// All client used env veriables should start with NEXT_PUBLIC_
export async function getData() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/getusers`);
    console.log("response: ", response);

    return response.data;
  } catch (error) {
    console.log("error: ", error);
    throw new Error('Failed to fetch data')
  }
}