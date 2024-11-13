import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://66f99a1fafc569e13a993c8d.mockapi.io/items/${id}`,
				);
				setPizza(data);
			} catch (error) {
				console.log('Error fetching pizza:', error);
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) return <div>Loading...</div>;

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="pizza" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} Р</h4>
		</div>
	);
};

export default FullPizza;
