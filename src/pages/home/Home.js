import React from 'react'
import { Link } from 'react-router-dom'
import {useQuery} from 'react-query'
import axios from 'axios'

const getBooks =  async () => {
  const { data } =  await axios.get('https://mybooks-app-api.herokuapp.com/api/books/all')
  return data
}

function Home({setId}) {
  const { isLoading, isError, data, error } = useQuery('books', getBooks)
 
   if (isLoading) {
     return <span>Loading...</span>
   }
 
   if (isError) {
     return <span>Error: {error.message}</span>
   }

    return (
        <section>
  <div class="container px-5 py-5 mx-auto max-w-7x1">
    <div class="flex flex-wrap w-full mb-4 p-4">
      <div class="w-full mb-6 lg:mb-0">
        <h1 class="sm:text-4xl text-5xl font-medium font-bold title-font text-gray-900">My Books</h1>
        <div class="h-1 w-20 bg-red-400 rounded"></div>
      
      </div>
      <Link to="/createbook" class="mt-6 bg-red-800 hover:bg-red-700 text-white text-center py-2 px-4 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
</Link>
    </div>

      {data.map((book) => (
        <div key={book.id}
        class="mb-5 relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div class="w-full md:w-1/3 bg-white grid place-items-center">
          <img src={book.cover} alt="book-cover-img" class="rounded-xl" />
        </div>
          <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div class="flex justify-between item-center">
            </div>
            <Link onClick={() => setId(book.id)} to={`/viewbook/${book.id}`}><h3 class="underline hover:text-red-800 font-black text-gray-800 md:text-3xl text-xl">{book.title}</h3></Link>
            <p class="md:text-lg text-gray-500 text-base">Author: {book.author}</p>
            <p class="md:text-lg text-gray-500 text-base">Review: {book.review}</p>
          </div>
        </div>
      ))}
      
  </div>
</section>
    )
}

export default Home
