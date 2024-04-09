// import './App.css'

import { AppBar, Toolbar, Typography } from "@mui/material"
import CarList from "./components/CarList"

function App() {


  return (
    <>
      <AppBar position="static">
        <Typography variant="h5">
          Car app
        </Typography>
      </AppBar>
      <CarList />

    </>
  )
}

export default App
