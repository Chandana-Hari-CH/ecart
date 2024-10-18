import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../Redux/slice/cartSlice'
import Header from '../components/Header'

function Cart() {
  const cart = useSelector((state)=>state.cartReducer)
  const dispatch = useDispatch()
  const [total,setTotal]= useState(0)

  useEffect(()=>{
    if(cart?.length>0){
    setTotal(cart.map(product=>product.totalPrice).reduce((p1,p2)=>p1+p2))
    }else{
      setTotal(0)
    }
  },[cart])

 

  return (
   
        <>
        <Header/>
         <div className='container' style={{marginTop:'100px'}}>

    {
    cart.length>0?
      <div className="row mt-5">
      <div className="col lg-8">
        <table className='table shadow'>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((product,index)=>(
             <tr>
              <td>{index+1}</td>
              <td>{product.title}</td>
              <td style={{width:'300px',height:'300px'}}><img src={product.thumbnail} alt="" /></td>
              <td  >
                <input style={{width:'30px'}} type="text" className='text-center' value={product.quantity}/>
              </td>
              
              <td  className='text-danger '>${product.totalPrice}</td>
              <td><i style={{cursor:'pointer'}} onClick={()=>dispatch(removeFromCart(product?.id))} className='fa-solid fa-trash fa-danger text-danger'></i></td>
            </tr> 
            ))
              }
            
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <button className='btn btn-danger' onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
          <Link to={'/'} style={{textDecoration:'none'}} className='btn btn-success'>Shop More</Link>
        </div>
      </div>
      <div className="col lg-1"></div>
      <div className="col lg-3">
        <div className="container border rounded shadow mt-5 p-5 w-100">
          <h1>Cart Summary</h1>
          <h4>Total Products:{cart.length}</h4>
          <h5>Total:{total}</h5>

        </div>
        <div className="d-grid">
          <button className='btn btn-success m-t rounded'>Checkout</button>
        </div>
      </div>
    </div>
      : <div className='d-flex align-items-center mt-5'>
      <img src="https://bakestudio.in/assets/images/cart/empty-cart.gif" alt="Empty Cart" />
      <h1>Your cart is empty</h1> 
    </div>
      
    
    }
    </div>
        </>    
  )
}

export default Cart