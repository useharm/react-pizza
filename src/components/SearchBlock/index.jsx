import React from 'react';
import styles from './SearchBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setInputValue, searchSelector } from '../../redux/slices/filterSlice';

const SearchBlock = () => {
    const dispatch = useDispatch();
    const { searchValue } = useSelector(searchSelector);
    console.log(searchValue);
    return (
            <div className={styles.root}>
                <input value={searchValue} onChange={e => dispatch(setInputValue(e.target.value))} className={styles.input} placeholder='Введите название пиццы'/>
                <svg className={styles.icon} enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
                {searchValue ? <svg onClick={() => dispatch(setInputValue(''))} className={styles.close} id="Layer_1" version="1.1" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg> : null}
                </div>
    );
};

export default SearchBlock;