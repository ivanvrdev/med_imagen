import React, { useState } from 'react'
import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Outlet, useNavigate } from 'react-router'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PermMediaIcon from '@mui/icons-material/PermMedia';

const Navbar = () => {

  const [openDrawer, setOpenDrawer] = useState(false)

  const navigate = useNavigate()

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
            onClick={()=>setOpenDrawer(true)}
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
    <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
      <Box sx={{width: 250}}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={()=>{navigate("/")}}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={()=>{navigate("pacientes")}}
            >
              <ListItemIcon>
                <AccessibleIcon />
              </ListItemIcon>
              <ListItemText primary="Pacientes"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={()=>{navigate("estudios")}}
            >
              <ListItemIcon>
                <PermMediaIcon />
              </ListItemIcon>
              <ListItemText primary="Estudios"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
    <Outlet />
  </>
  )
}

export default Navbar