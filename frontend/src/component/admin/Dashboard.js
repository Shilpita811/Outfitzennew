import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { Line, Doughnut } from "react-chartjs-2"
import {
  Chart as chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  ArcElement,
  Tooltip,
} from "chart.js";
chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  ArcElement,
  Tooltip,
);



const Dashboard = () => {


  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  const { requests } = useSelector((state)=> state.allRequest)

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });



  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ["rgb(195, 126, 220)"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const options = {
    plugins: {
      legend: true,
    }
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#DC143C", "#2AAA8A"],
        hoverBackgroundColor: ["#FF3131", "#228B22"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };


  return (
    <div className="dashboard">
      <MetaData title={"Admin Dashboard"} />
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line
            data={lineState}
            options={options}
          ></Line>
        </div>

        <div className="doughnutChart">
          <Doughnut
            data={doughnutState}
            options={options}
          ></Doughnut>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
