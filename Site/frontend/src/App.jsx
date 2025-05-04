import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';

import AdminSummary from './components/dashboard/AdminSummary';

// Employee screens
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Setting from './components/EmployeeDashboard/Setting';

// Supplier screens
import SupplierList from './components/supplier/List';
import AddSupplier from './components/supplier/Add';
import EditSupplier from './components/supplier/Edit';
import ViewSupplier from './components/supplier/View';

// **Product screens**
import ProductList from './components/product/List';
import ProductAdd  from './components/product/Add';
//import ProductView from './components/product/';
import ProductEdit from './components/product/Edit';

// Order screens
import OrdersList from './components/order/OrdersList';
import AddOrder    from './components/order/AddOrder';
import EditOrder   from './components/order/EditOrder';
import ViewOrder   from './components/order/ViewOrder';

// Payment screens
import AddPayment  from './components/payment/AddPayment';
import EditPayment from './components/payment/EditPayment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Dashboard home */}
          <Route index element={<AdminSummary />} />

          {/* Employee CRUD */}
          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employees/:id" element={<View />} />
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />} />
          <Route path="/admin-dashboard/setting" element={<Setting />} />

          {/* Supplier CRUD */}
          <Route path="/admin-dashboard/suppliers" element={<SupplierList />} />
          <Route path="/admin-dashboard/add-supplier" element={<AddSupplier />} />
          <Route path="/admin-dashboard/supplier/view-supplier/:id" element={<ViewSupplier />} />
          <Route path="/admin-dashboard/supplier/edit-supplier/:id" element={<EditSupplier />} />

          {/* **Product CRUD** */}
          <Route path="/admin-dashboard/products" element={<ProductList />} />
          <Route path="/admin-dashboard/add-product" element={<ProductAdd />} />
          <Route path="/admin-dashboard/products/edit/:id" element={<ProductEdit />} />

          {/* Order CRUD */}
          <Route path="/admin-dashboard/orders" element={<OrdersList />} />
          <Route path="/admin-dashboard/add-order" element={<AddOrder />} />
          <Route path="/admin-dashboard/order/view/:id" element={<ViewOrder />} />
          <Route path="/admin-dashboard/order/edit/:id" element={<EditOrder />} />

          {/* Payment routes */}
          <Route path="/admin-dashboard/payments" element={<AddPayment />} />
          <Route path="/admin-dashboard/payment/edit/:id" element={<EditPayment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;