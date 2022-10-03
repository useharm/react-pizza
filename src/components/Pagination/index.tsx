import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pagination.module.scss';
import { setPage, searchSelector } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';

export const Pagination: React.FC = () => {
  const { page } = useSelector(searchSelector);
  const dispatch = useAppDispatch();
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
      />
    );
};

export default Pagination;