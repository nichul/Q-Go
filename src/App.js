import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Detail from './Detail';
import Cart from './Cart';
import sushi1 from './img/sushi.jpeg';
import sushi2 from './img/sushi.jpeg';
import sushi3 from './img/sushi.jpeg';
import sushi4 from './img/sushi.jpeg';
import sushi5 from './img/sushi.jpeg';
import cartIcon from './img/cart.png'; // cart.png 이미지 경로

const MenuItem = ({ title, sashimi, price, image, alt, detailPath }) => (
  <div className="MenuItem" onClick={() => window.location.href = detailPath}>
    <div className="MenuItem-text">
      <div className="today-sushi">{title}</div>
      <div className="sashimi">{sashimi}</div>
      <div className="price">{price}원</div>
    </div>
    <img src={image} alt={alt} className="MenuItem-image" />
  </div>
);

function Menu() {
  return (
    <div className="Menu">
      <MenuItem title="오늘의 초밥 ㅋpcs" sashimi="숙성회 ㅋp" price="17000" image={sushi1} alt="초밥 1" detailPath="/detail/1" />
      <MenuItem title="오늘의 초밥 32pcs" sashimi="숙성회 24114p" price="17000" image={sushi2} alt="초밥 2" detailPath="/detail/2" />
      <MenuItem title="오늘의 초밥 32552pcs" sashimi="숙성회 53p" price="17000" image={sushi3} alt="초밥 3" detailPath="/detail/3" />
      <MenuItem title="오늘의 초밥 111111pcs" sashimi="숙성회 143p" price="17000" image={sushi4} alt="초밥 4" detailPath="/detail/4" />
      <MenuItem title="오늘의 초밥 4138911pcs" sashimi="숙성회 124412p" price="17000" image={sushi5} alt="초밥 5" detailPath="/detail/5" />
    </div>
  );
}

function Donburi() {
  return (
    <div className="Menu">
      <MenuItem title="오늘의 덮밥 15pcs" sashimi="덮밥" price="8000" image={sushi1} alt="덮밥 1" detailPath="/detail/6" />
      <MenuItem title="연어 덮밥" sashimi="연어" price="9000" image={sushi2} alt="덮밥 2" detailPath="/detail/7" />
      <MenuItem title="참치 덮밥" sashimi="참치" price="9500" image={sushi3} alt="덮밥 3" detailPath="/detail/8" />
      <MenuItem title="장어 덮밥" sashimi="장어" price="10000" image={sushi4} alt="덮밥 4" detailPath="/detail/9" />
    </div>
  );
}

function Sashimi() {
  return (
    <div className="Menu">
      <MenuItem title="모듬 사시미 20pcs" sashimi="" price="30000" image={sushi1} alt="사시미 1" detailPath="/detail/10" />
      <MenuItem title="연어 사시미 15pcs" sashimi="" price="25000" image={sushi2} alt="사시미 2" detailPath="/detail/11" />
      <MenuItem title="참치 사시미 15pcs" sashimi="" price="27000" image={sushi3} alt="사시미 3" detailPath="/detail/12" />
    </div>
  );
}

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const donburiRef = useRef(null);
  const sashimiRef = useRef(null);

  useEffect(() => {
    if (location.pathname.includes("/detail") || location.pathname.includes("/cart")) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const scrollToSection = (sectionRef) => {
    const offset = -100; // 원하는 오프셋 값을 설정하세요.
    const elementPosition = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const handleAddToCart = (item) => {
    setCartItems(prevCartItems => {
      const updatedCart = [...prevCartItems, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // 로컬 저장소 업데이트
      return updatedCart;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // 로컬 저장소에서 장바구니 비우기
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // 로컬 저장소 업데이트
  };

  const cartItemCount = cartItems.length; // 장바구니 아이템 수

  return (
    <div className="App">
      {showHeader && (
        <header className="App-header">
          <div>대단한 초밥</div>
          <div className="Menu-buttons">
            <button className="Menu-button" onClick={() => scrollToSection(menuRef)}>세트메뉴</button>
            <button className="Menu-button" onClick={() => scrollToSection(donburiRef)}>초밥 단품</button>
            <button className="Menu-button" onClick={() => scrollToSection(sashimiRef)}>사시미</button>
          </div>
          <div className="Cart-button">
            <button onClick={handleGoToCart} className="cart-button">
              <img src={cartIcon} alt="장바구니" className="cart-icon" />
              {cartItemCount > 0 && (
                <div className="cart-item-count">{cartItemCount}</div>
              )}
            </button>
          </div>
        </header>
      )}
      <Routes>
        <Route path="/" element={
          <>
            <div ref={menuRef}><Menu /></div>
            <div ref={donburiRef}><Donburi /></div>
            <div ref={sashimiRef}><Sashimi /></div>
          </>
        } />
        <Route path="/detail/:id" element={<Detail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />} />
      </Routes>
    </div>
  );
}

export default App;
