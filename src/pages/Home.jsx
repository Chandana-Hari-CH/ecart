import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Redux/slice/cartSlice";
import { fetchProductData } from "../Redux/slice/productSlice";
import { addToWishlist } from "../Redux/slice/wishlistSlice";
import Header from '../components/Header.jsx';
function Home() {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.productReducer);
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const cart  = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const handleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id === product.id);
    if (existingProduct) {
      alert("Product already wishlisted");
    } else {
      dispatch(addToWishlist(product));

    }
  };
  const handleCart = (product) => {
    
      const existingProduct = cart.find(item=>item.id==product.id)
      if(existingProduct){
        dispatch(addToCart(product));
        alert("Items added")
      }
      else{
        dispatch(addToCart(product));
        alert("Item added successfully")
      }
    
  };

  return (
    <>
    <Header insideHome={true}/>
    <div style={{ marginTop: "70px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <div style={{ paddingTop: '100px' }} className="text-center fw-bolder">
          <Spinner animation="border" variant="secondary" />Loading....
        </div>
      ) : (
        <Row className="mt-5 container">
          {products?.length > 0 ? (
            products.map((product, index) => (
              <Col key={index} className="mt-5" sm={12} md={6} lg={4} xl={3}>
                <Card style={{ width: '18rem' }}>
                  <Link to={`/view/${product?.id}`}>
                    <Card.Img varient="top" style={{ width: '100%' }} src={product?.thumbnail} />
                  </Link>
                  <Card.Body>
                    <Card.Title className="text-info">{product?.title.slice(0, 20)}</Card.Title>
                    <Card.Text>{product?.description.slice(0, 20)}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button onClick={() => handleWishlist(product)} className="btn btn-light">
                        <i className="fa-solid fa-heart text-danger"></i>
                      </Button>
                      <Button onClick={() => handleCart(product)} className="btn btn-light">
                        <i className="fa-solid fa-cart-shopping text-danger"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-danger text-center mt-5">Nothing to display</div>
          )}
        </Row>
      )}
    </div>
  </>);
}


export default Home;
