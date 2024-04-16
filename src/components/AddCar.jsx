import React from 'react';
import { Button } from "@mui/base";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar(props) {

    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    // open on false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false);

    // kun klikataa, aukeaa syöttöikkuna
    const handleClickOpen = () => {
        setOpen(true);
    }

    // save car
    const handleSave = () => {
        console.log("Addcar: save a new car");
        props.addCar(car);
        setOpen(false);
    }

    // sulkee ikkunan
    const handleCancel = () => setOpen(false);

    // return ja dialogilla syötät tiedot
    return (
        <div>
            <Button 
                variant="contained"
                onClick={handleClickOpen}>
                Add
                </Button>

            <Dialog open={open}>
                <DialogTitle>Add car
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Brand"
                        value={car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                        variant="standard"
                        fullWidth/>
                    
                    <TextField
                        margin="dense"
                        label="Model"
                        value={car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                        variant="standard"
                        fullWidth
                        />
                    
                    <TextField
                        margin="dense"
                        label="Color"
                        value={car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                        variant="standard"
                        fullWidth/>
                    
                    <TextField
                        margin="dense"
                        label="Fuel"
                        value={car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                        variant="standard"
                        fullWidth/>
                    
                    <TextField
                        margin="dense"
                        label="Year"
                        value={car.modelYear}
                        onChange={(e) => setCar({ ...car, modelYear: e.target.value })}
                        variant="standard"
                        fullWidth/>
                    
                    <TextField
                        margin="dense"
                        label="Price"
                        value={car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                        variant="standard"
                        fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}