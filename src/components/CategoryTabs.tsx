import { For } from 'solid-js';
import { Category } from '../types';

type CategoryTabsProps = {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
};

/**
 * CategoryTabs component displays a list of category tabs for product filtering.
 * @param {CategoryTabsProps} props - The properties passed to the CategoryTabs component.
 */
const CategoryTabs = (props: CategoryTabsProps) => {
    return (
        <div class="mb-4 flex flex-wrap">
            <For each={props.categories}>
                {(category) => (
                    <button
                        onClick={() => props.setSelectedCategory(category.id)}
                        class={`mr-2 mb-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${props.selectedCategory === category.id
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-black hover:bg-gray-300'
                            }`}
                    >
                        {category.name}
                    </button>
                )}
            </For>
        </div>
    );
};

export default CategoryTabs;