import React, { useRef, useCallback } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategory, setSearch } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import debounce from 'lodash.debounce';
import qs from 'qs';

const Home = () => {
    const {searchValue} = React.useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const sortType = useSelector(state => state.filter.sortType)
    const categoriesType = useSelector(state => state.filter.categoriesType);
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const fetchPizzas = () => {
      axios.get(`https://6318d403f6b281877c77bfdc.mockapi.io/items?${inputValue ? ('&search=' + inputValue) : ''}&page=${page}&sortBy=${sortType.sortProperty}&order=desc&limit=4&${
      (categoriesType > 0) ? ('category=' + categoriesType) : '' }`)
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      });
      
    }
    const navigate = useNavigate();
    const page = useSelector(state => state.filter.page);
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
      console.log(searchParsed);
      dispatch(setSearch(searchParsed));
      isSearch.current = true;
    }
  }, [])

  useEffect(() => {
    setIsLoading(true);
   if (!isSearch.current) {fetchPizzas()}
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
            {isLoading ? [...new Array(4)].map((_, index) => <Skeleton key={index}/>) : items.map((prev) => <div key={prev.id}>
              <PizzaBlock {...prev}/>
              </div>)}
        </div>
        <Pagination />
      </div> 
    );
};

export default Home;