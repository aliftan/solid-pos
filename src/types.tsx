export type Product = {
    id: string;
    name: string;
    image: string;
    price: number;
    addons: { id: string; name: string; price: number }[];
};

export type Category = {
    id: string;
    name: string;
    products: Product[];
};

export type Addon = {
    id: string;
    name: string;
    price: number;
};

export type SelectedAddon = Addon & { quantity: number };

export type CartItem = Product & {
    quantity: number;
    selectedAddons: SelectedAddon[];
};