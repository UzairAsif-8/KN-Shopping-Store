import { RouterProvider } from 'react-router-dom';
import {
  AuthProvider,
  ProductProvider,
  CartProvider,
  WishlistProvider,
  OrderProvider,
  UIProvider,
  ThemeProvider,
  SiteContentProvider,
} from './context';
import router from './routes';

const App = () => (
  <ThemeProvider>
    <UIProvider>
      <AuthProvider>
        <SiteContentProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <RouterProvider router={router} />
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </SiteContentProvider>
      </AuthProvider>
    </UIProvider>
  </ThemeProvider>
);

export default App;
