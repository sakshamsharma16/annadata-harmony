
import { featuredProducts } from "./featured/ProductsData";
import FilterControls from "./featured/FilterControls";
import ProductGrid from "./featured/ProductGrid";
import { useProductFiltering } from "./featured/useProductFiltering";
import { useCart } from "./featured/useCart";

const FeaturedProducts = () => {
  const {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    visibleProducts,
    displayCount,
    showFilters,
    setShowFilters,
    priceRange,
    setPriceRange,
    loadMore,
  } = useProductFiltering(featuredProducts);

  const { addToCart, getTotalItems } = useCart(featuredProducts);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FilterControls
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          totalCartItems={getTotalItems()}
        />

        <ProductGrid
          visibleProducts={visibleProducts}
          displayCount={displayCount}
          addToCart={addToCart}
          loadMore={loadMore}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
