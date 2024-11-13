type ListProps = {
	name: string;
	index: number;
	categoryId: number;
	onChangeSelect: (index: number) => void;
};

const ListItem: React.FC<ListProps> = ({
	name,
	index,
	categoryId,
	onChangeSelect,
}) => {
	return (
		<li
			className={categoryId === index ? 'active' : ''}
			onClick={() => onChangeSelect(index)}>
			{name}
		</li>
	);
};

export default ListItem;
