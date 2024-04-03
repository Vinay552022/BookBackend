import React, { useEffect, useMemo,useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";


export default function HomeopathicDoctorTable(props) {
    const data=props.data
    const customSortingFn = (rowA, rowB, columnId) => {
        const addressA = getAddressString(rowA.original[columnId]);
        const addressB = getAddressString(rowB.original[columnId]);
        return addressA.localeCompare(addressB);
      };
  
      const getAddressString = (addressObj) => {
        if (!addressObj) return '';
        const { lane1, lane2, pincode, state, district } = addressObj;
        return `${lane1}, ${lane2}, ${pincode}, ${state}, ${district}`;
      };
    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                sortingFn: 'alphanumeric',
                muiTableHeadCellProps: { sx: { color: "green" } }
                
            },
            {
                accessorKey: "phoneNumber",
                header: "Phone Number",
                
            },
            {
                accessorKey: "email",
                header: "Email",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "qualification",
                header: "Qualification",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "specialty",
                header: "Specialty",
                sortingFn: 'alphanumeric',
                Cell: (e) => {
                    if (e.cell.row.original.qualification === "MD") {
                        return e.renderedCellValue || "None";
                    } else {
                        return "None";
                    }
                }
            },
            {
                accessorKey: "registrationNumber",
                header: "Registration Number",
            },
            {
                accessorKey: "stateRegistered",
                header: "State Registered With",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "university",
                header: "University",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "college",
                header: "College",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "currentJob",
                header: "Current Job",
                sortingFn: 'alphanumeric'
            },
            {
                accessorKey: "currentAddress",
                header: "Current Address",
                sortingFn: customSortingFn,
                Cell: (e) => {
                    if (!e.renderedCellValue) return <span>NA</span>;
                    const addressString = getAddressString(e.renderedCellValue);
                    return addressString;
                }
            },
            {
                accessorKey: "residentialAddress",
                header: "Residential Address",
                sortingFn: customSortingFn,
                Cell: (e) => {
                    if (!e.renderedCellValue) return <span>NA</span>;
                    const addressString = getAddressString(e.renderedCellValue);
                    return addressString;
                }
            },
            {
                accessorKey: "alternatePhoneNumber",
                header: "Alternate Phone Number",
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