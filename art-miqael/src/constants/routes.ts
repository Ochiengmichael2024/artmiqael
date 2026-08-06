/** Single source of truth for every route path in the app. Never hardcode a path string elsewhere. */
export const ROUTES = {
  home: "/",
  shop: "/shop",
  artists: "/artists",
  artistDetail: (id: string) => `/artists/${id}`,
  collections: "/collections",
  customArtwork: "/custom-artwork",
  sell: "/sell",
  product: (id: string) => `/product/${id}`,
  cart: "/cart",
  wishlist: "/wishlist",
  checkout: "/checkout",
  orderSuccess: (id: string) => `/order-success/${id}`,
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  account: "/account",
  orderDetail: (id: string) => `/account/orders/${id}`,
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  faqs: "/faqs",
  policy: (type: string) => `/policy/${type}`,
} as const;

export const ARTIST_DETAIL_PATH = "/artists/:id";
export const PRODUCT_PATH = "/product/:id";
export const ORDER_DETAIL_PATH = "/account/orders/:id";
export const BLOG_POST_PATH = "/blog/:slug";
export const POLICY_PATH = "/policy/:type";
