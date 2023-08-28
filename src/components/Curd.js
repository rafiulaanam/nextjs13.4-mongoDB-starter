"use client"
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createData, deleteData, getData, getDataById, updateData } from "../lib/fetchHelper";
import Link from "next/link";

export default function Home() {
  const [newUserName, setNewUserName] = useState("");
  const [editedUserName, setEditedUserName] = useState("");


  const getUser= ()=>getData("users")
  const { isLoading, isError, data, error, refetch } = useQuery("users", getUser);
  console.log("🚀 ~ file: Curd.js:14 ~ Home ~ data:", data)

 
  const users =data?.data
  const addUser = useMutation(createData, {
    onSuccess: () => {
      setNewUserName("");
      refetch();
    },
  });
  const updateUserMutation = useMutation(updateData, {
    onSuccess: () => {
      setEditedUserName("");
      refetch();
    },
  });
  const deletePost = useMutation(deleteData, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleAddUser = () => {
    const addData ={
      name: newUserName
    }
    addUser.mutate({route:"users", addData});
  };

  const handleEditUser = (userId) => {
    const updateData={
      name:editedUserName
    }
    updateUserMutation.mutate({route:"users", id: userId, updateData });
  };

  const handleDeleteUser = (userId) => {
    deletePost.mutate({route:"users", id: userId  });
  };

  if (isLoading) return <div className="text-center mt-8">Employee is Loading...</div>;
  if (isError) return <div className="text-center mt-8">Error: {error}</div>;
  return (
    <div className="max-w-md mx-auto mt-8">
      {addUser.isLoading || deletePost.isLoading ? (
        <div className="text-center">Refresh user...</div>
      ) : (
        <>
          {addUser.isError ? (
            <div className="text-red-500">An error occurred: {addUser.error.message}</div>
          ) : null}

          {addUser.isSuccess ? <div className="text-green-500">User added!</div> : null}

          {users &&
            users?.map((user) => (
              <div key={user._id} className="border border-gray-300 p-4 mt-4 flex justify-between items-center">
                <Link href={`/users/${user?._id}`}><h1 className="text-lg">{user.name}</h1></Link>
                <div>
                  <input
                    type="text"
                    className="appearance-none border border-gray-300 p-2 rounded"
                    value={editedUserName}
                    onChange={(e) => setEditedUserName(e.target.value)}
                  />
                  <button
                    onClick={() => handleEditUser(user._id)}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={updateUserMutation.isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={deletePost.isLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          <div className="mt-4 flex items-center">
            <input
              type="text"
              className="appearance-none border border-gray-300 p-2 rounded"
              placeholder="Enter user name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button
              onClick={handleAddUser}
              className="ml-2 bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={addUser.isLoading}
            >
              Create User
            </button>
          </div>
        </>
      )}
    </div>
  );
}