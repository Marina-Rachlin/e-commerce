import React from "react";
import Head from "next/head";
import Banner from "../../components/banner/Banner.jsx";
import PopularCategory from "../../components/home/PopularCategory";
import FeatureProduct from "../../components/home/FeatureProduct";
import ProductBanner from "../../components/home/ProductBanner";
import SuggestSection from "../../components/home/SuggestSection";
import OfferBanner from "../../components/home/OfferBanner";
import TopSellingProduct from "../../components/home/TopSellingProduct";
import BrandSection from "../../components/home/BrandSection";
import BannerFooter from "../../components/home/BannerFooter";
import ProductViewModal from "../../components/common/ProductViewModal";
import FeatureProduct2 from "../../components/home/FeatureProduct2";

export default function Home() {
  return (
    <>
      <Head>
        <title>FOREVER YOUNG Global | Health & Beauty Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
      </Head>

      <ProductViewModal />
      <Banner />
      <PopularCategory />
      {/* <FeatureProduct /> */}
      <FeatureProduct2 />
      <ProductBanner />
      <SuggestSection />
      <OfferBanner />
      <TopSellingProduct />
      <BrandSection />
      <BannerFooter />
    </>
  );
}
