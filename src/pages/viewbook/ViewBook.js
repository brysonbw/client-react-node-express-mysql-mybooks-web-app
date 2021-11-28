import React from 'react'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom';

const getBookById = async (id) => {
    const { data } = await axios.get(`https://mybooks-app-api.herokuapp.com/api/books/byId/${id}`);
    return data;
  }


function ViewBook({id}) { 
        const queryClient = useQueryClient()

        const mutation = useMutation((id) => axios.delete(`https://mybooks-app-api.herokuapp.com/api/books/deleteById/${id}`),
        { onSuccess: () => {
              queryClient.invalidateQueries();
            },
        } 
      );
   

    const { isLoading, isError, data, error } = useQuery(['book', id], () => getBookById(id), {
        enabled: !!id
    })
 
    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }
 
 
    return (
        <section>
        <div class="container px-5 mx-auto max-w-7x1">
          <div class="flex flex-wrap w-full mb-4 p-4">
            <Link to="/" class="mt-6 bg-red-800 hover:bg-red-700 text-white text-center py-2 px-4 rounded-full">
            Back
      </Link>
          </div>
      
        <div class="my-10 p-5 relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div class="w-full md:w-1/3 bg-white grid place-items-center">
        <img src={data.cover} alt="book-cover-img" class="rounded-xl" />
        </div>
        <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
        <div class="flex justify-between item-center">
        </div>
        <h3 class="underline font-black text-gray-800 md:text-3xl text-xl">{data.title}</h3>
        <p class="md:text-lg text-gray-500 text-base">Author: {data.author}</p>
        <p class="md:text-lg text-gray-500 text-base">Review: {data.review}</p>
        <Link onClick={() => {
        mutation.mutate(id)
        }} to='/' class="text-red-500 hover:text-red-700 text-white font-bold rounded-full">
        Delete
        </Link>
        </div>
        </div>        
        </div>
      </section>
    )
}

export default ViewBook
