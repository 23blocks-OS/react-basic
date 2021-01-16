import React, { useEffect, useState } from 'react';
import { getFrom, setApiKey, setCompanyToken } from '../../api/productsApi';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import Categories from './Categories';
import Products from './Products';
import ProductDetails from './ProductDetails';
import { selectUserId } from '../../redux/user/user.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartAsync } from '../../redux/order/order.actions';

const ProductsView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingProductDetails, setIsLoadingProductDetails] = useState(false);

  const [selectedProductSuggestions, setSelectedProductSuggestions] = useState(null);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Get categories
  useEffect(() => {
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

  // Get product details and suggestions
  useEffect(() => {
    selectedProduct &&
      getFrom('/products/' + selectedProduct.uniqueId).then((apiResponse) => {
        const data = normalize(apiResponse.data);
        const _product = build(data, 'product', apiResponse.data.data.id, {
          eager: true,
        });
        setProductDetails(_product);
        setIsLoadingProductDetails(false);
        console.log(apiResponse);
      });
  }, [selectedProduct]);

  // Get product suggestions
  useEffect(() => {
    selectedProductSuggestions &&
      getFrom(
        '/products/' + selectedProductSuggestions.uniqueId + '/suggestions'
      ).then((apiResponse) => {
        const data = normalize(apiResponse.data);
        const _products = build(data, 'product', null, { eager: true });
        setProductSuggestions(_products ? _products : []);
        setIsLoadingSuggestions(false);
      });
  }, [selectedProductSuggestions]);

  const handleSelectedCategory = (elem) => {
    if (selectedCategory !== elem) {
      setIsLoadingProducts(true);
      setSelectedCategory(elem);
      setSelectedProduct(null);
      setSelectedProductSuggestions(null);
    }
  };

  const handleSelectedProduct = (elem) => {
    if (selectedProduct !== elem) {
      setIsLoadingProductDetails(true);
      setSelectedProduct(elem);
    }
  };

  const handleSelectedProductDetails = (elem) => {
    if (selectedProductSuggestions !== elem) {
      setIsLoadingSuggestions(true);
      setSelectedProductSuggestions(elem);
    }
  };

  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleAddToCart = (prod) => {
    dispatch(updateCartAsync(userId, prod, 1, selectedCategory));
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
            title="Products"
          />
        )}
        {selectedProduct && (
          <ProductDetails
            product={productDetails}
            isLoading={isLoadingProductDetails}
            handleSelected={handleSelectedProductDetails}
            addToCart={handleAddToCart}
          />
        )}
        {selectedProductSuggestions && (
          <Products
            products={productSuggestions}
            handleSelected={(elem) => console.log(elem, 'Producto Sugerido')}
            isLoading={isLoadingSuggestions}
            title="Suggested Products"
          />
        )}
      </div>
    </div>
  );
};

export default ProductsView;
