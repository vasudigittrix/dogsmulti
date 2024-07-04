import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, clearEmplAction } from "@/reducer/SingleEmployeeSlice";
const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const employeesuccessData = useSelector((state)=> state.singleemployee.success);
    const employeeData = useSelector((state)=> state.singleemployee.content);
    const [employeedetails, setEmployeeDetails] = useState([]);
  const router = useRouter();
  const [userid, setUserid] = useState(null);
  useEffect(()=>{
    if(session){
      setUserid(session.user?.id);
    }
  },[])

  useEffect(()=>{
    if(userid){
      dispatch(getEmployee(
        userid
      ))
    }
  },[userid]);
  useEffect(()=>{
    if(employeesuccessData &&employeeData){
      setEmployeeDetails(employeeData);
      dispatch(clearEmplAction());
    }
  },[employeesuccessData]);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleSignout = async()=>{
    await signOut({ redirect: false });
    router.push('/login'); 
  }
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
      
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
        </Box>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem disabled={true}>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
      <div>{employeedetails.firstName} {employeedetails.lastName}</div>
      <div>{employeedetails.type}</div>
    </Box>
      </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>
            <Link href="/employee/profile">
            My Profile
            </Link>
            </ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleSignout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default EmployeeProfile;
