import React, { useState, createContext, useContext } from 'react';
import { Search, X, Plus, Minus, ShoppingCart, Check } from 'lucide-react'; // free to use icons

// Cart Context
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size, quantity) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    setCart(prev => prev.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ).filter(item => item.quantity > 0));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      getTotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Image Modal Component
const ImageModal = ({ image, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        <button
          className="absolute -top-10 right-0 text-base hover:text-gray-300"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <img
          src={image}
          alt="Product view"
          className="max-h-[90vh] w-auto"
          onClick={e => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 transform transition-all duration-500 ease-in-out">
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 p-2 rounded-full">
          <Check className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Order Placed Successfully!</h3>
          <p className="text-sm text-gray-500">Thank you for your purchase</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// Cart Drawer Component
const CartDrawer = () => {
  const { cart, updateQuantity, getTotal, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckout = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsCartOpen(false);
    }, 3000);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
      <div className="absolute inset-y-0 right-0 w-full max-w-md">
        <div className="h-full bg-white shadow-xl flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex py-6 border-b">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-3 min-w-[2rem] text-center text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="p-6 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-base font-medium">Subtotal</span>
                <span className="text-base font-medium">${getTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
          {cart.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const { cart, setIsCartOpen } = useContext(CartContext);

  return (
    <nav className="bg-white py-6 shadow-sm sticky top-0 z-40 text-base">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-black text">DevNexus</a>
          <div className="flex items-center space-x-8">
            <button className="text-gray-900 hover:text-gray-700">
              <Search size={24} />
            </button>
            <button
              className="relative text-gray-900 hover:text-gray-700"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="relative">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // to give context to product card component
  const [selectedSize, setSelectedSize] = useState(''); //
  const [quantity, setQuantity] = useState(1);
  const [showSizes, setShowSizes] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <div className="group">
        <div
          className="aspect-[4/5] mb-4 overflow-hidden  cursor-pointer"
          onClick={() => setShowImageModal(true)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-normal text-gray-900">{product.name}</h3>
          <p className="text-base text-gray-500">{product.description}</p>
          <p className="text-base font-normal text-gray-900">${product.price}</p>

          {!showSizes ? (
            <button
              onClick={() => setShowSizes(true)}
              className="w-full py-3 px-4 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Quick Add
            </button>
          ) : ( 
            // 
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`py-2 text-sm border ${selectedSize === size
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-900'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* quantity */}
              <div className="flex items-center justify-center space-x-4 py-2">
                <button
                  onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button

                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => {
                  if (selectedSize) {
                    setIsAdding(true);
                    addToCart(product, selectedSize, quantity);
                    setTimeout(() => {
                      setIsAdding(false);
                      setShowSizes(false);
                      setSelectedSize('');
                      setQuantity(1);
                    }, 2000);
                  }
                }}
                className={`w-full py-3 px-4 text-sm font-medium transition-colors duration-300 ${selectedSize
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-white cursor-not-allowed'
                  }`}
              >
                {isAdding ? 'Added!' : selectedSize ? 'Add to Cart' : 'Select a Size'}
              </button>
            </div>
          )}
        </div>
      </div>
      <ImageModal
        image={product.imageUrl}
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
      />
    </>
  );
};

// Featured Products Section
const FeaturedProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'The Classic Tee',
      description: '100% Cotton, Unisex Fit',
      price: 29.99,
      imageUrl: 'https://shop.forem.com/cdn/shop/files/mens-classic-tee-ash-back-660afb301d696.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'The Minimal Hoodie',
      description: 'Premium Cotton Blend',
      price: 49.99,
      imageUrl: 'https://shop.forem.com/cdn/shop/products/unisex-premium-hoodie-black-front-6220d496d5614.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 3,
      name: "Motivation Book",
      description: 'Adjustable Fit',
      price: 24.99,
      imageUrl: 'https://shop.forem.com/cdn/shop/products/spiral-notebook-white-front-6220d95e1edc0.jpg',
      sizes: ['S', 'M', 'L']
    },
  ]);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-normal text-gray-900 mb-8">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App Component
const App = () => {
  return (
    <CartProvider>
      <div className="bg-white min-h-screen text-base">
        <Navbar />
        <main>
          <FeaturedProducts />
        </main>
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default App;