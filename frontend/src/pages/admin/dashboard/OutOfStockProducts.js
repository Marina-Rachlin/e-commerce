import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useGetAllProductsQuery } from "../../../redux/features/products/productApi";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/orderApi";
import { useGetAllUsersQuery } from "../../../redux/features/users/userApi";
import { AiOutlineMail } from "react-icons/ai";

const AllInvoices = () => {
  const { data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: productsData } = useGetAllProductsQuery({});

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (data) {
        console.log(data)
      const temp = data.orders.map((item) => {
        const user = usersData?.users.find(
          (user) => user._id === item.userId
        );
        const course = productsData?.courses.find(
          (course) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, productsData]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: 0.5 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 }
  ];

  const fakeData = [];

  for (let i = 1; i <= 20; i++) {
    fakeData.push({
      id: i,
      userName: `User ${i}`,
      price: `$${(Math.random() * 100).toFixed(2)}`,
      created_at: new Date().toISOString(),
    });
  }

  const rows = [];

  orderData &&
    orderData.forEach((item) => {
      rows.push({
        id: item._id,
        userName: item.user.name,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div>
      <Box>
          <Box
            m="0 0 0 0"
            height="310px" 
            overflow="hidden"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiDataGrid-row": {
                color: "#373f50",
                borderBottom: "1px solid #e5e5e5!important",
                backgroundColor: "white"
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
                color: "#6b6b6b!important"
              },
              "& .name-column--cell": {
                color: "red",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f2f5f9",
                borderBottom: "none",
                color: "#1966d2",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                display: "none"
              },
            }}
          >
            <DataGrid
              rows={fakeData}
              columns={columns}
              pagination={false} 
            />
          </Box>
        </Box>
    </div>
  );
};

export default AllInvoices;
