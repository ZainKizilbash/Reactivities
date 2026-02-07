import { Avatar, Box, Divider, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Logout, Person } from '@mui/icons-material';

export default function UserMenu() {
    const {currentUser, logoutUser} = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color='inherit'
        size='large'
        sx={{fontSize: '1.1rem'}}
      >
        <Box display='flex' alignItems='center' gap={2}>
            <Avatar
              src={currentUser?.imageUrl}
              alt='current user image'
            />
            {currentUser?.displayName}
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to = {`/profile/${currentUser?.id}`} onClick={handleClose}>
            <ListItem>
                <Person/>
            </ListItem>
            <ListItemText>My profile</ListItemText>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={() => {
            logoutUser.mutate();
            handleClose();
        }}>
            <ListItem>
                <Logout/>
            </ListItem>
            <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
