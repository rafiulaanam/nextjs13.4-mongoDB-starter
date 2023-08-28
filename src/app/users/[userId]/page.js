"use client"
import { getDataById } from '@/lib/fetchHelper';
import React from 'react'
import { useQuery } from 'react-query';

export default function UserId({params}) {
    const {userId} = params
    const getUserById= ()=>getDataById({route:"users", id:userId})
    const { isLoading, isError, data, error, refetch } = useQuery("user", getUserById);

  return (
    <div>{data?.data?._id}</div>
  )
}
