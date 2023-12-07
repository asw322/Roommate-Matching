import React, { useState, useEffect } from 'react';
import { Grid, Box, TextField, Avatar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles';

import {
	PersonOutline as PersonOutlineIcon,
	Lock as LockIcon,
} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import uuid from 'uuid/v4';

import Widget from '../../components/Widget/Widget';
import { Typography, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Ellipse1Image from './Dashboard_Ellipse_1.png';

import {
	useManagementDispatch,
	useManagementState,
} from '../../context/ManagementContext';
import config from '../../config';
import Axios from 'axios';

import { actions } from '../../context/ManagementContext';
import { showSnackbar } from '../../components/Snackbar';

const EditUser = () => {
	const classes = useStyles();
	const [tab, setTab] = React.useState(0);
	const [password, setPassword] = React.useState({
		newPassword: '',
		confirmPassword: '',
		currentPassword: '',
	});
	const [data, setData] = React.useState(null);
	const [editable, setEditable] = React.useState(false);
	let { id } = useParams();
	const fileInput = React.useRef(null);
	const handleChangeTab = (event, newValue) => {
		setTab(newValue);
	};
	const location = useLocation();
	const managementDispatch = useManagementDispatch();
	const managementValue = useManagementState();

	// get user
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		setCurrentUser(managementValue.currentUser);
	}, [managementDispatch, managementValue]);
	const isAdmin = currentUser && currentUser.role === 'admin';
	let isMissingRole = currentUser && currentUser.role === null;
	let isMissingFirstName = currentUser && currentUser.firstName === null;
	let isMissingLastName = currentUser && currentUser.lastName === null;
	let isGoogleUser = currentUser && currentUser.provider === 'google';
	let isMissingPronouns = currentUser && currentUser.pronouns === null;
	//let isMissingPhone = currentUser && currentUser.Phone === null;
	let isMissingBiography = currentUser && currentUser.biography === null;

	// if (isMissingRole) {
	// 	setData((prevData) => ({
	// 		...prevData,
	// 		role: 'user'
	// 	}));
	// 	handleSubmit();
	// }

	const [customPronouns, setCustomPronouns] = useState('');


	function extractExtensionFrom(filename) {
		if (!filename) {
			return null;
		}

		const regex = /(?:\.([^.]+))?$/;
		return regex.exec(filename)[1];
	}

	const uploadToServer = async (file, path, filename) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('filename', filename);
		const uri = `/file/upload/${path}`;
		await Axios.post(uri, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		const privateUrl = `${path}/${filename}`;

		return `${config.baseURLApi}/file/download?privateUrl=${privateUrl}`;
	};

	const handleFile = async (event) => {
		const file = event.target.files[0];

		const extension = extractExtensionFrom(file.name);
		const id = uuid();
		const filename = `${id}.${extension}`;
		const privateUrl = `users/avatar/${filename}`;

		const publicUrl = await uploadToServer(file, 'users/avatar', filename);
		let avatarObj = {
			id: id,
			name: file.name,
			sizeInBytes: file.size,
			privateUrl,
			publicUrl,
			new: true,
		};

		setData({
			...data,
			avatar: [...data.avatar, avatarObj],
		});

		return null;
	};
	const history = useHistory();

	useEffect(() => {
		actions.doFind(sessionStorage.getItem('user_id'))(managementDispatch);
		// eslint-disable-next-line  react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (location.pathname.includes('edit')) {
			setEditable(true);
		}
	}, [location.pathname]);

	useEffect(() => {
		setData(managementValue.currentUser);
	}, [managementDispatch, managementValue, id]);

	const deleteOneImage = (id) => {
		setData({
			...data,
			avatar: data.avatar.filter((avatar) => avatar.id !== id),
		});
	};

	function handleSubmit() {
		actions.doUpdate(
			sessionStorage.getItem('user_id'),
			data,
			history,
		)(managementDispatch);
	}

	function handleUpdatePassword() {
		actions.doChangePassword(password)(managementDispatch);
	}

	function handleChangePassword(e) {
		setPassword({
			...password,
			[e.target.name]: e.target.value,
		});
	}

	function handleChange(e) {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Widget>
					<Box display={'flex'} justifyContent={'center'}>
						<Tabs
							indicatorColor='primary'
							textColor='primary'
							value={tab}
							onChange={handleChangeTab}
							aria-label='full width tabs example'
						>
							<Tab
								label='PROFILE'
								icon={<PersonOutlineIcon />}
								classes={{ wrapper: classes.icon }}
							/>
							{!isGoogleUser && <Tab
								label='CHANGE PASSWORD'
								icon={<LockIcon />}
								classes={{ wrapper: classes.icon }}
							/>}
							<Tab
								label='SETTINGS'
								icon={<SettingsIcon />}
								classes={{ wrapper: classes.icon }}
							/>
						</Tabs>
					</Box>
				</Widget>
			</Grid>
			<Grid item xs={12}>
				<Widget>
					<Grid item justifyContent={'center'} container>
						<Box display={'flex'} flexDirection={'column'} width={600}>
							{tab === -1 ? (
								<>
									<Typography
										variant={'h5'}
										weight={'medium'}
										style={{ marginBottom: 30 }}
									>
										Account
									</Typography>
									<TextField
										label='First Name'
										value={data?.firstName || ''}
										onChange={handleChange}
										name='firstName'
										variant='outlined'
										style={{ marginBottom: 35 }}
									/>
									<TextField
										label='Email'
										value={data?.email || ''}
										name='email'
										onChange={handleChange}
										variant='outlined'
										style={{ marginBottom: 35 }}
										disabled
									/>
								</>
							) : tab === 0 ? (
								<>
									<Typography
										variant={'h5'}
										weight={'medium'}
										style={{ marginBottom: 35 }}
									>
										Personal Information
									</Typography>
									<Typography weight={'medium'}>Photo:</Typography>
									{/* <div className={classes.galleryWrap}>
										{data && data.avatar && data.avatar.length !== 0
											? data.avatar.map((avatar, idx) => (
												<div className={classes.imgWrap}>
													<span
														className={classes.deleteImageX}
														onClick={() => deleteOneImage(avatar.id)}
													></span>
													<img
														src={avatar.publicUrl}
														alt='avatar'
														height={'100%'}
														// onTouchStart={() => deleteOneImage(avatar.id)}
														// onClick={() => deleteOneImage(avatar.id)}
													/>
												</div>
											))
											: null}
											<Box sx={{ display: 'flex', justifyContent: 'center', width: 'min-content' }}>
									</div> */}
									<Box display={'flex'} justifyContent={'center'}>
										<Box display={'flex'} justifyContent={'left'} alignItems={'center'} style={{ marginBottom: 35 }}>
											<div className={classes.galleryWrap}>
												{data && data.avatar && data.avatar.length !== 0
													? data.avatar.map((avatar, idx) => (
														<div className={classes.imgWrap} key={idx}>
															{/* Overlay delete icon or text */}
															<img
																src={avatar.publicUrl || currentUser.profilePicture}
																alt='avatar'
																height={'100%'}
																style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
															/>

															<span
																onClick={() => deleteOneImage(avatar.id)}
																style={{
																	display: 'block',
																	position: 'center',
																	top: '5px', right: '5px',
																	cursor: 'pointer',
																	color: 'red', zIndex: 2
																}}
															>
																Click to Delete {/* Visible delete text */}
															</span>
														</div>
													))
													: <div className={classes.imgWrap}>
														<img
															src={Ellipse1Image}
															alt='avatar'
															height={'100%'}
															style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
														/>
													</div>
													// : <div className={classes.imgWrap}>
													// 	<Avatar
													// 		alt={`${currentUser.firstName} ${currentUser.lastName}`}
													// 		src={currentUser.profilePicture}
													// 		sx={{ maxWidth: '100%', display: 'block', margin: '0 auto' }} // Set the image size to 200px by 200px
													// 	/>
													// </div>
												}
											</div>
											{data && data.avatar && data.avatar.length == 0 && (
												<Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
													<label
														className={classes.uploadLabel}
														style={{ cursor: 'pointer' }}
													>
														{'Upload a new image'}
														<input
															style={{ display: 'none' }}
															accept='image/*'
															type='file'
															ref={fileInput}
															onChange={handleFile}
														/>
													</label>
													<Typography size={'sm'} style={{ width: 'max-content', position: 'center', marginBottom: 35 }}>
														.PNG, .JPG, .JPEG
													</Typography>
												</Box>)}
										</Box>

										<Box display={'flex'} flexDirection={'column'} justifyContent={'left'} alignItems={'center'} style={{ marginLeft: 10 }}>
											<FormControl variant='outlined' style={{ marginBottom: 5, flex: 1 }}>
												<InputLabel id='demo-simple-select-outlined-label'>
													Pronouns
												</InputLabel>
												<Select
													labelId='demo-simple-select-outlined-label'
													label='Pronouns'
													id='demo-simple-select-outlined'
													defaultValue='He/Him/His'
													value={data?.pronouns || ''}
													name='pronouns'
													onChange={handleChange}
													style={{ marginBottom: 5, width: 250 }}
												>
													<MenuItem value={'He/Him/His'}>He/Him/His</MenuItem>
													<MenuItem value={'She/Her/Hers'}>She/Her/Hers</MenuItem>
													<MenuItem value={'They/Them/Theirs'}>They/Them/Theirs</MenuItem>
													<MenuItem value={'custom'}>
														My pronouns are not listed. I use...
													</MenuItem>
												</Select>
												{data?.pronouns === 'custom' && (
													<TextField
														label='Custom Pronouns'
														variant='outlined'
														defaultValue={''}
														value={customPronouns}
														name='customPronouns'
														onChange={(e) => setCustomPronouns(e.target.value)}
													/>
												)}
											</FormControl>
											{
												<FormControl variant='outlined' style={{ marginBottom: 35, flex: 1, marginTop: 10 }}>
													<InputLabel id='demo-simple-select-outlined-label'>Role</InputLabel>
													<Select
														labelId='demo-simple-select-outlined-label'
														label='Role'
														id='demo-simple-select-outlined'
														defaultValue='user'
														value={data?.role || 'user'}
														name='role'
														style={{ marginBottom: 10, width: 250 }}
														onChange={handleChange}
													>
														{isAdmin && <MenuItem value={'admin'}>Admin</MenuItem>}
														<MenuItem value={'user'}>User</MenuItem>
													</Select>
												</FormControl>
											}
										</Box>
									</Box>

									{isMissingFirstName && (
										<Typography
											size={'sm'}
											style={{ width: 220, position: 'center', color: 'red' }}
										>
											Please enter your first name.
										</Typography>
									)}
									<TextField
										label='Name'
										variant='outlined'
										defaultValue='Name'
										value={data?.firstName || ''}
										name='firstName'
										onChange={handleChange}
										style={{ marginBottom: 10 }}
									/>
									{isMissingLastName && (
										<Typography
											size={'sm'}
											style={{ width: 220, position: 'center', color: 'red' }}
										>
											Please enter your last name.
										</Typography>
									)}
									<TextField
										label='Last Name'
										variant='outlined'
										defaultValue={'Last Name'}
										value={data?.lastName || ''}
										name='lastName'
										onChange={handleChange}
										style={{ marginBottom: 35 }}
									/>
									<TextField
										label='Phone'
										variant='outlined'
										style={{ marginBottom: 10 }}
										defaultValue={''}
										value={data?.phone || ''}

										name='phone'
										onChange={handleChange}
									/>
									<TextField
										label='Email'
										variant='outlined'
										style={{ marginBottom: 35 }}
										type={'email'}
										defaultValue={''}
										value={data && data.email}
										name='email'
										onChange={handleChange}
										disabled
									/>

									{/* {isMissingBiography && (
										<Typography
											size={'sm'}
											style={{ width: 220, position: 'center', color: 'red' }}
										>
											Please enter a short bio (256 characters).
										</Typography>
									)} */}
									<Box display={'flex'} flexDirection={'column'} justifyContent={'left'} alignItems={'center'} style={{ marginBottom: 5 }}>
										<TextField
											label='Biography'
											variant='outlined'
											style={{ marginBottom: 10, width: '100%' }}
											defaultValue={''}
											value={data?.biography || ''}
											name='biography'
											//onChange={handleBiographyChange}
											inputProps={{ maxLength: 256 }}
											multiline
											rows={4}
										/>
										{/* <Typography
											size={'sm'}
											style={{
												width: 220,
												position: 'center',
												color: data.biography.length > 200 ? 'red' : 'black',
											}}
										>
											{256 - data.biography.length} characters left
										</Typography> */}
									</Box>
								</>
							) : !isGoogleUser && tab === 1 ? (
								<>
									<Typography
										variant={'h5'}
										weight={'medium'}
										style={{ marginBottom: 35 }}
									>
										Password
									</Typography>
									<TextField
										label='Current Password'
										type='password'
										variant='outlined'
										style={{ marginBottom: 35 }}
										defaultValue={'Current Password'}
										value={password.currentPassword || ''}
										name='currentPassword'
										onChange={handleChangePassword}
									/>
									<TextField
										label='New Password'
										type='password'
										variant='outlined'
										style={{ marginBottom: 35 }}
										defaultValue={'New Password'}
										value={password.newPassword || ''}
										name='newPassword'
										onChange={handleChangePassword}
									/>
									<TextField
										label='Confirm Password'
										type='password'
										variant='outlined'
										style={{ marginBottom: 35 }}
										defaultValue={'Verify Password'}
										value={password.confirmPassword || ''}
										name='confirmPassword'
										onChange={handleChangePassword}
									/>
								</>
							) : tab === 2 ? (
								<>
									<Typography
										variant={'h5'}
										weight={'medium'}
										style={{ marginBottom: 35 }}
									>
										Settings
									</Typography>
									<FormControl variant='outlined' style={{ marginBottom: 35 }}>
										<Select
											labelId='demo-simple-select-outlined-label'
											id='demo-simple-select-outlined'
											value={10}
										>
											<MenuItem value={10}>English</MenuItem>
											<MenuItem value={20}>Admin</MenuItem>
											<MenuItem value={30}>Super Admin</MenuItem>
										</Select>
									</FormControl>
									<Typography weight={'bold'}>Communication:</Typography>
									<Box display={'flex'}>
										<FormControlLabel
											control={
												<Checkbox checked name='checkedB' color='secondary' />
											}
											label='Email'
										/>
										<FormControlLabel
											control={<Checkbox name='checkedB' color='secondary' />}
											label='Messages'
										/>
										<FormControlLabel
											control={<Checkbox name='checkedB' color='secondary' />}
											label='Phone'
										/>
									</Box>
									<Box display={'flex'} mt={2} alignItems={'center'}>
										<Typography weight={'medium'}>
											Email notification
										</Typography>
										<Switch color={'primary'} checked />
									</Box>
									<Box display={'flex'} mt={2} mb={2} alignItems={'center'}>
										<Typography weight={'medium'}>
											Send copy to personal email
										</Typography>
										<Switch color={'primary'} />
									</Box>
								</>
							) : null}
							{editable && (
								<Box display={'flex'} justifyContent={'space-between'}>
									{tab !== 1 ? (
										<>
											<Button variant={'outlined'} color={'primary'}>
												Reset
											</Button>
											<Button variant={'contained'} onClick={handleSubmit}>
												Save
											</Button>
										</>
									) : (
										<>
											<Button variant={'outlined'} color={'primary'}>
												Reset
											</Button>
											<Button
												variant={'contained'}
												onClick={handleUpdatePassword}
											>
												Save Password
											</Button>
										</>
									)}
								</Box>
							)}
						</Box>
					</Grid>
				</Widget>
			</Grid>
		</Grid>
	);
};

export default EditUser;
