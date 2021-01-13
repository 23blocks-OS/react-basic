export const addingProducts = (orderItems, addedProduct) => {
  const prevAddedProduct = orderItems.find(
    (item) => item.productSku === addedProduct.productSku
  );

  if (prevAddedProduct) {
    return orderItems.map((item) =>
      item.productSku === addedProduct.productSku
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...orderItems, { ...addedProduct, quantity: 1 }];
};

export const removingProducts = (orderItems, removedProduct) => {
  const existingProduct = orderItems.find((item) => item.id === removedProduct.id);

  if (existingProduct.quantity === 1) {
    return orderItems.filter((item) => item.id !== existingProduct.id);
  }

  return orderItems.map((item) =>
    item.id === removedProduct.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};
