import React, { useEffect, useState } from 'react';
import { getFrom, setApiKey, setCompanyToken } from '../../api/productsApi';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import Categories from './Categories';
import Products from './Products';
import ProductDetails from './ProductDetails';

const ProductsView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingProductDetails, setIsLoadingProductDetails] = useState(false);

  // Get categories
  useEffect(() => {
    setApiKey();
    setCompanyToken();
    getFrom('/categories').then((apiResponse) => {
      const data = normalize(apiResponse.data);
      const _categories = build(data, 'category', null, { eager: true });
      setCategories(_categories);
      setIsLoadingCategories(false);
    });
  }, []);
  // Get products from Category
  useEffect(() => {
    if (selectedCategory) {
      setProductDetails(null);
      getFrom(`/categories/${selectedCategory.uniqueId}`).then((apiResponse) => {
        const data = normalize(apiResponse.data);
        const _products = build(data, 'product', null, { eager: true });
        setProducts(_products ? _products : []);
        setIsLoadingProducts(false);
      });
    }
  }, [selectedCategory]);

  // Get product details
  useEffect(() => {
    selectedProduct &&
      getFrom('/products/' + selectedProduct.uniqueId).then((apiResponse) => {
        const data = normalize(apiResponse.data);
        const _product = build(data, 'product', apiResponse.data.data.id, {
          eager: true,
        });
        setProductDetails(_product);
        setIsLoadingProductDetails(false);
      });
  }, [selectedProduct]);

  const handleSelectedCategory = (elem) => {
    setIsLoadingProducts(true);
    setSelectedCategory(elem);
  };

  const handleSelectedProduct = (elem) => {
    setIsLoadingProductDetails(true);
    setSelectedProduct(elem);
  };

  return (
    <div>
      <h3 style={{ marginLeft: '15px' }}>Products View</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Categories
          categories={categories}
          handleSelected={handleSelectedCategory}
          isLoading={isLoadingCategories}
        />

        {selectedCategory && (
          <Products
            products={products}
            handleSelected={handleSelectedProduct}
            isLoading={isLoadingProducts}
          />
        )}
        {productDetails && (
          <ProductDetails
            product={productDetails}
            isLoading={isLoadingProductDetails}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsView;
