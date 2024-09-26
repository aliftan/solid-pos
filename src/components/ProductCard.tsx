import { Product } from '../types';

type ProductCardProps = {
    product: Product;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    isInCart: boolean;
};

/**
 * ProductCard component displays a single product with its details and add/remove from cart button.
 * @param {ProductCardProps} props - The properties passed to the ProductCard component.
 */
const ProductCard = (props: ProductCardProps) => {
    return (
        <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div class="text-4xl mb-4 flex justify-center items-center h-24">{props.product.image}</div>
            <h3 class="font-bold text-lg mb-2 text-black">{props.product.name}</h3>
            <p class="text-black mb-4">${props.product.price.toFixed(2)}</p>
            <button
                onClick={() => props.isInCart ? props.removeFromCart(props.product.id) : props.addToCart(props.product)}
                class={`w-full py-2 px-4 rounded-full transition-colors duration-200 ${
                    props.isInCart 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
                {props.isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductCard;