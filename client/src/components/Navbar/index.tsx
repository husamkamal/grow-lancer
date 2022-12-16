import {
  MouseEvent, useState, useContext, useEffect,
} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Badge } from '@mui/material';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo2.png';
import UserContext from '../../context';
import avatar from '../../assets/Avatar.png';
import socket from '../../socketConfig';
import './style.css';

// initial nav settings

function Navbar() {
  const pages = [{ label: 'Jobs', path: '/jobs-search' }];
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [notificationElNav, setNotificationElNav] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [scroll, setScroll] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const { pathname } = useLocation();
  const [notifications, setNotifications] = useState<any>([]);
  const [unSeenCount, setUnSeenCount] = useState<number>(0);
  const [socketAlert, setSocketAlert] = useState<any | null>(null);

  const Logout = async () => {
    try {
      await axios.get('/api/v1/auth/logout');
    } finally {
      if (setUser) setUser(null);
    }
  };
  const freelancerSettings = [
    { label: 'Profile', path: `/freelancer/${user?.userID}` },
    { label: 'Jobs', path: '/jobs-search' },
  ];
  const clientSettings = [
    { label: 'Profile', path: '/profile' },
  ];
  const noUserSettings = [
    { label: 'Login', path: '/login' },
    { label: 'signUp', path: '/signup' },
  ];
  let currentSettings = noUserSettings;
  if (user) {
    if (user.role === 'client') {
      currentSettings = clientSettings;
    } else {
      currentSettings = freelancerSettings;
    }
  }
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNotificationMenu = () => {
    setNotifications((prev: any) => prev.map((n: any) => ({ ...n, seen: true })));
    setUnSeenCount(0);
    setNotificationElNav(false);
  };
  const handleOpenNotificationMenu = () => {
    const seeNotifications = async () => {
      try {
        await axios.put('/api/v1/notifications');
      } catch (err) {
        console.log(err);
      }
    };
    seeNotifications();
    setNotificationElNav(true);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const getNotification = async () => {
      try {
        const data = await axios.get('/api/v1/notifications');
        setNotifications(data.data.data.notifications);
        setUnSeenCount(data.data.data.unSeenCount);
      } catch (err) {
        console.log(err);
      }
    };
    if (user && user.role === 'freelancer') { getNotification(); }
  }, [user, socketAlert]);

  useEffect(() => {
    socket.on('sendNotification', (data) => {
      setSocketAlert(data);
    });
    return () => {
      socket.off('sendNotification');
    };
  }, [socket]);

  return (
    <AppBar
      position="absolute"
      className={scroll ? 'fixed-nav' : 'abs-nav'}
      color="secondary"
      elevation={scroll ? 5 : 0}
    >
      {(user?.role === 'freelancer') && (
        <Menu
          open={notificationElNav}
          anchorOrigin={{
            vertical: 55,
            horizontal: 'right',
          }}
          onClose={handleCloseNotificationMenu}
          className="notification-list"
        >
          {notifications.length ? notifications.map((n: any) => (
            <Link to={`/freelancer/${user?.userID}`}>
              <MenuItem className="notification" onClick={handleCloseNotificationMenu}>
                <p style={{ color: n.seen ? '#000' : 'blue' }}>{n.description}</p>
                <small>{new Date(n.createdAt).toLocaleString()}</small>
              </MenuItem>
            </Link>
          )) : (
            <MenuItem className="notification" onClick={handleCloseNotificationMenu}>
              <p>No Notifications</p>
            </MenuItem>
          )}

        </Menu>
      )}
      {!!socketAlert && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open
          autoHideDuration={5000}
          onClose={() => setSocketAlert(null)}
        >
          <Alert severity="info">
            {`${socketAlert.clientName} accept your proposal in ${socketAlert.jobTitle}`}
          </Alert>
        </Snackbar>
      )}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            className="nav-logo"
            sx={{
              mr: { xs: 25, md: 10 },
              paddingTop: { xs: '10px', md: '0' },
            }}
          >
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} justifyContent="center" order={2}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {user
                ? <Avatar sx={{ width: 45, height: 45 }} alt={user?.name} src={avatar} />
                : <MenuIcon style={{ transform: 'scale(1.5)' }} />}
            </IconButton>
            <Menu
              disableScrollLock
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                mt: '1rem',
              }}
            >
              {
                currentSettings.map((s) => (
                  <Link to={s.path} key={s.label}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography className="menu-item" textAlign="center">{s.label}</Typography>
                    </MenuItem>
                  </Link>
                ))
              }
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink to={page.path} key={page.label} className="nav-page">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: '#1C3879',
                    display: 'block',
                    mr: '3rem',
                    fontSize: '18px',
                    fontWeight: 500,
                  }}
                >
                  {page.label}
                </Button>
              </NavLink>
            ))}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Menu
                disableScrollLock
                sx={{ mt: '65px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {currentSettings.map((setting) => (
                  <Link to={setting.path} key={setting.label}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography className="menu-item" textAlign="center">{setting.label}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                <MenuItem onClick={Logout}>
                  <Typography className="menu-item" textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }} className="user-nav-info">
                <Tooltip title="Open settings">
                  <Typography onClick={handleOpenUserMenu}>{user.name}</Typography>
                </Tooltip>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ width: 50, height: 50 }} alt={user?.name} src={avatar} />
                  </IconButton>
                </Tooltip>
                {user?.role === 'freelancer' && (
                  <Tooltip title="Open settings">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNotificationMenu}
                      color="inherit"
                    >
                      <Badge badgeContent={unSeenCount} color="primary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          )
            : (
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                {pathname !== '/login'
                  && (
                    <Link to="/login">
                      <Button
                        className="auth-btns"
                        variant="contained"
                      >
                        Login

                      </Button>

                    </Link>
                  )}
                {pathname !== '/signup' && (
                  <Link to="/signup">
                    <Button
                      className="auth-btns"
                      variant="contained"
                    >
                      SignUp

                    </Button>
                  </Link>
                )}
              </Box>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
