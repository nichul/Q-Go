import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css'; // CSS 파일 임포트
import sushi1 from './img/sushi.jpeg'; // 예시 이미지 경로
import sushi2 from './img/sushi.jpeg'; // 예시 이미지 경로
import sushi3 from './img/sushi.jpeg'; // 예시 이미지 경로
import sushi4 from './img/sushi.jpeg'; // 예시 이미지 경로
import sushi5 from './img/sushi.jpeg'; // 예시 이미지 경로

const menuItems = [
  { id: 1, title: "오늘의 초밥 ㅋpcs", sashimi: "숙성회 ㅋp", price: "17000", image: sushi1, alt: "초밥 1" },
  { id: 2, title: "오늘의 초밥 32pcs", sashimi: "숙성회 24114p", price: "17000", image: sushi2, alt: "초밥 2" },
  { id: 3, title: "오늘의 초밥 32552pcs", sashimi: "숙성회 53p", price: "17000", image: sushi3, alt: "초밥 3" },
  { id: 4, title: "오늘의 초밥 111111pcs", sashimi: "숙성회 143p", price: "17000", image: sushi4, alt: "초밥 4" },
  { id: 5, title: "오늘의 초밥 4138911pcs", sashimi: "숙성회 124412p", price: "17000", image: sushi5, alt: "초밥 5" },
  { id: 6, title: "오늘의 덮밥 15pcs", sashimi: "덮밥", price: "8000", image: sushi1, alt: "덮밥 1" },
  { id: 7, title: "연어 덮밥", sashimi: "연어", price: "9000", image: sushi2, alt: "덮밥 2" },
  { id: 8, title: "참치 덮밥", sashimi: "참치", price: "9500", image: sushi3, alt: "덮밥 3" },
  { id: 9, title: "장어 덮밥", sashimi: "장어", price: "10000", image: sushi4, alt: "덮밥 4" },
  { id: 10, title: "모듬 사시미 20pcs", sashimi: "", price: "30000", image: sushi1, alt: "사시미 1" },
  { id: 11, title: "연어 사시미 15pcs", sashimi: "", price: "25000", image: sushi2, alt: "사시미 2" },
  { id: 12, title: "참치 사시미 15pcs", sashimi: "", price: "27000", image: sushi3, alt: "사시미 3" }
];

const Detail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const menuItem = menuItems.find(item => item.id === parseInt(id));
  const [showPopup, setShowPopup] = useState(false);

  if (!menuItem) {
    return <div>메뉴 항목을 찾을 수 없습니다.</div>;
  }

  const handleAddToCart = () => {
    onAddToCart(menuItem);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // 2초 후에 팝업 숨김
  };

  const handleCartClick = () => {
    navigate('/cart'); // '/cart' 경로로 이동
  };

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="Detail">
      <header className="Detail-header">
        <button className="goBackButton" onClick={handleGoBack}>돌아가기</button>
        <h1>{menuItem.title}</h1> {/* 메뉴 제목을 헤더에 추가 */}
        <button className="cartButton" onClick={handleCartClick}>장바구니</button>
      </header>
      <img src={menuItem.image} alt={menuItem.alt} className="Detail-image" />
      <div className="Detail-sashimi">{menuItem.sashimi}</div>
      <div className="Detail-price">
  <div className="price-label">가격</div>
  <div className="price-value">{menuItem.price}원</div>
</div>
      
      <button className="orderButton" onClick={handleAddToCart}>장바구니에 담기</button>
      {showPopup && <div className="popup">장바구니에 담겼습니다!</div>}
    </div>
  );
};

export default Detail;
