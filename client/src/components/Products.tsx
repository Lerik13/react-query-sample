import { Fragment, useState } from 'react';
import { useProduct, useProducts } from '../services/queries'

const Products = () => {
	const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
	
	const productsQuery = useProducts();
	const productQuery = useProduct(selectedProductId);

	return (
		<>
			{productsQuery.data?.pages.map((group, index) => (
				<Fragment key={index}>
					{group.map((product) => (
						<Fragment key={product.id}>
							<button onClick={() => setSelectedProductId(product.id)}>
								{product.name}
							</button>
							<br />
						</Fragment>
					))}
				</Fragment>
			))}
			<br />
			<div>
				<button
					onClick={() => productsQuery.fetchNextPage()}
					disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
				>
					{productsQuery.isFetchingNextPage
						? "Loading more..."
						: productsQuery.hasNextPage
						? "Load More"
						: "Nothing more to load"}
				</button>
			</div>

			<h4>Selected product: {selectedProductId}</h4>
			{JSON.stringify(productQuery.data)}
		</>
	)
}

export default Products