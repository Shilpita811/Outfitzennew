import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
// import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllSellerRequest, clearErrors, deleteRequest } from "../../actions/sellerAction";
import { DELETE_APPLICATIONS_RESET } from "../../constants/sellerConstants";
const SellerList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, requests } = useSelector((state) => state.allRequest);

    const { error: deleteError, isDeleted } = useSelector((state)=>state.application);

    const deleteRequestHandler = (id) =>{
        dispatch(deleteRequest(id));
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        };
        if(deleteError){
            alert.error(error);
            dispatch(clearErrors);
        };
        if(isDeleted){
            alert.success("Request Deleted Successfully");
            dispatch({ type: DELETE_APPLICATIONS_RESET })
        }
        dispatch(getAllSellerRequest());
    }, [dispatch, error, alert,deleteError,isDeleted]);



    const columns = [
        {
            field: "id",
            headerName: "Request Id",
            minWidth: 50, 
            flex: 0.8
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 50,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 50,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Status",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "seller"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/seller/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteRequestHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];
    const rows = [];

    requests &&
    requests.forEach((item)=>{
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        });
    });
  return (
    <Fragment>
            <MetaData title={`SELLER REQUEST - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">Seller Requert</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
  )
}

export default SellerList
