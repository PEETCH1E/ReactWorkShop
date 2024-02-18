import React from 'react';

const Home = () => {
  const token = localStorage.getItem("token"); 
  const decodedToken = JSON.parse(atob(token.split('.')[1])); 
  console.log(decodedToken);
  const logout = () => {
        localStorage.clear()
        setTimeout(() => {
            window.location.reload()
        }, 400);
    }

  return (
    <div className=' bg-[#3E3F56] h-screen flex justify-center items-center'>
      <div className=' bg-gray-900 border-gray-700 px-48 py-10 rounded-lg shadow-lg'>
      <h2 className='text-center text-3xl py-5 font-bold text-white'>Welcome</h2>
      <hr />
      <p className='text-center font-semibold text-lg text-white'>{decodedToken.name}</p>
        <div className='flex justify-center py-2'>
         <button onClick={logout} className=' bg-blue-600 rounded-md mt-5 text-white mx-12 px-2 py-2'>SIGN OUT</button>
        </div>
      </div>
    </div>
  )
}

export default Home
