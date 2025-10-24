import React from 'react'

const NewsLetter = () => {

    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>
            Subscribe now & get 20% off! 
        </p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, at.
        </p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter email' className='w-full sm:flex-1 outline-none' required></input>
            <button type="submit" className='bg-black text-white text-s px-10 py-4' onSubmit={onSubmitHandler}>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter
