import React, { useState, useEffect } from 'react';
import UserDemographicsSurveyPage from 'pages/UserSurvey/demographics/UserDemographicsSurveyPage';
import { Typography, Link } from '../../components/Wrappers/Wrappers';
import { push } from 'connected-react-router';
import UserDemographics from '@mui/icons-material/PeopleAlt';
import UserLifestyleIcon from '@mui/icons-material/LocalBar';
import UserHabitsIcon from '@mui/icons-material/SmokingRooms';
import UserPersonalityIcon from '@mui/icons-material/Person';
import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';

import {
	useManagementDispatch,
	useManagementState,
} from '../../context/ManagementContext';

const UserSurveyPage = () => {
	// get user
	const managementDispatch = useManagementDispatch();
	const managementValue = useManagementState();

	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		setCurrentUser(managementValue.currentUser);
	}, [managementDispatch, managementValue]);

	console.log(currentUser);
	return (
		<div>
			<Box display="flex" justifyContent="center" alignItems="center" height="50vh">
				<Box m={2}>
					<Link href={`#/user/survey/demographics`}>
						<IconButton>
							<Box display="flex" flexDirection="column" alignItems="center">
								<UserDemographics fontSize="large" />
								<Typography variant="h6">Demographics</Typography>
							</Box>
						</IconButton>
					</Link>
				</Box>
				<Box m={2}>
					<Link href="/#/user/survey/lifestyle">
						<IconButton>
							<Box display="flex" flexDirection="column" alignItems="center">
								<UserLifestyleIcon fontSize="large" />
								<Typography variant="h6">Lifestyle</Typography>
							</Box>
						</IconButton>
					</Link>
				</Box>
				<Box m={2}>
					<Link href="/#/user/survey/habits">
						<IconButton>
							<Box display="flex" flexDirection="column" alignItems="center">
								<UserHabitsIcon fontSize="large" />
								<Typography variant="h6">Habits</Typography>
							</Box>
						</IconButton>
					</Link>
				</Box>
				<Box m={2}>
					<Link href="/#/user/survey/personality">
						<IconButton>
							<Box display="flex" flexDirection="column" alignItems="center">
								<UserPersonalityIcon fontSize="large" />
								<Typography variant="h6">Personality</Typography>
							</Box>
						</IconButton>
					</Link>
				</Box>
			</Box>
		</div>
	);
}

export default UserSurveyPage;
