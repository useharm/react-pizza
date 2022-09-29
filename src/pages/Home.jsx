import React, { useRef, useCallback } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { setCategory, setSearch, searchSelector } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../redux/slices/fetchSlicer';
import { useNavigate } from 'react-router';
import debounce from 'lodash.debounce';
import qs from 'qs';

const Home = () => {
    const { items, status } = useSelector(state => state.pizza);
    const { sortType, searchValue, page, categoriesType } = useSelector(searchSelector)
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getPizzas = async () => {
        dispatch(fetchPizzas({
          inputValue,
          page,
          sortType: sortType.sortProperty,
          categoriesType
        }))
    }
    const searchDelay = useCallback(
      debounce((searchValue) => 
        setInputValue(searchValue)
      , 500)
    , [])
  useEffect(() => {
    searchDelay(searchValue)
  }, [searchValue])
  useEffect(() => {
    if (window.location.search) {
      const searchParsed = qs.parse(window.location.search.substring(1));
      dispatch(setSearch(searchParsed));
      isSearch.current = true;
    }
  }, [])

  useEffect(() => {
   if (!isSearch.current) {getPizzas()}
   isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoriesType, sortType, page, inputValue])

  useEffect(() => {
    if (isMounted.current)
    {
      const searchStr = qs.stringify({
      categoryId: categoriesType,
      sortId: sortType.sortProperty,
      pageId: page,
    })
      navigate(`?${searchStr}`);
  }
  isMounted.current = true
  }, [categoriesType, sortType, page, inputValue])
  
    return (
            <div className="container">
          <div className="content__top">
          <Categories value={categoriesType} changeValue={(i) => dispatch(setCategory(i))}/>
          <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {(status === 'loading') ? [...new Array(4)].map((_, index) => <Skeleton key={index}/>) : (status === 'success') ? items.map((prev) => <div key={prev.id}>
              <PizzaBlock {...prev}/>
              </div>) : <div>ERROR</div>}
        </div>
        <Pagination />
      </div> 
    );
};

export default Home;