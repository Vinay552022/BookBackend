import React, { useEffect, useMemo,useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";


export default function ShowOrders(props) {
    const data=props.orderData
    
    const customSortingFn = (rowA, rowB, columnId) => {
        const addressA = getAddressString(rowA.original[columnId]);
        const addressB = getAddressString(rowB.original[columnId]);
        return addressA.localeCompare(addressB);
      };
      const getAddressString = (addressObj) => {
        if (!addressObj) return '';
        const { lane1, lane2, pincode, state, city, country } = addressObj;
        return `${lane1}, ${lane2}, ${pincode}, ${state}, ${city}, ${country}`;
      };
      const columns = useMemo(
        () => [
            {
                accessorKey: "email",
                header: "Email",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "userType",
                header: "User Type",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "totalAmount",
                header: "Total Amount",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "status",
                header: "Status",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "trackingNumber",
                header: "Tracking Number",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "createdAt",
                header: "Created At",
                Cell: (e) => {
                    const date = new Date(e.renderedCellValue);
                    return date.toLocaleString();
                }
            },
            {
                accessorKey: "deliveredAt",
                header: "Delivered At",
                Cell: (e) => {
                    if (!e.renderedCellValue) return <span>Not Delivered</span>;
                    const date = new Date(e.renderedCellValue);
                    return date.toLocaleString();
                }
            },
            {
                accessorKey: "placedBy",
                header: "Placed By",
                sortingFn: 'alphanumeric'
            }
        ],
        []
    );
    
    

    const table = useMaterialReactTable({
        data,
        columns,
        
    });

    return <MaterialReactTable table={table} />;
}