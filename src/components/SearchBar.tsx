import { Show } from 'solid-js';

type SearchBarProps = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
    const clearSearch = () => {
        props.setSearchTerm('');
    };

    return (
        <div class="mb-4 flex flex-col sm:flex-row">
            <div class="relative flex-grow mb-2 sm:mb-0 sm:mr-2">
                <input
                    type="text"
                    placeholder="Search products"
                    value={props.searchTerm}
                    onInput={(e) => props.setSearchTerm(e.currentTarget.value)}
                    class="w-full p-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Show when={props.searchTerm.length > 0}>
                    <button
                        onClick={clearSearch}
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                </Show>
            </div>
            <select
                value={props.sortBy}
                onChange={(e) => props.setSortBy(e.currentTarget.value)}
                class="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
                <option value="price-desc">Price (High to Low)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
            </select>
        </div>
    );
};

export default SearchBar;