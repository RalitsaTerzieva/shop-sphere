import { fetchProductBySlug } from './../../../lib/contentful';

export default function ProductDetail({ product }) {
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>{product.fields.name}</h1>
      <img src={product.fields.image.fields.file.url} alt={product.fields.name} />
      <p>{product.fields.description}</p>
      <p>${product.fields.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export async function getStaticPaths() {
  const products = await fetchProducts();
  const paths = products.map((product) => ({
    params: { slug: product.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProductBySlug(params.slug);

  return {
    props: {
      product,
    },
  };
}
