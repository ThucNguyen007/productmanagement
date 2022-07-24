import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddProduct(props) {

    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        type: '',
        color: '',
        brand: '',
        price: '' 
    });

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };
        
    // Close the modal form 
    const handleClose = () => {
        setOpen(false);
    };

    // Save product and close modal form 
    const handleSave = () => {
        props.addProduct(product);
        handleClose();
    }

    const handleChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
    }
    
    return (

        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                New Product
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Product</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Name" name="name" autoFocus
                            variant="standard"
                            value={product.name} 
                            onChange={handleChange}
                        /> <br/>
                        <TextField label="Brand" name="brand"
                            variant="standard"
                            value={product.brand} 
                            onChange={handleChange}
                        /> <br/> 
                        <TextField label="Color" name="color"
                            variant="standard"
                            value={product.color} 
                            onChange={handleChange}
                        /> <br/>
                        <TextField label="Type" name="type"
                            variant="standard"
                            value={product.type} 
                            onChange={handleChange}
                        /> <br/>
                        <TextField placeholder="Price" name="price"
                            variant="standard"
                            value={product.price} 
                            onChange={handleChange}
                        /> <br/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default AddProduct;