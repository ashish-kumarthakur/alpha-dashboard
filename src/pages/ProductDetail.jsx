import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Carousel State tracking target index
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Fetch product specifications dynamically from live API matching route ID
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Requested product node metadata not found.');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [id]);

  // Handle slide transitions safely bounding constraints
  const prevSlide = () => {
    if (!product?.images) return;
    setActiveImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (!product?.images) return;
    setActiveImageIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div className="text-center py-20 text-sm font-medium text-gray-500">Retrieving operational assets specification...</div>;
  if (error) return <div className="text-center py-20 text-sm font-bold text-red-500">Data Stream Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button Controller anchor link link navigation layer */}
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Catalog Matrix
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        
        {/* Product Images Carousel Layout Matrix */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full bg-gray-50 rounded-xl border border-gray-100 overflow-hidden group">
            <img 
              src={product.images?.[activeImageIdx] || product.thumbnail} 
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-all duration-300"
            />
            
            {/* Carousel controller overlays - hidden on singular images data payload sizes */}
            {product.images && product.images.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-gray-700 shadow-md rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-gray-700 shadow-md rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail preview dots metrics slider bar indicator anchors list */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded-lg border overflow-hidden shrink-0 bg-gray-50 p-1 cursor-pointer transition-all ${
                    idx === activeImageIdx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Layout Content Column Blocks */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category Data Badge */}
            <span className="inline-block px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full capitalize">
              {product.category}
            </span>
            
            {/* Display: Product Name Core title markup element */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Micro rating interface badge layer parameters */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-2.5 py-0.5 rounded border border-amber-100">
                <Star size={14} className="fill-amber-500" />
                {product.rating}
              </div>
              <span className="text-xs text-gray-400">| Stock Remaining: {product.stock} items</span>
            </div>

            <hr className="border-gray-100" />

            {/* Display: Dynamic Currency conversion price layout elements */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">MSRP Valuation</span>
              <div className="text-3xl font-mono font-bold text-gray-900">${product.price}</div>
            </div>

            <hr className="border-gray-100" />

            {/* Product Description Text Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Technical Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Module Shell layout interface footprint link blocks */}
          <div className="pt-4 border-t border-gray-50 flex gap-3">
            <div className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl text-center text-xs font-semibold text-gray-500">
              Operational SKU status: <span className="text-gray-800 font-mono font-bold">{product.sku || `SKU-${product.id}`}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}