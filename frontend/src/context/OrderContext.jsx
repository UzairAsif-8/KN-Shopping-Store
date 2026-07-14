import { createContext, useContext, useState, useCallback } from 'react';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    // Placeholder — connect to orderService.getAll
    setLoading(false);
  }, []);

  const createOrder = useCallback(async () => {
    setLoading(true);
    // Placeholder — connect to orderService.create
    setLoading(false);
    return null;
  }, []);

  const value = {
    orders,
    currentOrder,
    loading,
    setCurrentOrder,
    fetchOrders,
    createOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};

export default OrderContext;
