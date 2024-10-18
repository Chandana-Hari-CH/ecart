import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/slice/wishlistSlice'
import Header from '../components/Header'

function View() {

  const { loading } = useSelector((state) => state.productReducer)
  const[product,setProduct]= useState({})
 const { wishlist } = useSelector((state) => state.wishlistReducer);
 const dispatch=useDispatch()
 const{id} = useParams()

  useEffect(()=>{

    const products= JSON.parse(localStorage.getItem('products'))
    setProduct(products?.find(product=>product?.id==id))

  },[])
  
//console.log(product);

const handleWishlist = (product) => {
  const existingProduct = wishlist.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Product already wishlisted");
  } else {
    dispatch(addToWishlist(product));
  }
};


  return (
    <>
    <Header/>
     <div className='mt-5'>
   {
    loading?<div style={{ paddingTop: '100px' }} className="text-center fw-bolder">
      <Spinner animation="border" variant="secondary" />Loading....
    </div>:
   
      <div className="container row" style={{marginTop:'100px'}}>
      <div className="col lg-4">
        <img style={{width:'100%',height:'400px'}} src={product?.thumbnail} alt="" />
      </div>
      <div className="col lg-2"></div>
      <div className="col lg-6">
        <p>pid:{product?.id}</p>
        <h1>{product?.title}</h1>
        <h5 className='fw-bolder' ><span style={{color:'red'}}>{product?.price}</span> </h5>
        <p>{product?.description}</p>
        <div className="d-flex justify-content-between mt-4">
        <Button className='btn btn-outline-dark' onClick={() => handleWishlist(product)}><i className='fa-solid fa-heart text-success'></i>Wishlist</Button>
        <Button className='btn btn-outline-dark'><i className='fa-solid fa-cart-shopping text-info'></i>Cart</Button>
        </div>
      </div>
    </div>
    }
    </div>
    </>
   
  )
}

export default View