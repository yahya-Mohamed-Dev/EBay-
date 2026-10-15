import React, { useEffect, useMemo, useState } from 'react';

const products = [
  { id: 1, name: 'Apple iPhone 15 Pro Max 256GB – Unlocked', price: 829, oldPrice: 999, category: 'Electronics', badge: 'Great price', image: 'photo-1592750475338-74b7b21085ab' },
  { id: 2, name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', price: 278, oldPrice: 399, category: 'Electronics', badge: 'Best seller', image: 'photo-1546435770-a3e426bf472b' },
  { id: 3, name: 'Vintage 1990s Denim Trucker Jacket', price: 54.99, oldPrice: 89, category: 'Fashion', badge: 'Trending', image: 'photo-1543076447-215ad9ba6923' },
  { id: 4, name: 'Nike Air Jordan 1 Retro High OG Sneakers', price: 164.99, oldPrice: 210, category: 'Fashion', badge: 'Popular', image: 'photo-1552346154-21d32810aba3' },
  { id: 5, name: 'Canon EOS R6 Mirrorless Digital Camera', price: 1479, oldPrice: 1899, category: 'Electronics', badge: 'Top pick', image: 'photo-1516035069371-29a1b244cc32' },
  { id: 6, name: 'LEGO Star Wars Millennium Falcon Building Set', price: 129.95, oldPrice: 169, category: 'Toys & Hobbies', badge: 'Collector favorite', image: 'photo-1587654780291-39c9404d746b' },
  { id: 7, name: 'Classic Seiko Automatic Stainless Steel Watch', price: 219, oldPrice: 310, category: 'Collectibles', badge: 'Great find', image: 'photo-1524805444758-089113d48a6d' },
  { id: 8, name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 69.99, oldPrice: 99, category: 'Home & Garden', badge: 'Deal', image: 'photo-1585515320310-259814833e62' },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Collectibles', 'Toys & Hobbies'];
const categoryPath = (value) => `/category/${encodeURIComponent(value.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and'))}`;
const infoPages = {
  'about-ebay': {
    eyebrow: 'Our marketplace',
    title: 'About eBay',
    intro: 'eBay brings buyers and sellers together to find great value, discover unique items, and give pre-loved things a second life.',
    sections: [
      ['A marketplace built around choice', 'Browse new, pre-owned, vintage, and refurbished finds from independent sellers and established brands. There is always something different to discover.'],
      ['Buy and sell your way', 'Shop across categories or create a listing for something you no longer need. Our marketplace gives people more ways to find what they are looking for.'],
      ['A community of enthusiasts', 'From everyday essentials to hard-to-find collectibles, eBay is a place for people who love finding and sharing good things.'],
    ],
    action: ['Explore the marketplace', '/deals'],
  },
  announcements: {
    eyebrow: 'What’s new',
    title: 'Announcements',
    intro: 'Catch up on marketplace updates, seasonal shopping highlights, and new ways to make the most of eBay.',
    sections: [
      ['Discover more ways to shop', 'Explore curated collections and popular categories to find inspiration for your next purchase.'],
      ['A fresh take on pre-loved', 'Find quality pre-owned pieces and give items a new home while shopping for something distinctive.'],
      ['Stay in the loop', 'Check back for product updates, community news, and important service announcements.'],
    ],
    action: ['See today’s deals', '/deals'],
  },
  community: {
    eyebrow: 'Buyers, sellers, collectors',
    title: 'The eBay community',
    intro: 'eBay is made up of people who love finding, collecting, restoring, and reselling things. Connect with fellow enthusiasts and make your next discovery.',
    sections: [
      ['Find your people', 'Explore communities around the things you love, from vintage fashion and trading cards to electronics and home finds.'],
      ['Share what you know', 'Ask questions, swap collecting tips, and learn from other members who know the details that make a great find.'],
      ['Build trust as you trade', 'Read item descriptions carefully, check seller feedback, and keep your conversations and transactions on eBay.'],
    ],
    action: ['Browse collectibles', categoryPath('Collectibles')],
  },
  'security-center': {
    eyebrow: 'Shop with confidence',
    title: 'Security Center',
    intro: 'A few simple habits can help protect your account and make buying and selling feel safer.',
    sections: [
      ['Protect your account', 'Use a unique password, keep your sign-in details private, and review your account activity regularly.'],
      ['Keep transactions on eBay', 'Use eBay checkout and eBay messages. Be cautious of requests to pay or communicate outside the platform.'],
      ['Recognize suspicious messages', 'Avoid unexpected links and never share passwords or verification codes. When in doubt, visit eBay directly and check your account.'],
    ],
    action: ['Get help and contact us', '/info/help-and-contact'],
  },
  'seller-center': {
    eyebrow: 'Tools for sellers',
    title: 'Seller Center',
    intro: 'Get started selling, create clear listings, and keep track of your orders from one place.',
    sections: [
      ['Create a helpful listing', 'Add a clear title, accurate item details, good photos, and a fair price so buyers know exactly what to expect.'],
      ['Manage orders', 'Keep an eye on your sales, answer buyer questions, and ship items promptly using the delivery option in your listing.'],
      ['Grow at your own pace', 'Start with a few items, learn what buyers respond to, and build your store as you go.'],
    ],
    action: ['Start selling', '/sell'],
  },
  policies: {
    eyebrow: 'Marketplace standards',
    title: 'Policies',
    intro: 'eBay policies help keep the marketplace useful, respectful, and safer for buyers and sellers.',
    sections: [
      ['Listing responsibly', 'Listings should accurately describe the item, its condition, and what is included. Some goods are restricted or not allowed.'],
      ['Respect other members', 'Communicate honestly, follow through on transactions, and treat other members fairly.'],
      ['Know the details', 'Review the relevant policy before listing or buying. The rules may vary by item type and location.'],
    ],
    action: ['Read the User Agreement', '/info/user-agreement'],
  },
  'help-and-contact': {
    eyebrow: 'We’re here to help',
    title: 'Help & Contact',
    intro: 'Find a quick answer to common questions about orders, payments, returns, accounts, and selling.',
    sections: [
      ['Track an order', 'Open your purchase history to check an order’s latest status and delivery details. Sign in to see your orders.'],
      ['Returns and refunds', 'Start with the seller’s return policy on the listing, then use your order details to contact the seller or request help.'],
      ['Account and sign-in help', 'If you cannot access your account, use the sign-in page to continue with your email or username. Never share a verification code.'],
    ],
    action: ['Sign in to your account', '/signin'],
  },
  'daily-deals': {
    eyebrow: 'Good finds, great prices',
    title: 'Daily Deals',
    intro: 'Explore a rotating selection of deals across popular categories, from everyday electronics to fashion and home essentials.',
    sections: [
      ['Shop today’s picks', 'Browse current featured items and compare the price, item details, and delivery information before you buy.'],
      ['Look beyond the usual', 'Deals are a great way to discover a new brand or find an unexpected item you did not know you needed.'],
      ['Check back often', 'Featured offers change. Save a listing to your watchlist if you want to keep an eye on it.'],
    ],
    action: ['Browse today’s deals', '/deals'],
  },
  'brand-outlet': {
    eyebrow: 'Big brands, outlet prices',
    title: 'Brand Outlet',
    intro: 'Discover brand-name finds and shop a broad mix of styles, categories, and price points.',
    sections: [
      ['Find a new favorite', 'Explore fashion, electronics, home goods, and more from brands you know.'],
      ['Compare before you buy', 'Review the item condition, seller details, shipping options, and return information on each listing.'],
      ['Shop what suits you', 'Use category pages and search to narrow down the items that fit your needs.'],
    ],
    action: ['Explore fashion', categoryPath('Fashion')],
  },
  refurbished: {
    eyebrow: 'A second life for tech',
    title: 'Refurbished',
    intro: 'Explore pre-owned and refurbished technology, with item condition and included accessories described on each listing.',
    sections: [
      ['Read the condition details', 'Check the listing for the refurbishment grade, included accessories, warranty information, and any signs of use.'],
      ['Choose the right device', 'Compare specifications and compatibility so the item works for the way you plan to use it.'],
      ['Shop with the details in mind', 'Review seller feedback, shipping, and return terms before placing an order.'],
    ],
    action: ['Shop electronics', categoryPath('Electronics')],
  },
  'shipping-location': {
    eyebrow: 'Delivery preferences',
    title: 'Shipping location',
    intro: 'Your location helps show relevant delivery options, estimated arrival times, and items available to ship to you.',
    sections: [
      ['Check each listing', 'Shipping costs, delivery dates, and destinations can vary by seller and item. Look at the listing before checkout.'],
      ['Update your address', 'Sign in to manage saved delivery addresses and choose where your order should go.'],
      ['International orders', 'For cross-border purchases, review the listing for delivery estimates and any import charges that may apply.'],
    ],
    action: ['Sign in to manage addresses', '/signin'],
  },
  'user-agreement': {
    eyebrow: 'Terms of use',
    title: 'User Agreement',
    intro: 'The User Agreement describes the terms for using eBay’s marketplace and related services.',
    sections: [
      ['Using the marketplace', 'Members are expected to provide accurate information and use eBay lawfully and responsibly.'],
      ['Buying and selling', 'Listings, purchases, payments, and communications must follow the applicable marketplace policies.'],
      ['Review current terms', 'This demo page is a summary for browsing only, not the complete legal agreement. Refer to eBay’s official terms for the current full text.'],
    ],
    action: ['Get help with a question', '/info/help-and-contact'],
  },
  privacy: {
    eyebrow: 'Your information',
    title: 'Privacy',
    intro: 'Learn how to manage your personal information and account preferences when using the marketplace.',
    sections: [
      ['Review account settings', 'Sign in to review your contact details, communication preferences, and other account settings.'],
      ['Understand data choices', 'Privacy information explains what data is used to provide services, improve experiences, and help keep accounts secure.'],
      ['Stay in control', 'Use the privacy choices page to find the available controls and learn how to submit a request.'],
    ],
    action: ['View privacy choices', '/info/privacy-choices'],
  },
  'privacy-choices': {
    eyebrow: 'Manage your preferences',
    title: 'Your Privacy Choices',
    intro: 'You can review privacy settings and available choices for how information is used.',
    sections: [
      ['Manage communication preferences', 'Choose which product updates and promotional messages you want to receive in your account settings.'],
      ['Review privacy controls', 'Available controls can depend on your location and the services you use. Check the privacy information for details.'],
      ['Need help?', 'If you have a privacy question or request, visit Help & Contact for guidance on the next steps.'],
    ],
    action: ['Read about privacy', '/info/privacy'],
  },
};
const readRoute = () => {
  const url = new URL(window.location.href);
  const [, type, ...segments] = url.pathname.split('/');
  if (!type) return { type: 'home' };
  if (type === 'category') return { type, category: categories.find((item) => categoryPath(item) === url.pathname) || 'All' };
  if (type === 'search') return { type, query: url.searchParams.get('q') || '', category: url.searchParams.get('category') || 'All Categories' };
  if (type === 'item') return { type, productId: Number(segments[0]) };
  if (['deals', 'cart', 'signin', 'sell'].includes(type)) return { type };
  if (type === 'info') return { type, slug: segments.join('/') };
  return { type: 'not-found' };
};

function Icon({ name, size = 20, ...props }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', ...props };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    cart: <><path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    moon: <path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.5 8.5 0 1 0 20.8 13Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function EbayLogo({ onNavigate }) {
  return <a className="ebay-logo" href="/" aria-label="eBay home" onClick={(event) => onNavigate(event, '/')}>
    <span>e</span><span>b</span><span>a</span><span>y</span>
  </a>;
}

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('ebay-theme') === 'dark');
  const [query, setQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All Categories');
  const [route, setRoute] = useState(readRoute);
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ebay-cart') || '[]');
      return Array.isArray(saved) ? saved.map((id) => products.find((product) => product.id === id)).filter(Boolean) : [];
    } catch (error) {
      console.error('Could not restore the saved cart.', error);
      return [];
    }
  });
  const [watchlist, setWatchlist] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  function navigate(event, path) {
    if (event && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
    event?.preventDefault();
    if (window.location.pathname + window.location.search !== path) {
      window.history.pushState({}, '', path);
      setRoute(readRoute());
    }
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    const handlePopState = () => setRoute(readRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    setQuery(route.type === 'search' ? route.query : '');
    setSearchCategory(route.type === 'search' ? route.category : 'All Categories');
    const product = route.type === 'item' ? products.find((item) => item.id === route.productId) : undefined;
    const infoTitle = route.type === 'info' ? infoPages[route.slug]?.title || route.slug.split('/').pop().replaceAll('-', ' ') : '';
    const title = product?.name || (route.type === 'category' ? route.category : route.type === 'search' ? `Search: ${route.query}` : route.type === 'info' ? infoTitle : route.type);
    document.title = route.type === 'home' ? 'Electronics, Cars, Fashion, Collectibles & More | eBay' : `${title.charAt(0).toUpperCase()}${title.slice(1)} | eBay`;
  }, [route]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('ebay-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal:not(.revealed)').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [route]);

  useEffect(() => {
    localStorage.setItem('ebay-cart', JSON.stringify(cart.map((product) => product.id)));
  }, [cart]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const category = route.type === 'category' ? route.category : route.type === 'search' && route.category !== 'All Categories' ? route.category : 'All';
  const submittedQuery = route.type === 'search' ? route.query : '';
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const search = submittedQuery.trim().toLowerCase();
    const matchesSearch = !search || `${product.name} ${product.category}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  }), [category, submittedQuery]);

  function runSearch(event) {
    event.preventDefault();
    const params = new URLSearchParams({ q: query });
    if (searchCategory !== 'All Categories') params.set('category', searchCategory);
    navigate(null, `/search?${params.toString()}`);
  }

  function addToCart(product) {
    setCart((items) => [...items, product]);
    setNotice(`${product.name} added to your cart`);
  }

  function toggleWatch(product) {
    setWatchlist((items) => {
      const alreadySaved = items.includes(product.id);
      setNotice(alreadySaved ? 'Removed from your watchlist' : 'Added to your watchlist');
      return alreadySaved ? items.filter((id) => id !== product.id) : [...items, product.id];
    });
  }

  const slides = [
    { kicker: 'A little treat, a lot of joy', title: 'Find your next<br />favorite thing.', copy: 'Big deals on the brands and little finds you love.', action: 'Explore deals', image: 'photo-1490481651871-ab68de25d43d', tone: 'pink' },
    { kicker: 'Upgrade your everyday', title: 'Tech that moves<br />you forward.', copy: 'Discover great prices on the latest electronics.', action: 'Shop electronics', image: 'photo-1496181133206-80ce9b88a853', tone: 'blue' },
    { kicker: 'Make it your own', title: 'Style is always<br />in season.', copy: 'One-of-a-kind finds. Endless ways to express you.', action: 'Find your style', image: 'photo-1483985988355-763728e1935b', tone: 'cream' },
  ];

  const renderProductGrid = (items) => items.length ? <div className="product-grid">
    {items.map((product, index) => <article className="product-card reveal" style={{ '--reveal-delay': `${(index % 4) * 80}ms` }} key={product.id}>
      <div className="product-image-wrap">
        <a className="product-detail-link" href={`/item/${product.id}`} aria-label={`View ${product.name}`} onClick={(event) => navigate(event, `/item/${product.id}`)}>
          <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=650&q=85`} alt={product.name} loading="lazy" />
        </a>
        <span className="product-badge">{product.badge}</span>
        <button className={`watch-button ${watchlist.includes(product.id) ? 'is-watched' : ''}`} aria-label={watchlist.includes(product.id) ? 'Remove from watchlist' : 'Add to watchlist'} onClick={() => toggleWatch(product)}><Icon name="heart" size={19} /></button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3><a href={`/item/${product.id}`} onClick={(event) => navigate(event, `/item/${product.id}`)}>{product.name}</a></h3>
        <div className="product-prices"><strong>${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><del>${product.oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</del></div>
        <p className="shipping-copy">Free shipping</p>
        <button className="add-cart-button" onClick={() => addToCart(product)}>Add to cart <Icon name="cart" size={17} /></button>
      </div>
    </article>)}
  </div> : <div className="empty-results"><span>Nothing here just yet</span><p>Try another search or browse all our great deals.</p><a href="/deals" onClick={(event) => navigate(event, '/deals')}>Browse all deals</a></div>;

  return (
    <div className={`site-shell ${dark ? 'dark-mode' : ''}`}>
      <div className="utility-bar">
        <div className="utility-left">
          <span>Hi! <a className="text-link" href="/signin" onClick={(event) => navigate(event, '/signin')}>Sign in</a> or <a className="text-link" href="/signin?register=1" onClick={(event) => navigate(event, '/signin?register=1')}>register</a></span>
          <a className="text-link hide-mobile" href="/info/daily-deals" onClick={(event) => navigate(event, '/info/daily-deals')}>Daily Deals</a>
          <a className="text-link hide-mobile" href="/info/brand-outlet" onClick={(event) => navigate(event, '/info/brand-outlet')}>Brand Outlet</a>
          <a className="text-link hide-mobile" href="/info/refurbished" onClick={(event) => navigate(event, '/info/refurbished')}>Refurbished</a>
        </div>
        <div className="utility-right">
          <a className="text-link hide-mobile" href="/sell" onClick={(event) => navigate(event, '/sell')}>Sell</a>
          <a className="text-link hide-mobile" href="/info/help-and-contact" onClick={(event) => navigate(event, '/info/help-and-contact')}>Help & Contact</a>
          <a className="text-link location-button" href="/info/shipping-location" onClick={(event) => navigate(event, '/info/shipping-location')}>Ship to <span className="flag">🇺🇸</span></a>
        </div>
      </div>

      <header className="main-header">
        <button className="mobile-menu-button" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}><Icon name="menu" /></button>
        <EbayLogo onNavigate={navigate} />
        <button className="shop-category-button" onClick={() => setMobileMenu(!mobileMenu)}>Shop by<br />category <Icon name="chevron" size={15} /></button>
        <form className="search-form" onSubmit={runSearch}>
          <span className="search-icon"><Icon name="search" size={21} /></span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search for anything" placeholder="Search for anything" />
          <select aria-label="Select category" value={searchCategory} onChange={(event) => setSearchCategory(event.target.value)}>
            <option>All Categories</option>
            {categories.slice(1).map((item) => <option key={item}>{item}</option>)}
          </select>
          <button className="search-button" type="submit">Search</button>
        </form>
        <div className="header-actions">
          <button className="icon-action theme-toggle" aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title={`${dark ? 'Light' : 'Dark'} mode`} onClick={() => setDark(!dark)}><Icon name={dark ? 'sun' : 'moon'} size={20} /></button>
          <a className="icon-action account-action" aria-label="Sign in" href="/signin" onClick={(event) => navigate(event, '/signin')}><Icon name="user" size={21} /></a>
          <a className="icon-action cart-action" aria-label={`Shopping cart, ${cart.length} items`} href="/cart" onClick={(event) => navigate(event, '/cart')}><Icon name="cart" size={23} />{cart.length > 0 && <span className="cart-count">{cart.length}</span>}</a>
        </div>
      </header>

      <div className={`category-menu ${mobileMenu ? 'menu-open' : ''}`}>
        {categories.slice(1).map((item) => <a key={item} href={categoryPath(item)} onClick={(event) => navigate(event, categoryPath(item))}>{item}</a>)}
        <a href="/deals" onClick={(event) => navigate(event, '/deals')}>All categories</a>
      </div>

      <main>
        {route.type === 'home' && <>
        <section className={`hero hero-${slides[activeSlide].tone}`} aria-label="Featured promotion">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="sparkle">✳</span> {slides[activeSlide].kicker}</div>
            <h1 dangerouslySetInnerHTML={{ __html: slides[activeSlide].title }} />
            <p>{slides[activeSlide].copy}</p>
            <a className="hero-cta" href={activeSlide === 1 ? categoryPath('Electronics') : '/deals'} onClick={(event) => navigate(event, activeSlide === 1 ? categoryPath('Electronics') : '/deals')}>{slides[activeSlide].action} <Icon name="arrow" size={18} /></a>
          </div>
          <div className="hero-image-wrap"><img src={`https://images.unsplash.com/${slides[activeSlide].image}?auto=format&fit=crop&w=1100&q=85`} alt="" /></div>
          <div className="hero-dots" aria-label="Promotion slides">
            {slides.map((slide, index) => <button key={slide.kicker} className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Show promotion ${index + 1}`} />)}
          </div>
          <div className="hero-slide-count">0{activeSlide + 1} <span>/ 03</span></div>
        </section>

        <section className="category-section reveal">
          <div className="section-heading">
            <div><span className="eyebrow">A world of possibilities</span><h2>Explore popular categories</h2></div>
            <a className="see-all-link" href="/deals" onClick={(event) => navigate(event, '/deals')}>See all <Icon name="arrow" size={16} /></a>
          </div>
          <div className="category-row">
            {[
              { name: 'Electronics', sub: 'Find your next upgrade', image: 'photo-1498049794561-7780e7231661', color: 'lavender' },
              { name: 'Fashion', sub: 'Style that’s all you', image: 'photo-1483985988355-763728e1935b', color: 'peach' },
              { name: 'Home & Garden', sub: 'Make yourself at home', image: 'photo-1616486338812-3dadae4b4ace', color: 'green' },
              { name: 'Collectibles', sub: 'Little pieces of history', image: 'photo-1578662996442-48f60103fc96', color: 'yellow' },
              { name: 'Toys & Hobbies', sub: 'Make room for fun', image: 'photo-1558060370-d644479cb6f7', color: 'blue' },
            ].map((item, index) => <a key={item.name} href={categoryPath(item.name)} onClick={(event) => navigate(event, categoryPath(item.name))} className={`category-card category-${item.color} reveal`} style={{ '--reveal-delay': `${index * 90}ms` }}>
              <span className="category-image"><img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=500&q=80`} alt="" /></span>
              <span className="category-card-title">{item.name}</span><span className="category-card-sub">{item.sub}</span>
            </a>)}
          </div>
        </section>

        <section className="deal-banner reveal">
          <div className="deal-banner-mark">e<span>!</span></div>
          <div className="deal-banner-copy"><span className="eyebrow">The good stuff, for less</span><h2>Deals that feel like a win.</h2><p>Discover handpicked finds and seriously good prices.</p></div>
          <a className="deal-banner-button" href="/deals" onClick={(event) => navigate(event, '/deals')}>Shop deals <Icon name="arrow" size={17} /></a>
          <div className="deal-banner-decoration" aria-hidden="true">%</div>
        </section>

        <section id="deals" className="deals-section reveal">
          <div className="section-heading deals-heading">
            <div><span className="eyebrow">Picked for you</span><h2>Today’s deals</h2></div>
            <a className="see-all-link" href="/deals" onClick={(event) => navigate(event, '/deals')}>See all deals <Icon name="arrow" size={16} /></a>
          </div>
          <div className="filter-tabs" role="group" aria-label="Filter products by category">
            {categories.map((item) => <a key={item} className={category === item ? 'filter-active' : ''} href={item === 'All' ? '/deals' : categoryPath(item)} onClick={(event) => navigate(event, item === 'All' ? '/deals' : categoryPath(item))}>{item}</a>)}
          </div>
          {renderProductGrid(products)}
        </section>

        <section className="selling-banner reveal">
          <div className="selling-graphic"><span>sell</span><span className="floating-tag">★</span></div>
          <div><span className="eyebrow">Your next chapter starts here</span><h2>Have something to sell?</h2><p>Turn the things you no longer need into something new.</p></div>
          <a href="/sell" onClick={(event) => navigate(event, '/sell')}>Start selling <Icon name="arrow" size={17} /></a>
        </section>
        </>}
        {['category', 'search', 'deals'].includes(route.type) && <section className="route-page deals-section">
          <div className="route-heading"><span className="eyebrow">{route.type === 'search' ? 'Search results' : 'Explore eBay'}</span><h1>{route.type === 'search' ? `Results for “${submittedQuery}”` : category === 'All' ? 'Today’s deals' : category}</h1><p>Find something you’ll love from our handpicked selection.</p></div>
          <div className="filter-tabs" aria-label="Browse categories">{categories.map((item) => <a key={item} className={category === item ? 'filter-active' : ''} href={item === 'All' ? '/deals' : categoryPath(item)} onClick={(event) => navigate(event, item === 'All' ? '/deals' : categoryPath(item))}>{item}</a>)}</div>
          {renderProductGrid(filteredProducts)}
        </section>}
        {route.type === 'item' && (() => {
          const product = products.find((item) => item.id === route.productId);
          return product ? <section className="route-page product-detail">
            <a className="back-link" href={categoryPath(product.category)} onClick={(event) => navigate(event, categoryPath(product.category))}>← Back to {product.category}</a>
            <div className="product-detail-layout"><img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=1000&q=85`} alt={product.name} /><div><span className="eyebrow">{product.category} · {product.badge}</span><h1>{product.name}</h1><p className="detail-price">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p><p>Free shipping · Easy returns</p><button className="hero-cta" onClick={() => addToCart(product)}>Add to cart <Icon name="cart" size={17} /></button><button className="detail-watch" onClick={() => toggleWatch(product)}>{watchlist.includes(product.id) ? '♥ Saved to watchlist' : '♡ Add to watchlist'}</button></div></div>
          </section> : <section className="route-page"><h1>Item not found</h1><a href="/deals" onClick={(event) => navigate(event, '/deals')}>Browse deals</a></section>;
        })()}
        {route.type === 'cart' && <section className="route-page cart-page"><span className="eyebrow">Your eBay</span><h1>Shopping cart</h1>{cart.length ? <>{cart.map((product, index) => <article className="cart-row" key={`${product.id}-${index}`}><a href={`/item/${product.id}`} onClick={(event) => navigate(event, `/item/${product.id}`)}><img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=240&q=75`} alt="" /></a><div><a href={`/item/${product.id}`} onClick={(event) => navigate(event, `/item/${product.id}`)}>{product.name}</a><p>Free shipping</p></div><strong>${product.price.toFixed(2)}</strong><button onClick={() => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button></article>)}<div className="cart-total"><span>Subtotal ({cart.length} items)</span><strong>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</strong></div><button className="hero-cta" onClick={() => setNotice('Checkout is a demo in this storefront.')}>Go to checkout</button></> : <div className="empty-results"><span>Your cart is looking a little empty</span><p>Find something special and it will show up here.</p><a href="/deals" onClick={(event) => navigate(event, '/deals')}>Explore deals</a></div>}</section>}
        {route.type === 'signin' && <section className="route-page info-page"><span className="eyebrow">Welcome to eBay</span><h1>{new URLSearchParams(window.location.search).has('register') ? 'Create an account' : 'Sign in'}</h1><p>Sign in or create an account to make the most of your eBay experience.</p><form className="route-form" onSubmit={(event) => { event.preventDefault(); setNotice('Sign-in is a demo in this storefront.'); }}><label htmlFor="route-email">Email or username</label><input id="route-email" required placeholder="Email or username" /><button className="hero-cta">Continue</button></form><a href="/info/help-and-contact" onClick={(event) => navigate(event, '/info/help-and-contact')}>Need help signing in?</a></section>}
        {route.type === 'sell' && <section className="route-page info-page"><span className="eyebrow">Your next chapter starts here</span><h1>Start selling on eBay</h1><p>Reach millions of buyers and turn things you no longer need into something new.</p><a className="hero-cta" href="/signin?register=1" onClick={(event) => navigate(event, '/signin?register=1')}>Create your seller account <Icon name="arrow" size={17} /></a></section>}
        {route.type === 'info' && (() => {
          const page = infoPages[route.slug];
          const title = page?.title || route.slug.split('/').pop().split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ');
          return <section className="route-page info-page">
            <div className="info-hero"><span className="eyebrow">{page?.eyebrow || 'eBay information'}</span><h1>{title}</h1><p>{page?.intro || 'Find information and resources for the eBay community.'}</p></div>
            <div className="info-section-grid">{(page?.sections || [['Explore eBay', 'Browse popular categories, discover new finds, and get help with your marketplace questions.']]).map(([heading, body]) => <article className="info-section-card" key={heading}><span className="info-card-icon">✳</span><h2>{heading}</h2><p>{body}</p></article>)}</div>
            <div className="info-page-actions"><a className="hero-cta" href={page?.action?.[1] || '/deals'} onClick={(event) => navigate(event, page?.action?.[1] || '/deals')}>{page?.action?.[0] || 'Explore eBay'} <Icon name="arrow" size={17} /></a><a className="info-secondary-link" href="/info/help-and-contact" onClick={(event) => navigate(event, '/info/help-and-contact')}>Visit Help & Contact</a></div>
          </section>;
        })()}
        {route.type === 'not-found' && <section className="route-page info-page"><h1>Page not found</h1><p>The page you’re looking for doesn’t exist.</p><a href="/" onClick={(event) => navigate(event, '/')}>Return to eBay home</a></section>}
      </main>

      <footer className="site-footer">
        <div className="footer-top"><EbayLogo onNavigate={navigate} /><div className="footer-links"><a href="/info/about-ebay" onClick={(event) => navigate(event, '/info/about-ebay')}>About eBay</a><a href="/info/announcements" onClick={(event) => navigate(event, '/info/announcements')}>Announcements</a><a href="/info/community" onClick={(event) => navigate(event, '/info/community')}>Community</a><a href="/info/security-center" onClick={(event) => navigate(event, '/info/security-center')}>Security Center</a><a href="/info/seller-center" onClick={(event) => navigate(event, '/info/seller-center')}>Seller Center</a><a href="/info/policies" onClick={(event) => navigate(event, '/info/policies')}>Policies</a><a href="/info/help-and-contact" onClick={(event) => navigate(event, '/info/help-and-contact')}>Help & Contact</a></div></div>
        <div className="footer-bottom"><span>Copyright © 1995–2025 eBay Inc. All Rights Reserved.</span><div><a href="/info/user-agreement" onClick={(event) => navigate(event, '/info/user-agreement')}>User Agreement</a><a href="/info/privacy" onClick={(event) => navigate(event, '/info/privacy')}>Privacy</a><a href="/info/privacy-choices" onClick={(event) => navigate(event, '/info/privacy-choices')}>Your Privacy Choices</a></div></div>
      </footer>

      {notice && <div className="toast-message" role="status"><span className="toast-check">✓</span>{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" size={16} /></button></div>}
    </div>
  );
}

export default App;
