import "./Nav.css";

function Nav() {
    const tabs = [
        { tab: "STORE", href: "#" },
        { tab: "LIBRARY", href: "#" },
        { tab: "PROFILE", href: "#" }
    ];

    return (
        <nav>
            <div className="page-links">
                {tabs.map((tab, index) => (
                    <span key={index}>
                        <a href={tab.href}>{tab.tab}</a>
                    </span>
                ))}
            </div>
        </nav>
    );
}

export default Nav;
