import { createSignal, createEffect } from 'solid-js';
import productsData from './data/products.json';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { Product, CartItem, Category } from './types';

const App = () => {
  const [categories, setCategories] = createSignal<Category[]>(productsData.categories);
  const [selectedCategory, setSelectedCategory] = createSignal<string>(categories()[0]?.id || '');
  const [products, setProducts] = createSignal<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = createSignal<Product[]>([]);
  const [cart, setCart] = createSignal<CartItem[]>([]);
  const [sortBy, setSortBy] = createSignal<string>('name-asc');
  const [searchTerm, setSearchTerm] = createSignal<string>('');

  createEffect(() => {
    const category = categories().find(c => c.id === selectedCategory());
    setProducts(category?.products || []);
  });

  createEffect(() => {
    let filtered = products().filter(product =>
      product.name.toLowerCase().includes(searchTerm().toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy() === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy() === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy() === 'price-asc') return a.price - b.price;
      if (sortBy() === 'price-desc') return b.price - a.price;
      return 0;
    });

    setFilteredProducts(filtered);
  });

  const addToCart = (product: Product) => {
    setCart([...cart(), { ...product, quantity: 1, selectedAddons: [] }]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart().filter(item => item.id !== productId));
  };

  return (
    <div class="flex h-screen bg-gray-100">
      <ProductList
        categories={categories()}
        selectedCategory={selectedCategory()}
        setSelectedCategory={setSelectedCategory}
        products={filteredProducts()}
        sortBy={sortBy()}
        setSortBy={setSortBy}
        searchTerm={searchTerm()}
        setSearchTerm={setSearchTerm}
        cart={cart()}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <Cart
        cart={cart()}
        setCart={setCart}
      />
    </div>
  );
};

export default App;