import { fetchProductBySlug } from './../../../lib/contentful';
import { useCart } from './../../context/CartContext';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


export default function ProductDetail({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
      addToCart(product);
    };
  
    if (!product) {
      return <div className="text-center py-10 text-xl">Product not found.</div>;
    }

    return ( 
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <article className="p-6">
      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {product.fields.name}
        </h3>
        <div className="text-gray-600 mb-6">
          {documentToReactComponents(product.fields.description)}
        </div>
        <img
          src={product.fields.image.fields.file.url}
          alt={product.fields.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </section>
    </article>
  </div>
  )
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