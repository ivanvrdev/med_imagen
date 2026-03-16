import React from 'react'
import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Outlet } from 'react-router'

const Navbar = () => {
  return (
  <>
    <AppBar 
      position='absolute'
      color='primary'
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{display: 'flex'}}
          >
            TU LOGO
          </Typography>
        </Box>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
      </Toolbar>
    </AppBar>
    <Box sx={{height: '70px'}}></Box>
    <Outlet />
  </>
  )
}

export default Navbar