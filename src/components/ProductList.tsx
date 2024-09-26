import { For, createMemo } from 'solid-js';
import { Product, Category, CartItem } from '../types';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import ProductCard from './ProductCard';

type ProductListProps = {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
    products: Product[];
    sortBy: string;
    setSortBy: (sort: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
};

/**
 * ProductList component displays the list of products with search, sort, and category filtering capabilities.
 * @param {ProductListProps} props - The properties passed to the ProductList component.
 */
const ProductList = (props: ProductListProps) => {
    /**
     * Memoized function to check if a product is in the cart.
     */
    const isInCart = createMemo(() => {
        const cartProductIds = new Set(props.cart.map(item => item.id));
        return (productId: string) => cartProductIds.has(productId);
    });

    return (
        <div class="flex-grow overflow-auto p-4 bg-gray-100">
            <h1 class="text-3xl font-bold mb-6 text-black">Solid POS</h1>
            <SearchBar
                searchTerm={props.searchTerm}
                setSearchTerm={props.setSearchTerm}
                sortBy={props.sortBy}
                setSortBy={props.setSortBy}
            />
            <CategoryTabs
                categories={props.categories}
                selectedCategory={props.selectedCategory}
                setSelectedCategory={props.setSelectedCategory}
            />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                <For each={props.products}>
                    {(product) => (
                        <ProductCard 
                            product={product} 
                            addToCart={props.addToCart} 
                            removeFromCart={props.removeFromCart}
                            isInCart={isInCart()(product.id)}
                        />
                    )}
                </For>
            </div>
        </div>
    );
};

export default ProductList;