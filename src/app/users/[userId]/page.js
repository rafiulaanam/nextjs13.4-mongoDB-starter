// "use client"
// import { getDataById } from '@/lib/fetchHelper';
// import React from 'react'
// import { useQuery } from 'react-query';

// export default function UserId({params}) {
//     const {userId} = params
//     const getUserById= ()=>getDataById({route:"users", id:userId})
//     const { isLoading, isError, data, error, refetch } = useQuery("user", getUserById);

//   return (
//     <div>{data?.data?._id}</div>
//   )
// }
'use client'
 
import useSWR from 'swr'
 
const fetcher = (url) => fetch(url).then((r) => r.json())
 
export default function UserId({params:{userId}}) {
  const { data, error } = useSWR(
    `nextjs13-4-mongo-db-starter-e95r4gsdn-rafiulaanam.vercel.app/api/users/${userId}`,
    fetcher
  )
  if (error) return 'Failed to load'
  if (!data) return 'Loading...'
 console.log(data.data)
  return <div>{data.data?._id}</div>
}