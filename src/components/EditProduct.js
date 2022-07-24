import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditProduct(props) {

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '', type: '', 
    color: '', brand: '', price: ''
  });

  // Open the modal form and update the product state
  const handleClickOpen = () => {
    setProduct({
      name: props.data.row.name,
      type: props.data.row.type,
      color: props.data.row.color,
      brand: props.data.row.brand,
      price: props.data.row.price 
    })      
    setOpen(true);
  }

  // Close the modal form 
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    setProduct({...product, 
      [event.target.name]: event.target.value});
  }

  // Update product and close modal form 
  const handleSave = () => {
    props.updateProduct(product, props.data.id);
    handleClose();
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit product</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField label="Name" name="name" 
                  variant="standard" value={product.name} 
                  onChange={handleChange}
              />
              <TextField label="Type" name="type" 
                  variant="standard" value={product.type} 
                  onChange={handleChange}
              />
              <TextField label="Color" name="color" 
                  variant="standard" value={product.color} 
                  onChange={handleChange}
              />
              <TextField label="Brand" name="brand" autoFocus
                variant="standard" value={product.brand} 
                onChange={handleChange}
              />
              <TextField label="Price" name="price" 
                variant="standard" value={product.price} 
                onChange={handleChange}
              />
            </Stack>         
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>            
    </div>
  );
}

export default EditProduct;