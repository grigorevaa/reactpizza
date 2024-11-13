import { memo } from 'react';
import ListItem from './ListItem';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

type CategoriesProps = {
	categoryId: number;
	handleCategoryId: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(
	({ categoryId, handleCategoryId }) => {
		return (
			<div className="categories">
				<ul>
					{categories.map((item, index) => (
						<ListItem
							name={item}
							index={index}
							categoryId={categoryId}
							onChangeSelect={handleCategoryId}
							key={index}
						/>
					))}
				</ul>
			</div>
		);
	},
);

export default Categories;
