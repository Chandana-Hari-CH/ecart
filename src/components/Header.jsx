import React, { useEffect, useState } from 'react'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts } from '../Redux/slice/productSlice'

function Header({insideHome}) {
  const dispatch =useDispatch()
  const[wishlistCount,setWishlistCount]= useState(0)
  const[cartCount,setCartCount]= useState(0)
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const cart = useSelector((state) => state.cartReducer);

  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  },[wishlist,cart])

  return (
    <div>
         <Navbar expand="lg" className="bg-info">
        <Container>
          <Navbar.Brand style={{paddingLeft:'5px'}} href="/home">
            <i className="fa-solid fa-truck fa-beat" style={{ color: '#3e0909',paddingRight:'10px' }}></i>
            Snap Cart
          </Navbar.Brand>        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

             { insideHome&&
              <Nav.Link>
                <input onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))} type="text" placeholder='Search' className='form-control' style={{width:'500px',borderRadius:'10px'}}/>
              </Nav.Link>}

              <Nav.Link className='btn btn-outline-light'>
                <Link to={'/wishlist'} style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                  <i className='fa-solid fa-heart text-danger p-2'></i>Wishlist
                  <Badge bg="success rounded ms-2">{wishlistCount}</Badge>
                </Link>
              </Nav.Link>

              <Nav.Link className='btn btn-outline-light'>
                <Link to={'/cart'} style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                  <i className='fa-solid fa-cart-shopping text-primary p-2'></i>Cart
                  <Badge bg="success rounded ms-2">{cartCount}</Badge>
                </Link>
              </Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header