// File: src/lib/queries.ts
import { shopifyFetch } from "./shopify";

const productFragment = `
  id
  title
  handle
  description
  availableForSale
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 5) {
    edges {
      node {
        url
        altText
        width
        height
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;

export async function getProducts(limit = 10) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ${productFragment}
          }
        }
      }
    }
  `;

  // Fallback if env vars aren't set safely during dev
  if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
    return [];
  }

  const response = await shopifyFetch<any>({
    query,
    variables: { first: limit },
  });

  return response.body?.data?.products?.edges || [];
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ${productFragment}
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: { handle },
  });

  return response.body?.data?.product || null;
}

export async function createCart() {
  const query = `
    mutation createCart {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query });
  return response.body?.data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const query = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  };

  const response = await shopifyFetch<any>({ query, variables });
  return response.body?.data?.cartLinesAdd?.cart;
}
