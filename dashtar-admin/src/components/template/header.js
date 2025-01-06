import React from "react";
import "/assets/css/style.css";

const Header = () => {
  return (
    <header class="nk-header">
      <div class="nk-header-main nk-menu-main will-shrink is-transparent ignore-mask">
        <div class="container">
          <div class="nk-header-wrap">
            <div class="nk-header-logo">
              <a href="index.html" class="logo-link">
                <div class="logo-wrap">
                  <img
                    width="45"
                    class="logo-img logo-light"
                    src="images/logo.png"
                    srcset="images/logo2x.png 2x"
                    alt=""
                  />
                  <img
                    width="45"
                    class="logo-img logo-dark"
                    src="images/logo-dark.png"
                    srcset="images/logo-dark2x.png 2x"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div class="nk-header-toggle">
              <button class="dark-mode-toggle">
                <em class="off icon ni ni-sun-fill"></em>
                <em class="on icon ni ni-moon-fill"></em>
              </button>
              <button class="btn btn-light btn-icon header-menu-toggle">
                <em class="icon ni ni-menu"></em>
              </button>
            </div>
            <nav class="nk-header-menu nk-menu">
              <ul class="nk-menu-list mx-auto">
                <li class="nk-menu-item">
                  <a class="nk-menu-link" href="index.html">
                    <span class="nk-menu-text">Home</span>
                  </a>
                </li>
                <li class="nk-menu-item">
                  <a class="nk-menu-link" href="about.html">
                    <span class="nk-menu-text">About</span>
                  </a>
                </li>
                <li class="nk-menu-item">
                  <a class="nk-menu-link" href="pricing.html">
                    <span class="nk-menu-text">Pricing</span>
                  </a>
                </li>
                <li class="nk-menu-item">
                  <a
                    class="nk-menu-link"
                    target="_blank"
                    href="terms-condition.html"
                  >
                    Terms &amp; Condition
                  </a>
                </li>
              </ul>
              <div class="mx-2 d-none d-lg-block">
                <button class="dark-mode-toggle">
                  <em class="off icon ni ni-sun-fill"></em>
                  <em class="on icon ni ni-moon-fill"></em>
                </button>
              </div>
              <ul class="nk-menu-buttons flex-lg-row-reverse">
                <li>
                  <a href="contact.html" class="btn btn-primary">
                    Try Now
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
