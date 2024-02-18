import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Product = () => {
  const [name, setName] = useState('')
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const user_id = localStorage.getItem("user_id");
  const [products, setProducts] = useState([])
  const [status , setStatus] = useState('true')

  const getProduct = async(user_id) => {
    try{
      const url = 'https://workshop-react-api.vercel.app/product?user_id='+user_id
      const res = await axios.get(url)
      setProducts(res.data)
      // console.log(res.data)
    } catch(err){
      console.log(err)
    }
  }

  const createProduct = async(e) => {
    e.preventDefault()
    try{
      const url = 'https://workshop-react-api.vercel.app/product'
      const res = await axios.post(url,{name, qty, price, image, user_id})
      getProduct(user_id)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getProduct(user_id)
  }, [user_id])
  // console.log(products)

  const deleteProduct = async(id) => {
    try{
      const url = 'https://workshop-react-api.vercel.app/product/'+id
      const res = await axios.delete(url)
      getProduct(user_id)
    } catch(err){
      console.log(err)
    }

    const editProduct = async(id) => {
      try{

        const url = 'https://workshop-react-api.vercel.app/product/'+id
        const res = await axios.get(url)
          setName(res.data.name)
          setQty(res.data.qty)
          setPrice(res.data.price)
          setImage(res.data.image)
          getProduct(user_id)
      } catch(err){
        console.log(err)
      }
    }

    const updateProduct = async(id) => {
      e.preventDefault()
      try{
        setStatus('false')
      } catch(err){
        console.log(err)
      }
    }

  }
  return (
    
    <div className='bg-[#3E3F56] h-screen'>
      <div className='p-10'>
        <div className=' bg-gray-900 border-gray-700 mx-36  py-7 pr-16 rounded-lg shadow-lg flex justify-end flex-wrap'>
          
          <form action="" >
            <label htmlFor="name" className="text-white">ชื่อสินนค้า</label>
            <input placeholder="ชื่อสินนค้า"className='border border-gray-700 rounded-md mx-3 py-3 m-2' onChange={(e) => setName(e.target.value)} type="text" name='name'/>
            <label htmlFor="qty" className="text-white">จำนวน</label>
            <input placeholder="จำนวน"className='border border-gray-700 rounded-md mx-3 py-3 m-2' onChange={(e) => setQty(e.target.value)} type="number" name='qty'/>
            <label htmlFor="price" className="text-white">ราคา</label>
            <input placeholder="ราคา"className='border border-gray-700 rounded-md mx-3 py-3 m-2' onChange={(e) => setPrice(e.target.value)} type="number" name='price'/>
            <label htmlFor="image" className="text-white">รูปภาพ</label>
            <input placeholder="รูปภาพ"className='border border-gray-700 rounded-md py-3 m-2' onChange={(e) => setImage(e.target.value)} type="text" name='image'/>
            { }
            <button onClick={createProduct} type='submit' className='text-white bg-green-600 rounded-md py-3 px-5 m-2 text-center'>CREATE</button>
          </form>
          
        </div>
        <div className=' bg-gray-900 border-gray-700 mx-36 py-7 rounded-lg shadow-lg m-10 p-5'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              No.
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Product name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Quantity
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Image
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Edit/Delete
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    
                      {products.map((product, index) => (
                      // <React.Fragment key={index}>
                      <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {index+1}
                          </th>
                          <td className="px-6 py-4">
                              {product.name}
                          </td>
                          <td className="px-6 py-4">
                              {product.qty}
                          </td>
                          <td className="px-6 py-4">
                              {product.price}
                          </td>
                          <td className="px-6 py-4 w-40 h-30">
                              <img src={product.image} alt="" />
                          </td>
                          <td>
                            <button className='bg-green-600 rounded px-3 py-2 text-white' onClick={() => updateProduct(product.id)}>Edit</button>
                            <button className='bg-red-800 rounded px-2 py-2 mx-3 text-white' onClick={() => deleteProduct(product.id)}>Delete</button>
                          </td>
                      </tr>
                      //  </React.Fragment> 
                      ))}                      
                  </tbody>
              </table>
          </div>

        </div>
      </div>
    </div>
    
  )
}

export default Product
