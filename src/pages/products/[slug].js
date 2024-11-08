import { fetchProductBySlug } from './../../../lib/contentful';
import { useCart } from './../../context/CartContext';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


export default function ProductDetail({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
      addToCart(product);
    };
  
    if (!product) {
      return <div>Product not found.</div>;
    }

    return (<div>
        <article>
            <section>
            <h3>{product.fields.name}</h3>
            <div>{documentToReactComponents(product.fields.description)}</div>
            <img src={product.fields.image.fields.file.url} width={200} />
            <button onClick={handleAddToCart}>Add to Cart</button>
        </section>
        </article>
    </div>)
}

export async function getServerSideProps({ params }) {
    const { slug } = params;
  
    try {
      const product = await fetchProductBySlug(slug);
  
      if (!product) {
        return { notFound: true };
      }
  
      return {
        props: { product },
      };
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return { notFound: true };
    }
  }