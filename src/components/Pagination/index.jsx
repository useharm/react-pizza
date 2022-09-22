import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pagination.module.scss';
import { setPage } from '../../redux/slices/filterSlice';

export const Pagination = () => {
  const page = useSelector(state => state.filter.page);
  const dispatch = useDispatch();
    return (
        <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => dispatch(setPage(e.selected + 1))}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={page - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    );
};

export default Pagination;