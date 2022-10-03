import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addItem, cartItemsSelector } from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/store';

type PizzaBlockProps = {
  id: number; 
  price: number; 
  name: string; 
  imageUrl: string; 
  sizes: number[];
  types: number[];
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({id, price, name, imageUrl, sizes, types}) => {
    const pizzaTypes: string[] = ['Тонкое' , 'Традиционное'];
    const [activeType, setActiveType] = useState<number>(0);
    const [activeSize, setActiveSize] = useState<number>(0);
    const addedCount = useSelector(cartItemsSelector(id));
    const count = addedCount ? addedCount.count : 0;
    const dispatch = useAppDispatch();
    function addProduct() {
      dispatch(addItem({
        id,
        price, 
        name,
        imageUrl,
        size: sizes[activeSize],
        type: pizzaTypes[activeType],
        count: 1,
      }))
    }
    return (
        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
  <img
    className="pizza-block__image"
    src={imageUrl}
    alt="Pizza"
  />
  <h4 className="pizza-block__title">{name}</h4>
  <div className="pizza-block__selector">
  <ul>
      {types.map((prev, index) => (<li key={index} className={activeType === index ? 'active' : ''} onClick={() => setActiveType(index)}>
        {pizzaTypes[prev]}
      </li>))}
    </ul>
    <ul>
      {sizes.map((prev, index) => (<li key={index} className={activeSize === index ? 'active' : ''} onClick={() => setActiveSize(index)}>
        {prev} см.
      </li>))}
    </ul>
  </div>
  <div className="pizza-block__bottom">
    <div className="pizza-block__price">от {price} руб.</div>
    <div onClick={() => addProduct()} className="button button--outline button--add">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
          fill="white"
        />
      </svg>
      <span>Добавить</span>
      {count ? <i>{count}</i> : null}
    </div>
  </div>
</div> 
        </div>
    );
};

export default PizzaBlock;