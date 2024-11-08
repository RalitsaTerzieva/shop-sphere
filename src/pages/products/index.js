import { fetchProducts } from '../../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


function ProductList({ products }) {
    
    if(!products) {
        return  <div className="text-center py-10 text-xl">Loading...</div>;
    }

    return ( <div className="container mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={`product-${product.sys.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <article className="p-4">
            <img
              src={product.fields.image.fields.file.url}
              alt={product.fields.name}
              className="w-full h-48 object-cover rounded-t-md mb-4"
            />
            <section>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {product.fields.name}
              </h3>
              <div className="text-gray-600 mb-4">
                {documentToReactComponents(product.fields.description)}
              </div>
            </section>
          </article>
        </div>
      ))}
    </div>
  </div>)
}

export async function getServerSideProps() {
  
    try {
      const products = await fetchProducts();
  
      return {
        props: { products },
      };
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return { notFound: true };
    }
  }

export default ProductList;