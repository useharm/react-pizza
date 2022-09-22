import React from 'react';





const Categories = ({ value, changeValue }) => {
   
    const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
    return (
             <div className="categories">
              <ul>
                {categories.map((prev, index) => (<li key={index} onClick={() => changeValue(index)} className={value === index ? 'active' : ''}>
                    {prev}
                </li>))}
              </ul>
            </div>
    );
};

export default Categories;