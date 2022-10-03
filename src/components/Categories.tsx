import React from 'react';



type CategoriesProps = {
  value: number;
  changeValue: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ value, changeValue }) => {
   
    const categories: string[] = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
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