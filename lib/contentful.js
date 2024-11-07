import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

// Function to fetch all products
export async function fetchProducts() {
  const entries = await client.getEntries({
    content_type: 'product',  // The Content Type you created for products
    order: 'fields.price',    // Optionally, order by price or other fields
  });

  return entries.items;
}

// Function to fetch a single product based on its slug
export async function fetchProductBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'product',
    'fields.slug': slug,
  });

  return entries.items[0];
}
