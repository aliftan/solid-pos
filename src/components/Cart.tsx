import { For, createEffect, createSignal } from 'solid-js';
import { CartItem, SelectedAddon } from '../types';
import CartItemComponent from './CartItem';
import CartSummary from './CartSummary';

type CartProps = {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
};

/**
 * Cart component that displays the items in the cart and manages cart operations.
 * @param {CartProps} props - The properties passed to the Cart component.
 */
const Cart = (props: CartProps) => {
    const [subtotal, setSubtotal] = createSignal(0);
    const [totalItems, setTotalItems] = createSignal(0);

    /**
     * Effect to calculate the subtotal and total number of items in the cart.
     */
    createEffect(() => {
        const total = props.cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity +
                item.selectedAddons.reduce(
                    (addonTotal, addon) =>
                        addonTotal + addon.price * addon.quantity,
                    0
                ),
            0
        );
        setSubtotal(total);

        const itemCount = props.cart.reduce((count, item) => count + item.quantity, 0);
        setTotalItems(itemCount);
    });

    /**
     * Removes an item from the cart.
     * @param {number} index - The index of the item to remove.
     */
    const removeFromCart = (index: number) => {
        props.setCart(props.cart.filter((_, i) => i !== index));
    };

    /**
     * Updates the quantity of an item in the cart.
     * @param {number} index - The index of the item to update.
     * @param {number} quantity - The new quantity.
     */
    const updateQuantity = (index: number, quantity: number) => {
        props.setCart(
            props.cart.map((item, i) => (i === index ? { ...item, quantity } : item))
        );
    };

    /**
     * Toggles an addon for an item in the cart.
     * @param {number} cartIndex - The index of the cart item.
     * @param {string} addonId - The ID of the addon to toggle.
     * @param {number} quantity - The quantity of the addon.
     */
    const toggleAddon = (cartIndex: number, addonId: string, quantity: number) => {
        props.setCart(
            props.cart.map((item, i) =>
                i === cartIndex
                    ? {
                        ...item,
                        selectedAddons: quantity > 0
                            ? [
                                ...item.selectedAddons.filter(a => a.id !== addonId),
                                {
                                    ...item.addons.find(a => a.id === addonId)!,
                                    quantity
                                } as SelectedAddon
                            ]
                            : item.selectedAddons.filter(a => a.id !== addonId)
                    }
                    : item
            )
        );
    };

    /**
     * Clears all items from the cart.
     */
    const clearCart = () => {
        props.setCart([]);
    };

    return (
        <div class="w-1/3 flex flex-col bg-white shadow-lg">
            <div class="flex justify-between items-center p-4 bg-black text-white">
                <h2 class="text-2xl font-bold">Cart ({totalItems()} items)</h2>
                <button
                    onClick={clearCart}
                    class="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                    Clear All
                </button>
            </div>
            <div class="flex-grow overflow-auto p-4">
                <For each={props.cart}>
                    {(item, index) => (
                        <CartItemComponent
                            item={item}
                            removeFromCart={() => removeFromCart(index())}
                            updateQuantity={(quantity) => updateQuantity(index(), quantity)}
                            toggleAddon={(addonId, quantity) => toggleAddon(index(), addonId, quantity)}
                        />
                    )}
                </For>
            </div>
            <CartSummary subtotal={subtotal()} />
        </div>
    );
};

export default Cart;