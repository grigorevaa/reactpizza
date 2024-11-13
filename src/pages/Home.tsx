import { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SortPopup, sortList } from '../components/Sort';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import {
	selectFilter,
	setCategoryId,
	setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import {
	fetchPizzas,
	FetchPizzasArgs,
	selectPizzas,
} from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);
	const { pizzas, status } = useSelector(selectPizzas);

	const handleCategoryId = useCallback(
		(index: number): void => {
			dispatch(setCategoryId(index));
		},
		[dispatch],
	);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1),
			) as unknown as FetchPizzasArgs;
			const sortTemp = sortList.find(
				item => item.sortProperty === params.sortBy,
			);
			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: params.currentPage,
					sort: sortTemp || sortList[0],
				}),
			);
			isSearch.current = true;
		}
	}, [dispatch]);

	useEffect(() => {
		const getPizzas = async () => {
			const sortBy = sort.sortProperty.replace('-', '');
			const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';
			dispatch(
				fetchPizzas({
					sortBy,
					order,
					category,
					search,
					currentPage,
				}),
			);

			window.scrollTo(0, 0);
		};
		getPizzas();
	}, [categoryId, sort, searchValue, currentPage, dispatch]);

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId: categoryId > 0 ? categoryId : null,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		// if (!window.location.search) {
		// 	dispatch(fetchPizzas({} as FetchPizzasArgs));
		// }
		isMounted.current = true;
	}, [navigate, categoryId, sort.sortProperty, currentPage, dispatch]);

	const skeletons = [...new Array(8)].map((_, index) => (
		<Skeleton key={index} />
	));

	const pizzasSorted = pizzas?.map((item: any) => (
		<PizzaBlock {...item} key={item.id} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					categoryId={categoryId}
					handleCategoryId={handleCategoryId}
				/>
				<SortPopup sort={sort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>ОШИБКА</h2>
					<p>Произошла ошибка при загрузке пицц.</p>
				</div>
			) : (
				<div className="content__items">
					{status === 'loading' ? skeletons : pizzasSorted}
				</div>
			)}

			<Pagination />
		</div>
	);
};

export default Home;
