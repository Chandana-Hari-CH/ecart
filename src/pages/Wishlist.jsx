import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../Redux/slice/cartSlice';
import { removeFromWishlist } from '../Redux/slice/wishlistSlice';
import Header from '../components/Header';

function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const dispatch = useDispatch()

  const handleCart = (product) => {
    
    dispatch(removeFromWishlist(product?.id))
    dispatch(addToCart(product));
    

}
  return (
    <>
    <Header/>
    <div style={{ marginTop: "70px" }}>
      <Row className='mt-5 container'>
        {wishlist?.length > 0 ? wishlist.map((product) => (
          <Col className='mt-5' sm={12} md={6} lg={4} xl={3} key={product.id}> 
            <Card style={{ width: '18rem' }}>
              <Link to={`/view/${product?.id}`}>
                <Card.Img variant='top' style={{ width: '100%' }} src={product?.thumbnail} />
              </Link>
              <Card.Body>
                <Card.Title>{product?.title.slice(0, 20)}</Card.Title>
                <Card.Text>
                {product?.description.slice(0, 20)}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button className='btn btn-light'>
                    <i onClick={()=>dispatch(removeFromWishlist(product?.id))} className="fa-solid fa-trash text-danger"></i>
                  </Button>
                  <Button className='btn btn-light'>
                    <i className="fa-solid fa-cart-shopping text-danger" onClick={() => handleCart(product)}></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )) : (
          <div className='d-flex align-items-center mt-5'>
            <img src="https://bakestudio.in/assets/images/cart/empty-cart.gif" alt="Empty Cart" />
            <h1>Your wishlist is empty</h1> 
          </div>
        )}
      </Row>
    </div>
    </>
    
  );
}

export default Wishlist;
