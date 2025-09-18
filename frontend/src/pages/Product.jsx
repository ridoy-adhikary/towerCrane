import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Product = ({ user, onAddToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [addingToCart, setAddingToCart] = useState(null);

  // Sample product data - replace with actual API call
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: "Heavy Duty Tower Crane",
        price: 250000,
        category: "cranes",
        location: "New York, NY",
        image: "https://picsum.photos/400/300?1",
        description: "Professional tower crane for high-rise construction projects.",
        year: 2020,
        condition: "Excellent"
      },
      {
        id: 2,
        name: "Mobile Hydraulic Crane",
        price: 180000,
        category: "cranes",
        location: "Los Angeles, CA",
        image: "https://picsum.photos/400/300?2",
        description: "Versatile mobile crane with 50-ton lifting capacity.",
        year: 2019,
        condition: "Good"
      },
      {
        id: 3,
        name: "Excavator CAT 320",
        price: 120000,
        category: "excavators",
        location: "Chicago, IL",
        image: "https://picsum.photos/400/300?3",
        description: "Caterpillar 320 excavator with hydraulic thumb attachment.",
        year: 2021,
        condition: "Like New"
      },
      {
        id: 4,
        name: "Bulldozer D6T",
        price: 95000,
        category: "bulldozers",
        location: "Houston, TX",
        image: "https://picsum.photos/400/300?4",
        description: "Powerful bulldozer for earthmoving and grading operations.",
        year: 2018,
        condition: "Good"
      },
      {
        id: 5,
        name: "Dump Truck Volvo",
        price: 85000,
        category: "trucks",
        location: "Miami, FL",
        image: "https://picsum.photos/400/300?5",
        description: "Heavy-duty dump truck with 20 cubic yard capacity.",
        year: 2020,
        condition: "Very Good"
      },
      {
        id: 6,
        name: "Concrete Mixer Truck",
        price: 110000,
        category: "trucks",
        location: "Seattle, WA",
        image: "https://picsum.photos/400/300?6",
        description: "Ready-mix concrete truck with 8 cubic yard drum.",
        year: 2019,
        condition: "Good"
      },
      {
        id: 7,
        name: "Mini Excavator JCB",
        price: 45000,
        category: "excavators",
        location: "Denver, CO",
        image: "https://picsum.photos/400/300?7",
        description: "Compact excavator perfect for residential projects.",
        year: 2022,
        condition: "Like New"
      },
      {
        id: 8,
        name: "Rough Terrain Crane",
        price: 200000,
        category: "cranes",
        location: "Phoenix, AZ",
        image: "https://picsum.photos/400/300?8",
        description: "All-terrain crane suitable for rough construction sites.",
        year: 2020,
        condition: "Excellent"
      }
    ];

    // Simulate API loading delay
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "year":
          return b.year - a.year;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cranes", label: "Cranes" },
    { value: "excavators", label: "Excavators" },
    { value: "bulldozers", label: "Bulldozers" },
    { value: "trucks", label: "Trucks" }
  ];

   // Navigation to details page
  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  // Add to cart functionality
  const handleAddToCart = async (product) => {
    // Check if user is logged in and is a buyer
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (user.role !== "buyer") {
      alert("Only buyers can add items to cart");
      return;
    }

    setAddingToCart(product.id);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the parent function to add to cart
      if (onAddToCart) {
        onAddToCart(product);
      }
      
      // You would normally make an API call here:
      // await axios.post('/api/cart/add', { productId: product.id });
      
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Heavy Equipment Marketplace</h1>
          <p className="text-xl text-blue-100">Find the perfect equipment for your construction needs</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search equipment, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-2 sm:mb-0">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">🏗️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.condition}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.year}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {product.location}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(product.id)}
                      className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Details
                    </button>
                    
                    {/* Only show Add to Cart for buyers */}
                    {user?.role === "buyer" && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart === product.id}
                        className={`flex-1 text-center py-2 rounded-lg font-medium transition-colors ${
                          addingToCart === product.id
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {addingToCart === product.id ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Adding...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5-5M7 13l-1.5 5m1.5-5a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Add to Cart
                          </div>
                        )}
                      </button>
                    )}
                    
                    {/* Heart/Favorite icon for all users */}
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;