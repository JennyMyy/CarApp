import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/base";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";


export default function CarList() {

    //states
    const [cars, setCars] = useState([{ brand: '', model: '', fuel: '', color: '', modelYear: '', price: ''}]);
    // viestiä päivityksen onnistumisesta, tallennuksesta ja poistosta
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState();

    const [colDefs, setColDefs] = useState([
        { headerName: 'Brand', field: 'brand', sortable: true, filter: true },
        { headerName: 'Model', field: 'model', sortable: true, filter: true },
        { headerName: 'Fuel', field: 'fuel', sortable: true, filter: true },
        { headerName: 'Color', field: 'color', sortable: true, filter: true },
        { headerName: 'Year', field: 'modelYear', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true },
        { cellRenderer: params => <EditCar updateCar={updateCar} params={params}/>, width: 120},
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params)}
                >
                    Delete
                </Button>
            , width: 120
        }
    ]);

    useEffect(() => getCars(), []); // fetch only after first rendering

    // functions
    // getCars
    const getCars = () => {
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars", { method: 'GET' })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responsedata => {
                console.log(responsedata._embedded.cars);
                setCars(responsedata._embedded.cars);
            })
            .catch(error => console.error(error))
    }

    // deleteCar

    const deleteCar = (params) => {
        // console.log(params.data);
        console.log(params.data._links.car.href);
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsgSnackbar("The car was deleted successfully!")
                        setOpenSnackbar(true);
                        getCars(); // haetaan uudelleen pöivitetty tilanne
                    } else {
                        setMsgSnackbar("Something went wrong with deleting.")
                        setOpenSnackbar(true);
                        // window.alert("Something went wrong with deleting.");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    // huom POST
    const addCar = (car) => {
        console.log("carlist: addCar");
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            console.log("response " + response);
            if (response.ok) {
                setMsgSnackbar('Auto lisätty onnistuneesti');
                setOpenSnackbar(true);
                crossOriginIsolated.log("response on ok")
            } else {
                throw new Error('Datan vienti bakkariin ei onnistunut')
            }
        })
        .then(data => {
            console.log("parsed JSON = " + data);
            // kutsuu uudelleen autot
            getCars();
        })
        .catch(err => console.error(err))
    }

    // Huom, PUT päivitettäessä, URL tulee suoraan restistä, missä on indeksi urlissa.
    const updateCar = (URL, updatedCar) => {
        console.log("carlist: addCar");
        fetch(URL, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            console.log("Carslist: updatedcar " );
            if (response.ok) {
                setMsgSnackbar('Auto lisätty onnistuneesti');
                setOpenSnackbar(true);
                crossOriginIsolated.log("response on ok")
                return response.json();
            } else {
                throw new Error('Datan vienti bakkariin ei onnistunut')
            }
        })
        .then(data => {
            console.log("parsed JSON = " + data);
            getCars();
        })
    }

    // return + props addCar
    return (
        <>
            
            <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{ width: 700, height: 500, margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={10}
                >

                </AgGridReact>
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false);
                        setMsgSnackbar("")}}>

                </Snackbar>
            </div>
        </>

    )

}