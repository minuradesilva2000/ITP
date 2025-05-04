import express from 'express'; // Importing Express framework to handle HTTP requests.
import cors from 'cors'; // Importing CORS middleware to handle cross-origin requests.
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';// Importing the authentication router to handle authentication routes.
import connectToDatabase from './db/db.js';
import employeeRouter from './routes/employee.js';
import dashboardRouter from './routes/dashboard.js';
import settingRouter from './routes/setting.js';
import supplierRouter from './routes/supplier.js';
import orderRouter from './routes/order.js';
import paymentRouter from './routes/payment.js';
import productRouter from './routes/product.js';

dotenv.config();

// Creating an instance of an Express application to handle HTTP requests
const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));
/*postman eken insert wena data jsonakata responsive wena awidiyata hadana aka karannae   */
app.use(express.json());
//app.use(express.static('public/uploads'));

app.use('/api/auth', authRouter);
app.use('/api/employee', employeeRouter);
// Setting up a route for employee-related API requests. 
 // Requests starting with `/api/employee` will be routed to `employeeRouter` for employee management tasks.
app.use('/api/supplier', supplierRouter);
app.use('/api/order', orderRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/payment', paymentRouter); // <-- added Payment route
app.use('/api/product', productRouter);
app.use('/public/uploads', express.static('public/uploads'));

connectToDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});