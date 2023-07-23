"use client";
import TopNavigation from '@/components/topNavigation'
import { getData } from '@/helpers/apiCalls/getData';
import { Spin, Table } from 'antd';
import useSWR from 'swr'

const columns = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'IP Address',
    dataIndex: 'ip_address',
    key: 'ip_address',
  },
  {
    title: 'Date of Joining',
    dataIndex: 'date_of_joining',
    key: 'date_of_joining',
  },
  {
    title: 'Roll On Date',
    dataIndex: 'roll_on_date',
    key: 'roll_on_date',
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
  },
];

const Resources = () => {
  console.log("response: ", process.env.NEXT_PUBLIC_HOST);
  const { data, isLoading, error } = useSWR('/api/user/getusers', getData);

  console.log("---", data, isLoading, error);

  return (
    <>
      <TopNavigation />
      <div className='mt-20'>
        {isLoading ? <Spin size='large' /> : null}
        {error ? error : null}
        <Table dataSource={data?.users} columns={columns} />
      </div>
    </>
  )
}

export default Resources;