import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { setSort, searchTypeSelector, Sort } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
type PopupWindow = MouseEvent & {
  path: Node[]
}

export const list: Sort[] = [
  {name: 'популярности', sortProperty: 'rating'},
  {name: 'цене', sortProperty: 'price'},
  {name: 'алфавиту', sortProperty: 'name'}
];

const SortC: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const sort = useSelector(searchTypeSelector);
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  function bodyClick(e: MouseEvent) {
    const _e = e as PopupWindow;
    if (sortRef.current && !_e.path.includes(sortRef.current)) {
      setVisible(false);
    }
  }
  function set(obj: Sort) {
    dispatch(setSort(obj));
    setVisible(false);
  }
  useEffect(() => {
    document.body.addEventListener('click', bodyClick);


  return () => document.body.removeEventListener('click', bodyClick)
  }, [])
    return (
        <div ref={sortRef} className="sort">
              <div onClick={() => visible ? setVisible(false) : setVisible(true)} className="sort__label">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                  />
                </svg>
                <b>Сортировка по:</b>
                <span>{sort.name}</span>
              </div>
              {visible ? (<div className="sort__popup">
                <ul>
                {list.map((prev, index) => (<li key={index} onClick={() => set(prev)} className={sort.name === prev.name ? 'active' : ''}>
                    {prev.name}
                </li>))}
                </ul>
              </div>) : null}
            </div>
    );
};

export default SortC;