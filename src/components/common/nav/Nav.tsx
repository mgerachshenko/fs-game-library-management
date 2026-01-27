import "./Nav.css";
import { NavLink } from "react-router-dom";

function Nav() {
    const tabs = [
        { tab: "STORE", href: "/store" },
        { tab: "LIBRARY", href: "/library" },
        { tab: "PROFILE", href: "/profile" }
    ];

    return (
        <nav>
            <div className="page-links">
                {tabs.map((tab, index) => (
                    <span key={index}>
                        <NavLink to={tab.href}>
                            {tab.tab}
                        </NavLink>
                    </span>
                ))}
            </div>
        </nav>
    );
}

export default Nav;
