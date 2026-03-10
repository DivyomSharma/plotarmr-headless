export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: any;
}): Promise<{ status: number; body: T } | never> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

  if (!domain || !storefrontAccessToken) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Shopify variables missing. Please configure .env.local.");
    }
  }

  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      },
      body: JSON.stringify({ query, variables }),
      // Allows Next.js to cache fetches, we'll configure revalidation where used.
      cache: "no-store", 
    });

    const body = await result.json();

    if (body.errors) {
      console.error("Shopify GraphQL Errors:", body.errors);
      throw new Error("Failed to execute Shopify GraphQL Query.");
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error("Error executing shopifyFetch:", error);
    throw error;
  }
}
