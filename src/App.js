import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ProductList from "./components/ProductList"

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Product Management
          </Typography>
        </Toolbar>
      </AppBar>
      <ProductList />
    </div>
  );
}

export default App;
