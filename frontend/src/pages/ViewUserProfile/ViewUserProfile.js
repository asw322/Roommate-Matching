import React, { useState, useEffect } from 'react';
import { Grid, Box, TextField, Typography, Button, Avatar } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import actions from 'actions/users/usersFormActions';
import axios from 'axios';
import {
	useManagementDispatch,
	useManagementState,
} from '../../context/ManagementContext';

const ViewUserProfile = (props) => {
	const history = useHistory();
	const managementDispatch = useManagementDispatch();
	const managementValue = useManagementState();

	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		setCurrentUser(managementValue.currentUser);
	}, [managementDispatch, managementValue]);

	const [userData, setUserData] = useState(null);

	const { id } = useParams(); // Assuming the user ID is passed via the URL
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`users/${id}`); // Adjust the endpoint as needed
				setUserData(response.data);
			} catch (error) {
				console.error('Error fetching user data:', error);
				return <div>Error fetching user data...</div>;
			}
		};

		fetchUserData();
	}, [id]);

	let isUserProfileOwner = currentUser && userData && currentUser.email === userData.email;

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h4">User Information</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '24px',
						marginTop: '16px',
						width: '100%', // Set the Box width to 100% to take up the entire width
					}}
				>
					<Avatar
						alt={`${userData.firstName} ${userData.lastName}`}
						src={userData.profilePicture}
						sx={{ width: '200px', height: '200px' }} // Set the image size to 200px by 200px
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: '16px',
							width: '100%', // Set the inner Box width to 100%
							maxWidth: '400px', // Limit the maximum width for text fields
						}}
					>
						<Box sx={{ display: 'flex', gap: '16px' }}>
							<TextField
								label="First Name"
								value={userData.firstName || ''}
								variant="outlined"
								disabled
								margin="normal"
							/>
							<TextField
								label="Last Name"
								value={userData.lastName || ''}
								variant="outlined"
								disabled
								margin="normal"
							/>
						</Box>
						<TextField
							label="Phone Number"
							value={userData.phoneNumber || ''}
							variant="outlined"
							disabled
							margin="normal"
						/>
						<TextField
							label="Email"
							value={userData.email || ''}
							variant="outlined"
							disabled
							margin="normal"
						/>
						<TextField
							label="Role"
							value={userData.role || ''}
							variant="outlined"
							disabled
							margin="normal"
						/>
					</Box>
				</Box>

				{isUserProfileOwner && (
					<Button
						variant="contained"
						color="primary"
						onClick={() => history.push(`/user/edit`)}
						sx={{ marginTop: '16px' }}
					>
						Edit
					</Button>
				)}
			</Grid>
		</Grid>
	);
};

export default ViewUserProfile;