import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Plus,
  Minus,
  ArrowRight,
  Heart,
  Trash2,
} from "lucide-react";
import "./styles.css";
const products = [
  {
    id: 1,
    name: "Minimal Ceramic Vase",
    category: "Home Decor",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Modern Table Lamp",
    category: "Lighting",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Classic Lounge Chair",
    category: "Furniture",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Everyday Tote Bag",
    category: "Accessories",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "Elegant Glass Set",
    category: "Home Decor",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    name: "Luxury Scented Candle",
    category: "Accessories",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    name: "Wooden Side Table",
    category: "Furniture",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    name: "Designer Pendant Light",
    category: "Lighting",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to your bag!`);

    setTimeout(() => setMessage(""), 2500);
  }

  function updateQuantity(id, amount) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function scrollToShop() {
    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  }

  if (checkoutOpen) {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <button className="text-button back-button" type="button" onClick={() => setCheckoutOpen(false)}>← Back to shopping</button>
          <a href="#" className="logo" onClick={(event) => { event.preventDefault(); setCheckoutOpen(false); }}>forma<span>.</span></a>
          <span className="secure-label">Secure checkout</span>
        </header>

        <div className="checkout-layout">
          <section className="checkout-form-wrap">
            <p className="eyebrow">ALMOST YOURS</p>
            <h1>Checkout</h1>
            <p className="checkout-subtitle">Enter your details to complete this demo order.</p>
            <form className="checkout-form" onSubmit={(event) => {
              event.preventDefault();
              setCart([]);
              setCheckoutOpen(false);
              setMessage("Thank you! Your demo order has been placed.");
              setTimeout(() => setMessage(""), 4000);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
              <h2>Contact information</h2>
              <label>Email address<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></label>
              <h2>Shipping address</h2>
              <div className="form-row">
                <label>First name<input name="firstName" autoComplete="given-name" required /></label>
                <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
              </div>
              <label>Address<input name="address" placeholder="House / street address" autoComplete="street-address" required /></label>
              <div className="form-row">
                <label>City<input name="city" autoComplete="address-level2" required /></label>
                <label>Postal code<input name="postalCode" autoComplete="postal-code" required /></label>
              </div>
              <label>Phone number<input type="tel" name="phone" placeholder="03xx-xxxxxxx" autoComplete="tel" required /></label>
              <h2>Payment method</h2>
              <div className="payment-note"><strong>Cash on delivery (demo)</strong><span>This is a frontend demo. No payment will be collected.</span></div>
              <button className="primary-button checkout-submit" type="submit">Place demo order <ArrowRight size={18} /></button>
              <p className="checkout-disclaimer">Demo checkout only — this does not process real payments or send orders to a store.</p>
            </form>
          </section>
          <aside className="order-summary">
            <h2>Your order</h2>
            {cart.length === 0 ? <p>Your bag is empty.</p> : cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div><strong>{item.name}</strong><span>Qty: {item.quantity}</span></div>
                <b>${(item.price * item.quantity).toFixed(2)}</b>
              </div>
            ))}
            <div className="summary-line"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <div className="summary-line"><span>Shipping</span><strong>{subtotal >= 100 ? "Free" : "$8.00"}</strong></div>
            <div className="summary-line summary-total"><span>Total</span><strong>${(subtotal + (subtotal >= 100 || subtotal === 0 ? 0 : 8)).toFixed(2)}</strong></div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="announcement">
        Thoughtful things, made to last.
        <span> Free shipping on orders over $100</span>
      </div>

      <header className="header">
        <button
          className="icon-button mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <a href="#" className="logo">
          forma<span>.</span>
        </a>

        <nav className={menuOpen ? "navigation open" : "navigation"}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>
            Shop
          </a>
          <a href="#collections" onClick={() => setMenuOpen(false)}>
            Collections
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            Our Story
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search />
          </button>

          <button
            className="bag-button"
            onClick={() => setCartOpen(true)}
            aria-label="Shopping bag"
          >
            <ShoppingBag />
            <span>Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-bar">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              document.getElementById("shop")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          />

          <button
            className="icon-button"
            onClick={() => {
              setSearch("");
              setSearchOpen(false);
            }}
            aria-label="Close search"
          >
            <X />
          </button>
        </div>
      )}

      <main>
        <section className="hero" id="collections">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
            alt="Beautiful modern living room"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <p className="eyebrow">THE ART OF EVERYDAY LIVING</p>

            <h1>
              Less, but
              <br />
              <em>better.</em>
            </h1>

            <p className="hero-description">
              Thoughtfully designed objects for
              <br className="desktop-break" />
              slower mornings and softer spaces.
            </p>

            <button className="primary-button" onClick={scrollToShop}>
              Explore Collection <ArrowRight size={17} />
            </button>
          </div>

          <div className="hero-bottom">
            <span>01 — THE NEW COLLECTION</span>
            <span>DESIGNED FOR EVERYDAY LIVING</span>
          </div>
        </section>

        <section className="intro">
          <p className="eyebrow">DESIGNED WITH INTENTION</p>

          <h2>
            A little less noise.
            <br />
            <em>A little more meaning.</em>
          </h2>

          <p>
            Thoughtful materials. Timeless forms.
            <br />
            Everyday objects that feel special.
          </p>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE FORMA EDIT</p>

              <h2>
                Objects to <em>live with.</em>
              </h2>
            </div>

            <span className="product-total">
              {filteredProducts.length} OBJECTS
            </span>
          </div>

          <div className="shop-toolbar">
            <div className="categories">
              {[
                "All",
                "Home Decor",
                "Furniture",
                "Lighting",
                "Accessories",
              ].map((item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "category-button active"
                      : "category-button"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />

                  <button
                    className={
                      favorites.includes(product.id)
                        ? "favorite-button favorite-active"
                        : "favorite-button"
                    }
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      fill={
                        favorites.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                  <button
                    className="quick-add"
                    onClick={() => addToCart(product)}
                  >
                    <Plus size={17} /> Add to bag
                  </button>
                </div>

                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                  </div>

                  <span className="price">${product.price}</span>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-results">
              <h3>No products found</h3>
              <p>Try another search or category.</p>

              <button
                className="outline-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85"
              alt="Minimal interior with natural materials"
              loading="lazy"
            />
          </div>

          <div className="about-content">
            <p className="eyebrow">A DIFFERENT KIND OF EVERYDAY</p>

            <h2>
              Made for the
              <br />
              <em>moments in between.</em>
            </h2>

            <p>
              We believe the things we live with should bring a little
              calm to everyday life. We choose thoughtful forms, honest
              materials, and timeless designs made to be loved for years.
            </p>

            <button className="text-button" onClick={scrollToShop}>
              Discover our collection <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="values">
          <div>
            <span>01</span>
            <h3>Made with care</h3>
            <p>Thoughtful materials and considered details.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Less, not more</h3>
            <p>Timeless pieces, chosen to last.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Everyday, elevated</h3>
            <p>Little things that make a difference.</p>
          </div>
        </section>

        <section className="newsletter">
          <p className="eyebrow">A NOTE FROM FORMA</p>

          <h2>
            Good things,
            <br />
            <em>occasionally.</em>
          </h2>

          <p>New arrivals, thoughtful notes, and little inspirations.</p>

          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("Thank you for joining our newsletter!");
              setTimeout(() => setMessage(""), 3000);
              event.target.reset();
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
              required
            />

            <button type="submit" aria-label="Subscribe">
              <ArrowRight />
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <a href="#" className="logo">
              forma<span>.</span>
            </a>

            <p>Thoughtful objects for everyday living.</p>
          </div>

          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <a href="#shop">Shop all</a>
              <a href="#collections">Collections</a>
              <a href="#about">Our story</a>
            </div>

            <div>
              <h4>Help</h4>
              <a href="#footer">Shipping & returns</a>
              <a href="mailto:hello@example.com">Contact us</a>
              <a href="#footer">FAQs</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom" id="footer">
          <span>© 2026 Forma Studio</span>
          <span>Designed for everyday living.</span>
        </div>
      </footer>

      {message && <div className="toast">{message}</div>}

      {cartOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2>Your Bag ({cartCount})</h2>
              </div>

              <button
                className="icon-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={35} />
                <h3>Your bag is waiting.</h3>
                <p>Discover something lovely for your space.</p>

                <button
                  className="primary-button dark-button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToShop();
                  }}
                >
                  Explore products <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>${item.price}</p>

                        <div className="quantity-control">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() =>
                          setCart((previous) =>
                            previous.filter(
                              (product) => product.id !== item.id
                            )
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </div>

                  <p>Shipping and taxes calculated at checkout.</p>

                  <button
                    className="primary-button dark-button checkout-button"
                    onClick={() => {
                      if (cart.length === 0) return;
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                  >
                    Continue to checkout <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
