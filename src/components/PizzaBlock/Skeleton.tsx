import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={475}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb">
		<circle cx="134" cy="136" r="125" />
		<rect x="0" y="268" rx="15" ry="15" width="280" height="32" />
		<rect x="0" y="318" rx="10" ry="10" width="280" height="88" />
		<rect x="0" y="431" rx="10" ry="10" width="95" height="30" />
		<rect x="128" y="423" rx="25" ry="25" width="152" height="45" />
	</ContentLoader>
);

export default Skeleton;
