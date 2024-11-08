import { fetchProducts } from '../../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


function ProductList({ products }) {
    
    if(!products) {
        return  <div className="text-center py-10 text-xl">Loading...</div>;
    }

    return (<><h1>All Products</h1>{products.map(product => <div key={`product-${product.sys.id}`}>
        <article>
            <section>
            <h3>{product.fields.name}</h3>
            <div>{documentToReactComponents(product.fields.description)}</div>
            <img src={product.fields.image.fields.file.url} width={200} />
        </section>
        </article>
    </div>)}</>)
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