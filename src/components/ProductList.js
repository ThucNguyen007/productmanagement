import React, { useEffect, useState, useParams } from 'react';

import { SERVER_URL } from './Constants';

import { 
DataGrid, 
GridToolbarContainer,
GridToolbarExport, 
gridClasses } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

function CustomToolbar() {
  return (
    <GridToolbarContainer 
      className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetchAPIProducts();
  }, []);

  const fetchAPIProducts = () => {
    fetch(SERVER_URL + 'api/products')
    .then(response => response.json())
    .then(data => setProducts(data._embedded.products))
    .catch(err => console.error(err));    
  }
  
  const onDelClick = (url) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(url,  {method: 'DELETE'})
      .then(response => {
        if (response.ok) {
          fetchAPIProducts();
          setOpen(true);
        }
        else {
          alert('Something went wrong!');
        }
      })
      .catch(err => console.error(err))
    }
  }
  
  // Add a new product
  const addProduct = (product) => {
    fetch(SERVER_URL  +  'api/products',
      { method: 'POST', headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(product)
    })
    .then(response => {
      if (response.ok) {
        fetchAPIProducts();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }

  // Update existing product
  const updateProduct = (product, link) => {
    fetch(link,
      { 
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
    .then(response => {
      if (response.ok) {
        fetchAPIProducts();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }
   
  const columns = [
    {field: 'name', headerName: 'Brand', width: 200},
    {field: 'type', headerName: 'Type', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'price', headerName: 'Price', width: 150},
    {
      field: '_links.product.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => <EditProduct 
                            data={row} 
                            updateProduct={updateProduct} />
    },
    {
      field: '_links.self.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => 
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
    }
  ];
  
  return(
    <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddProduct addProduct={addProduct} />
      </Stack>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          rows={products} 
          columns={columns} 
          disableSelectionOnClick={true}
          components={{ Toolbar: CustomToolbar }}
          getRowId={row => row._links.self.href}/>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Product deleted"
        />
      </div>
    </React.Fragment>
  );

}

export default ProductList;
