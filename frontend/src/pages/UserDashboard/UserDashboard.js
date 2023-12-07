import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, Box, Grid, Typography, Button } from '@mui/material';
import reactLogo from '../../images/react-logo.svg';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {
	useManagementDispatch,
	useManagementState,
} from '../../context/ManagementContext';
// components
import Widget from '../../components/Widget/Widget';
import Ellipse1Image from './assets/images/Dashboard_Ellipse_1.png';
import Ellipse2Image from './assets/images/Dashboard_Ellipse_2.png';
import Ellipse3Image from './assets/images/Dashboard_Ellipse_3.png';
import Ellipse4Image from './assets/images/Dashboard_Ellipse_4.png';
import Ellipse5Image from './assets/images/Dashboard_Ellipse_5.png';
import Ellipse6Image from './assets/images/Dashboard_Ellipse_6.png';
import Ellipse7Image from './assets/images/Dashboard_Ellipse_7.png';
import Ellipse8Image from './assets/images/Dashboard_Ellipse_8.png';
function signOut(history) {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	localStorage.removeItem('user_id');
	document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	axios.defaults.headers.common["Authorization"] = "";
	history.push("/login");
}

const UserDashboard = () => {
	const history = useHistory();
	const managementDispatch = useManagementDispatch();
	const managementValue = useManagementState();

	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		setCurrentUser(managementValue.currentUser);
	}, [managementDispatch, managementValue]);


	const [maxWidth, setMaxWidth] = useState(0);
	const boxRefs = useRef([]);

	useEffect(() => {
		const maxWidth = boxRefs.current.reduce((max, box) => {
			return box.offsetWidth > max ? box.offsetWidth : max;
		}, 0);
		setMaxWidth(maxWidth);
	}, []);


	if (!currentUser) {
		// window.location.href = '/#/user/edit';
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
				// onClick={() => signOut(history)}
			>
				<CircularProgress />
			</Box>
		);
	}

	// if currentuser name is missing, then redirect to edit user page
	if (!currentUser.firstName || !currentUser.lastName || !currentUser.email || !currentUser.role) {
		window.location.href = '/#/user/edit';
	}
	return (
		<div>
			<h1 className='page-title'>
				Welcome, {currentUser.firstName}! <br />
			</h1>

			<Box sx={{ display: 'flex', justifyContent: 'center', width: 'min-content' }}>

				<Grid container alignItems='center' columns={12} spacing={1}>
					<Typography variant='h6' textAlign='center'>Your top matches</Typography>

					<Box sx={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
						<Grid container alignItems='center' columns={12} spacing={1}>
							{[Ellipse1Image, Ellipse2Image, Ellipse3Image, Ellipse4Image].map((image, index) => (

								<Grid item xs={12} key={index} ref={el => boxRefs.current[index] = el}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>

										<img src={image} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
										<Widget>
											<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
												<Typography variant='h6'>{currentUser.firstName} {currentUser.lastName}</Typography>
												<Typography variant='subtitle1'>{currentUser.email}</Typography>
												<Typography variant='subtitle1'>{currentUser.phoneNumber}</Typography>
											</Box>
										</Widget>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
				</Grid>

				<Grid container alignItems='center' columns={12} spacing={1}>
					<Typography variant='h6' textAlign='center'>People who matched with you</Typography>
					<Box sx={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
						<Grid container alignItems='center' columns={12} spacing={1}>
							{[Ellipse1Image, Ellipse2Image, Ellipse3Image, Ellipse4Image].map((image, index) => (

								<Grid item xs={12} key={index} ref={el => boxRefs.current[index] = el}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>

										<img src={image} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
										<Widget>
											<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
												<Typography variant='h6'>{currentUser.firstName} {currentUser.lastName}</Typography>
												<Typography variant='subtitle1'>{currentUser.email}</Typography>
												<Typography variant='subtitle1'>{currentUser.phoneNumber}</Typography>
											</Box>
										</Widget>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
				</Grid>
			</Box>

			{/* <Box sx={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
					<Grid container alignItems='center' columns={12} spacing={1}>
						<Grid item xs={12}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<img src={Ellipse5Image} alt='ellipse5' style={{ width: '100px', height: '100px', marginRight: '10px' }} />
								<Widget>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<Typography variant='h6'>{currentUser.firstName} {currentUser.lastName}</Typography>
										<Typography variant='subtitle1'>{currentUser.email}</Typography>
										<Typography variant='subtitle1'>{currentUser.phoneNumber}</Typography>
									</Box>
								</Widget>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<img src={Ellipse6Image} alt='ellipse6' style={{ width: '100px', height: '100px', marginRight: '10px' }} />
								<Widget>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<Typography variant='h6'>{currentUser.firstName} {currentUser.lastName}</Typography>
										<Typography variant='subtitle1'>{currentUser.email}</Typography>
										<Typography variant='subtitle1'>{currentUser.phoneNumber}</Typography>
									</Box>
								</Widget>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<img src={Ellipse7Image} alt='ellipse7' style={{ width: '100px', height: '100px', marginRight: '10px' }} />
								<Widget>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<Typography variant='h6'>{currentUser.firstName} {currentUser.lastName}</Typography>
										<Typography variant='subtitle1'>{currentUser.email}</Typography>
										<Typography variant='subtitle1'>{currentUser.phoneNumber}</Typography>
									</Box>
								</Widget>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<img src={Ellipse8Image} alt='ellipse8' style={{ width: '100px', height: '100px', marginRight: '10px' }} />
								<Widget>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<Typography variant='h6'>{currentUser.firstName} {currentUser.lastName}</Typography>
										<Typography variant='subtitle1'>{currentUser.email}</Typography>
										<Typography variant='subtitle1'>{currentUser.phoneNumber}</Typography>
									</Box>
								</Widget>
							</Box>
						</Grid>
					</Grid>
				</Box> */}
			{/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box sx={{ border: '1px solid black', padding: '10px', margin: '10px', width: `${maxWidth}px` }}>
					<Grid container alignItems='center' columns={12} spacing={1}>
						
						{[Ellipse1Image, Ellipse2Image, Ellipse3Image, Ellipse4Image, Ellipse5Image, Ellipse6Image, Ellipse7Image, Ellipse8Image].map((image, index) => (
							<Grid item xs={12} key={index} ref={el => boxRefs.current[index] = el}>
								<img src={image} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
								<Widget>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<Typography variant='h6'>{currentUser.firstName} {currentUser.lastName}</Typography>
										<Typography variant='subtitle1'>{currentUser.email}</Typography>
										<Typography variant='subtitle1'>{currentUser.phoneNumber}</Typography>
									</Box>
								</Widget>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box> */}
		</div>
	);
};

export default UserDashboard;
