interface mySearch {
    searchFilter: string;
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function LibrarySearch({ searchFilter, setSearchFilter }: mySearch) {
    return (
        <div className="library-search">
            <input
                type="text"
                placeholder="Enter game name"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
            />
        </div>
    );
}

