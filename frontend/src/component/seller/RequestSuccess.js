import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const RequestSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Request has been Sent successfully </Typography>
            <Typography>Our Representative Will Contact You Within 48 Hours</Typography>
            <Link to="/">Home</Link>
        </div>
    )
}

export default RequestSuccess
