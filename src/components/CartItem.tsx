import { For, createSignal } from 'solid-js';
import { CartItem, Addon } from '../types';

type CartItemProps = {
    item: CartItem;
    removeFromCart: () => void;
    updateQuantity: (quantity: number) => void;
    toggleAddon: (addonId: string, quantity: number) => void;
};

/**
 * CartItemComponent displays a single item in the cart with its details and controls.
 * @param {CartItemProps} props - The properties passed to the CartItemComponent.
 */
const CartItemComponent = (props: CartItemProps) => {
    return (
        <div class="border-b border-gray-200 py-4">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-lg font-semibold text-black">{props.item.name}</h3>
                <p class="text-lg font-medium text-black">${props.item.price.toFixed(2)}</p>
            </div>
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                    <button 
                        onClick={() => props.updateQuantity(Math.max(1, props.item.quantity - 1))}
                        class="bg-black text-white px-2 py-1 rounded-l hover:bg-gray-800 transition-colors duration-200"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={props.item.quantity}
                        min="1"
                        onChange={(e) => props.updateQuantity(parseInt(e.currentTarget.value))}
                        class="w-12 p-1 border-t border-b border-black text-center"
                    />
                    <button 
                        onClick={() => props.updateQuantity(props.item.quantity + 1)}
                        class="bg-black text-white px-2 py-1 rounded-r hover:bg-gray-800 transition-colors duration-200"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={props.removeFromCart}
                    class="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                    Remove
                </button>
            </div>
            <div class="space-y-1">
                <For each={props.item.addons}>
                    {(addon) => (
                        <AddonItem 
                            addon={addon} 
                            isSelected={props.item.selectedAddons.some(a => a.id === addon.id)}
                            quantity={props.item.selectedAddons.find(a => a.id === addon.id)?.quantity || 0}
                            toggleAddon={props.toggleAddon}
                        />
                    )}
                </For>
            </div>
        </div>
    );
};

type AddonItemProps = {
    addon: Addon;
    isSelected: boolean;
    quantity: number;
    toggleAddon: (addonId: string, quantity: number) => void;
};

/**
 * AddonItem component represents an addon option for a cart item.
 * @param {AddonItemProps} props - The properties passed to the AddonItem component.
 */
const AddonItem = (props: AddonItemProps) => {
    const [quantity, setQuantity] = createSignal(props.quantity);

    const handleToggle = () => {
        if (props.isSelected) {
            props.toggleAddon(props.addon.id, 0);
            setQuantity(0);
        } else {
            props.toggleAddon(props.addon.id, 1);
            setQuantity(1);
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        props.toggleAddon(props.addon.id, newQuantity);
    };

    return (
        <div class="flex items-center justify-between py-1">
            <label class="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={handleToggle}
                    class="mr-2 form-checkbox h-4 w-4 text-black border-black"
                />
                <span class="text-sm text-black">{props.addon.name} (${props.addon.price.toFixed(2)})</span>
            </label>
            {props.isSelected && (
                <div class="flex items-center">
                    <button 
                        onClick={() => handleQuantityChange(Math.max(1, quantity() - 1))}
                        class="bg-black text-white px-2 py-1 text-xs rounded-l hover:bg-gray-800 transition-colors duration-200"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity()}
                        min="1"
                        onChange={(e) => handleQuantityChange(parseInt(e.currentTarget.value))}
                        class="w-8 p-1 text-xs border-t border-b border-black text-center"
                    />
                    <button 
                        onClick={() => handleQuantityChange(quantity() + 1)}
                        class="bg-black text-white px-2 py-1 text-xs rounded-r hover:bg-gray-800 transition-colors duration-200"
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartItemComponent;