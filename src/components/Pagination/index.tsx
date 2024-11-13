import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { changePage } from '../../redux/slices/filterSlice';

const Pagination: React.FC = () => {
	const dispatch = useDispatch();

	const handleChangePage = (page: number): void => {
		dispatch(changePage(page + 1));
	};

	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={e => handleChangePage(e.selected)}
			pageRangeDisplayed={8}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
