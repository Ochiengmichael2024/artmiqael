import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/features/home/HomePage";
import { ShopPage } from "@/features/shop/ShopPage";
import { ProductPage } from "@/features/product/ProductPage";
import { CartPage } from "@/features/cart/CartPage";
import { WishlistPage } from "@/features/wishlist/WishlistPage";
import { CheckoutPage } from "@/features/checkout/CheckoutPage";
import { OrderSuccessPage } from "@/features/order-success/OrderSuccessPage";
import { LoginPage } from "@/features/auth/LoginPage";
import { RegisterPage } from "@/features/auth/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/ForgotPasswordPage";
import { AccountPage } from "@/features/account/AccountPage";
import { OrderDetailPage } from "@/features/account/OrderDetailPage";
import { ArtistsPage } from "@/features/artists/ArtistsPage";
import { ArtistDetailPage } from "@/features/artists/ArtistDetailPage";
import { CollectionsPage } from "@/features/collections/CollectionsPage";
import { AboutPage } from "@/features/about/AboutPage";
import { ContactPage } from "@/features/contact/ContactPage";
import { CustomArtworkPage } from "@/features/custom-artwork/CustomArtworkPage";
import { SellPage } from "@/features/sell/SellPage";
import { BlogListPage } from "@/features/blog/BlogListPage";
import { BlogPostPage } from "@/features/blog/BlogPostPage";
import { FaqPage } from "@/features/faqs/FaqPage";
import { PolicyPage } from "@/features/policy/PolicyPage";
import { NotFoundPage } from "@/features/not-found/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:id" element={<ArtistDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/custom-artwork" element={<CustomArtworkPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:id" element={<OrderSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders/:id" element={<OrderDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/policy/:type" element={<PolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
