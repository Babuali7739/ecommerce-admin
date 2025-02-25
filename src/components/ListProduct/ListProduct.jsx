import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts,setAllPrducts] = useState([]);

    const fetchInfo = async ()=>{
      await fetch('https://ecommerce-backend-9dq4.onrender.com/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setAllPrducts(data)});
    }

    useEffect(()=>{
      fetchInfo();
    },[]);

    const removeinfo = async (id)=>{
      await fetch('https://ecommerce-backend-9dq4.onrender.com/removeproduct',
      {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
      })
       await fetchInfo(id);
    }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Titals</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p className='category'>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
            {allproducts.map((product,index)=>{
              return <> <div key={index} className="listproduct-format-main listproduct-format">
                  <img src={product.image} alt="" className="listproduct-product-icon" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p className='category'>{product.category}</p>
                  <img onClick={()=>{removeinfo(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </div>
              <hr />

              </>

            })}
      </div>
    </div>
  )
}

export default ListProduct
