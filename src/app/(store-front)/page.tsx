import { CategoriesSelection } from "@/components/store-front/CategorySelection";
import { FeaturedProducts } from "@/components/store-front/FeaturedProducts";
import { Hero } from "@/components/store-front/Hero";

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
}
