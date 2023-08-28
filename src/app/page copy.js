"use client"
import { createUser, deleteUser, getUsers } from "@/lib/fetchHelper";
import { useMutation, useQuery } from "react-query";


export default function Home() {

  const { isLoading, isError, data, error,refetch } = useQuery('users', getUsers)
  console.log("🚀 ~ file: page.js:9 ~ Home ~ data:", data)

  const addUser = useMutation(createUser)
  const deletePost = useMutation(deleteUser)

  if(isLoading ) return <div>Employee is Loading...</div>;
  if(isError) return <div>Error: {error}</div>;
  return (
    <div>
    {addUser.isLoading || deletePost.isLoading ? (
      'Adding todo...'
    ) : (
      <>
        {addUser.isError ? (
          <div>An error occurred: {addUser.error.message}</div>
        ) : null}

        {addUser.isSuccess ? <div>Todo added!</div> : null}

{data && data?.map(item=><h1 key={item.index}>{item._id}</h1>)}
        <button
          onClick={() => {
            addUser.mutate({ name: Math.random("rafi") })
            refetch();
          }}
        >
          Create Todo
        </button>
        <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {deletePost.mutate('644188442b1f3cc0b3d0e58b') 
              refetch()
            }}
            >
              Delete
            </button>
      </>
    )}
  </div>
  )
}
