import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router';
import axios from 'axios'


function CreateBook() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [cover, setCover] = useState('')
    const [review, setReview] = useState('')

    const queryClient = useQueryClient()

    const mutation = useMutation(
        createBook => 
            axios.post('https://mybooks-app-api.herokuapp.com/api/books/create', createBook),
            {
          onSuccess: () => {
            queryClient.invalidateQueries('books')
          },
    })

    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault()
        mutation.mutate({
            title: title,
            author: author,
            cover: cover,
            review: review
         })
         navigate('/')
    }
    return (
        <>
            
<div class="flex flex-col h-screen">
  
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
       
        <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

          
            <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-900">
                Add Book
            </h2>

            <form onSubmit={onSubmit} class="mt-10"
            >
                {mutation.error && (
         <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
       )}
                <label for="title" class="block text-xs font-semibold text-gray-600 uppercase">Title</label>
                <input id="title" type="text" name="title" placeholder="Enter title"
                    class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

               
                <label for="author" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Author</label>
                <input id="author" type="text" name="author" placeholder="Enter author name" 
                    class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required />

                <label for="cover" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Cover Image URl</label>
                <input id="cover" type="url"  name="cover" placeholder="Enter book cover image URL" 
                    class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    required />

                <label for="review" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Review</label>
                <input id="review" type="text" name="review" placeholder="Enter review" 
                    class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required />

               
                <button type="submit"
                    class="w-full py-3 mt-10 bg-gray-900 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-red-800 hover:shadow-none">
                   Add
                </button>
            </form>
        </div>
    </div>
</div>
        </>
    )
}

export default CreateBook
