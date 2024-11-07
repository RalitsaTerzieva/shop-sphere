import { fetchProducts } from './../../lib/contentful';

export default function Home({ products }) {
  return (
    <div>
      <h1>Welcome to My E-Commerce Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.sys.id} className="product-card">
            <img src={product.fields.image.fields.file.url} alt={product.fields.name} />
            <h2>{product.fields.name}</h2>
            <p>{product.fields.description}</p>
            <p>${product.fields.price}</p>
            <a href={`/products/${product.fields.slug}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// Fetch products at build time
export async function getStaticProps() {
  const products = await fetchProducts();
  return {
    props: {
      products,
    },
  };
}
