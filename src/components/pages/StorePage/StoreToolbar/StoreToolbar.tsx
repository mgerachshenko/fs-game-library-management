import { useId, useMemo, useState } from "react";
import "./StoreToolbar.css";
import { useTextInput } from "../../../../hooks/useTextInput"; 

type MenuItem = {
    id: string;
    label: string;
};

export default function StoreToolbar() {
    const browseItems: MenuItem[] = useMemo(
        () => [
            { id: "SH", label: "Store Home" },
            { id: "NR", label: "New Releases" },
            { id: "UR", label: "Upcoming Releases" },
            { id: "AC&S", label: "All Charts & Stats" },
        ],
        [],
    );

    const categoryItems: MenuItem[] = useMemo(
        () => [
            { id: "racing", label: "RACING" },
            { id: "casual", label: "CASUAL" },
            { id: "Anime", label: "ANIME" },
            { id: "SR", label: "STORY-RICH" },
            { id: "FTP", label: "FREE TO PLAY" },
        ],
        [],
    );

    const [browseOpen, setBrowseOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const [selectedBrowse, setSelectedBrowse] = useState<MenuItem>(
        browseItems[0],
    );
    const [selectedCategory, setSelectedCategory] = useState<MenuItem>(
        categoryItems[0],
    );

    const searchInput = useTextInput(""); 
    const [lastSearch, setLastSearch] = useState<string | null>(null);

    const uid = useId();
    const browseMenuId = `browse-menu-${uid}`;
    const categoriesMenuId = `categories-menu-${uid}`;
    const searchInputId = `search-input-${uid}`;

    function closeAllMenus() {
        setBrowseOpen(false);
        setCategoriesOpen(false);
    }

    function toggleBrowse() {
        setBrowseOpen((prev) => {
        const next = !prev;
        if (next) setCategoriesOpen(false);
        return next;
        });
    }

    function toggleCategories() {
        setCategoriesOpen((prev) => {
        const next = !prev;
        if (next) setBrowseOpen(false);
        return next;
        });
    }

    function handleSelectBrowse(item: MenuItem) {
        setSelectedBrowse(item);
        setBrowseOpen(false);
    }

    function handleSelectCategory(item: MenuItem) {
        setSelectedCategory(item);
        setCategoriesOpen(false);
    }

    function handleSearchSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = searchInput.value.trim();
        setLastSearch(trimmed.length > 0 ? trimmed : null);
        closeAllMenus();
    }

    return (
        <section className="store-toolbar" aria-label="Store toolbar">
            <div className="store-toolbar__inner">
                <div className="store-toolbar__menus" aria-label="Store menus">
                    {/* Browse Dropdown */}
                    <div className="store-toolbar__menu">
                        <button
                            type="button"
                            className="store-toolbar__trigger"
                            aria-haspopup="menu"
                            aria-expanded={browseOpen}
                            aria-controls={browseMenuId}
                            onClick={toggleBrowse}
                        >
                            Browse
                            <span
                                className="store-toolbar__chevron"
                                aria-hidden="true"
                            >
                                ▾
                            </span>
                        </button>

                        {browseOpen && (
                            <ul
                                id={browseMenuId}
                                className="store-toolbar__dropdown"
                                role="menu"
                                aria-label="Browse menu"
                            >
                                {browseItems.map((item) => (
                                    <li key={item.id} role="none">
                                        <button
                                            type="button"
                                            role="menuitem"
                                            className="store-toolbar__item"
                                            onClick={() =>
                                                handleSelectBrowse(item)
                                            }
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Categories Dropdown */}
                    <div className="store-toolbar__menu">
                        <button
                            type="button"
                            className="store-toolbar__trigger"
                            aria-haspopup="menu"
                            aria-expanded={categoriesOpen}
                            aria-controls={categoriesMenuId}
                            onClick={toggleCategories}
                        >
                            Categories
                            <span
                                className="store-toolbar__chevron"
                                aria-hidden="true"
                            >
                                ▾
                            </span>
                        </button>

                        {categoriesOpen && (
                            <ul
                                id={categoriesMenuId}
                                className="store-toolbar__dropdown"
                                role="menu"
                                aria-label="Categories menu"
                            >
                                {categoryItems.map((item) => (
                                    <li key={item.id} role="none">
                                        <button
                                            type="button"
                                            role="menuitem"
                                            className="store-toolbar__item"
                                            onClick={() =>
                                                handleSelectCategory(item)
                                            }
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Search */}
                <form
                    className="store-toolbar__search"
                    onSubmit={handleSearchSubmit}
                    aria-label="Search form"
                >
                    <label className="sr-only" htmlFor={searchInputId}>
                        Search the store
                    </label>
                    <input
                        id={searchInputId}
                        className="store-toolbar__search-input"
                        type="search"
                        value={searchInput.value}
                        onChange={searchInput.handleChange}
                        placeholder="Search"
                        onFocus={closeAllMenus}
                    />
                    <button
                        className="store-toolbar__search-button"
                        type="submit"
                        aria-label="Search"
                        title="Search"
                    >
                        <span
                            aria-hidden="true"
                            className="store-toolbar__search-icon"
                        >
                            🔍
                        </span>
                    </button>
                </form>
            </div>

            {/* Results / status (simple, not navigation) */}
            <div className="store-toolbar__status" aria-live="polite">
                <p className="store-toolbar__status-line">
                    Selected: <strong>{selectedBrowse.label}</strong> /{" "}
                    <strong>{selectedCategory.label}</strong>
                </p>
                <p className="store-toolbar__status-line">
                    {lastSearch ? (
                        <>
                            Searching for: <strong>{lastSearch}</strong>
                        </>
                    ) : (
                        <>
                            Searching for:{" "}
                            <span className="store-toolbar__muted">—</span>
                        </>
                    )}
                </p>
            </div>
        </section>
    );
}