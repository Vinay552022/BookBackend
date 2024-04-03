import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";
export default function UsersRegisteredByMe(props) {
    const data = props.filterData;
    const navigate=useNavigate()
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

    // State to manage selected user
    const [selectedUser, setSelectedUser] = useState(null);

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
                accessorKey: "userType",
                header: "User Type",
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
            },
            {
                accessorKey: "opinion",
                header: "Opinion",
                sortingFn: 'alphanumeric'
            },
            {
                id: "actions",
                header: "Actions",
                Cell: ({ row }) => (
                    <div className="actions-dropdown">
                            <button className="btn  btn-outline-dark "  onClick={() => handleBuy(row.original)}>Buy</button>        
                    </div>
                )
            }
        ],
        []
    );
    const handleBuy = (userData) => {
        // Implement logic to send email
        console.log("Send Email:", userData);
        navigate('/BuyBooks',{ state:  userData })
    };
    const table = useMaterialReactTable({
        data,
        columns,
    });

    return <MaterialReactTable table={table} />;
}
