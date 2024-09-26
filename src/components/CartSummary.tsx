import { createSignal, createEffect, Show } from 'solid-js';

type CartSummaryProps = {
    subtotal: number;
};

const CartSummary = (props: CartSummaryProps) => {
    const [showDiscount, setShowDiscount] = createSignal(false);
    const [discountType, setDiscountType] = createSignal<'fixed' | 'percentage'>('fixed');
    const [discountValue, setDiscountValue] = createSignal(0);
    const [discountAmount, setDiscountAmount] = createSignal(0);
    const [grandTotal, setGrandTotal] = createSignal(props.subtotal);

    createEffect(() => {
        let calculatedDiscount = 0;
        if (showDiscount()) {
            if (discountType() === 'fixed') {
                calculatedDiscount = Math.min(discountValue(), props.subtotal);
            } else {
                calculatedDiscount = Math.min(props.subtotal * (discountValue() / 100), props.subtotal);
            }
        }
        setDiscountAmount(calculatedDiscount);
        setGrandTotal(props.subtotal - calculatedDiscount);
    });

    const handleDiscountChange = (e: Event) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        setDiscountValue(isNaN(value) ? 0 : value);
    };

    const toggleDiscount = () => {
        setShowDiscount(!showDiscount());
        if (!showDiscount()) {
            setDiscountValue(0);
        }
    };

    return (
        <div class="p-4 bg-white border-t border-gray-200">
            <p class="font-semibold mb-3 text-lg text-black">
                Subtotal: <span class="text-black">${props.subtotal.toFixed(2)}</span>
            </p>
            <Show
                when={showDiscount()}
                fallback={
                    <button 
                        onClick={toggleDiscount}
                        class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800 transition-colors duration-200"
                    >
                        Add Discount
                    </button>
                }
            >
                <div class="mb-3">
                    <div class="flex justify-between items-center mb-2">
                        <label class="block text-black">Discount Type:</label>
                        <button 
                            onClick={toggleDiscount}
                            class="text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                    <div class="flex space-x-4">
                        <label class="inline-flex items-center">
                            <input
                                type="radio"
                                class="form-radio text-black"
                                checked={discountType() === 'fixed'}
                                onChange={() => setDiscountType('fixed')}
                            />
                            <span class="ml-2 text-black">Fixed Amount</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input
                                type="radio"
                                class="form-radio text-black"
                                checked={discountType() === 'percentage'}
                                onChange={() => setDiscountType('percentage')}
                            />
                            <span class="ml-2 text-black">Percentage</span>
                        </label>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="block text-black mb-2">Discount Value:</label>
                    <div class="flex items-center">
                        {discountType() === 'fixed' && <span class="mr-2 text-black">$</span>}
                        <input
                            type="number"
                            value={discountValue()}
                            onChange={handleDiscountChange}
                            min="0"
                            max={discountType() === 'fixed' ? props.subtotal : 100}
                            step={discountType() === 'fixed' ? '0.01' : '1'}
                            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                        />
                        {discountType() === 'percentage' && <span class="ml-2 text-black">%</span>}
                    </div>
                </div>
                <p class="mb-3 text-black">
                    Discount: <span class="font-medium text-red-500">-${discountAmount().toFixed(2)}</span>
                </p>
            </Show>
            <p class="text-xl font-bold text-black mt-3">
                Grand Total: <span class="text-black">${grandTotal().toFixed(2)}</span>
            </p>
        </div>
    );
};

export default CartSummary;