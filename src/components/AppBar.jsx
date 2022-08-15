import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AppBar = ({ pages }) => {
  console.log("Pritesh", pages);
  const [isShow, setShow] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleClickNavMenu = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <header
      className="site-header"
      role="banner"
      itemScope="itemscope"
      itemType="http://schema.org/WPHeader"
    >
      <div
        className="site-title"
        itemScope
        itemType="http://schema.org/Organization"
      >
        10up Blog
      </div>

      <nav
        className="site-navigation"
        role="navigation"
        itemScope="itemscope"
        itemType="http://schema.org/SiteNavigationElement"
      >
        <a
          href="#menu-main-nav"
          id="js-menu-toggle"
          className="site-menu-toggle"
          onClick={() => {
            setShow(!isShow);
          }}
        >
          <span className="screen-reader-text">Primary Menu</span>
          <span aria-hidden="true">☰</span>
        </a>
        <ul id="menu-main-nav" className="primary-menu">
          {isShow &&
            pages.map((page) => {
              return (
                <li
                  key={page.label}
                  className="menu-item menu-item-type-custom menu-item-object-custom"
                  onClick={() => handleClickNavMenu(page.path)}
                >
                  {page.label}
                </li>
              );
            })}
          {isShow && !!user && (
            <li
              key="Logout"
              className="menu-item menu-item-type-custom menu-item-object-custom"
              onClick={logout}
            >
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
