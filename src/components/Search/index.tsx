// @ts-ignore
import debounce from 'lodash.debounce';

import { useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const [value, setValue] = useState('');

	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 400),
		[],
	);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	const onClickClear = (): void => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				height="18px"
				version="1.1"
				viewBox="0 0 18 18"
				width="18px"
				xmlns="http://www.w3.org/2000/svg">
				<title />
				<desc />
				<defs />
				<g
					fill="none"
					fillRule="evenodd"
					id="Page-1"
					stroke="none"
					strokeWidth="1">
					<g
						fill="#000000"
						id="Core"
						transform="translate(-339.000000, -381.000000)">
						<g id="search" transform="translate(339.000000, 381.000000)">
							<path
								d="M12.5,11 L11.7,11 L11.4,10.7 C12.4,9.6 13,8.1 13,6.5 C13,2.9 10.1,0 6.5,0 C2.9,0 0,2.9 0,6.5 C0,10.1 2.9,13 6.5,13 C8.1,13 9.6,12.4 10.7,11.4 L11,11.7 L11,12.5 L16,17.5 L17.5,16 L12.5,11 L12.5,11 Z M6.5,11 C4,11 2,9 2,6.5 C2,4 4,2 6.5,2 C9,2 11,4 11,6.5 C11,9 9,11 6.5,11 L6.5,11 Z"
								id="Shape"
							/>
						</g>
					</g>
				</g>
			</svg>
			<input
				ref={inputRef}
				className={styles.input}
				placeholder="Поиск пиццы"
				value={value}
				onChange={handleInput}
			/>
			{value && (
				<svg
					className={styles.clearIcon}
					onClick={onClickClear}
					version="1.1"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<g id="grid_system" />
					<g id="_icons">
						<path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
					</g>
				</svg>
			)}
		</div>
	);
};

export default Search;
