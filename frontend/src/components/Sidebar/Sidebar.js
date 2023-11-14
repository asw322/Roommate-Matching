import React, { useState, useEffect, useMemo } from "react";
import { ArrowBack as ArrowBackIcon, Folder } from "@mui/icons-material";
import { Drawer, IconButton, List } from "@mui/material";
import { useTheme } from '@mui/material';
import { withRouter } from "react-router-dom";
import classNames from "classnames";

import {
	Home as HomeIcon,
	Apps as CoreIcon,
	Description as DocumentationIcon,
	AccountCircle as ProfileIcon,
} from '@mui/icons-material'
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';

// styles
import useStyles from "./styles";
import useStyles2 from "./components/SidebarLink/styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";



// context
import {
	useManagementDispatch,
	useManagementState,
} from '../../context/ManagementContext';
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar
} from "../../context/LayoutContext";

function Sidebar({ location, structure }) {
	let classes = useStyles();
	//let classes2 = useStyles2()
	let theme = useTheme();

	const toggleDrawer = value => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		if (value && !isPermanent) toggleSidebar(layoutDispatch);
	};


	// global
	let { isSidebarOpened } = useLayoutState();
	let layoutDispatch = useLayoutDispatch();
	const managementDispatch = useManagementDispatch();
	const managementValue = useManagementState();

	// local
	let [isPermanent, setPermanent] = useState(true);

	// get user
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		setCurrentUser(managementValue.currentUser);
	}, [managementDispatch, managementValue]);

	// setup sidebar
	const isSidebarOpenedWrapper = useMemo(() => !isPermanent ? !isSidebarOpened : isSidebarOpened, [isPermanent, isSidebarOpened]);

	const isAdmin = currentUser && currentUser.role === 'admin';

	useEffect(function () {
		window.addEventListener("resize", handleWindowWidthChange);
		handleWindowWidthChange();
		return function cleanup() {
			window.removeEventListener("resize", handleWindowWidthChange);
		};
	});

	return (
		<Drawer
			variant={isPermanent ? "permanent" : "temporary"}
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: isSidebarOpenedWrapper,
				[classes.drawerClose]: !isSidebarOpenedWrapper
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: isSidebarOpenedWrapper,
					[classes.drawerClose]: !isSidebarOpenedWrapper
				})
			}}
			open={isSidebarOpenedWrapper}
			onClose={toggleDrawer(true)}
		>

			<div className={classes.toolbar} />
			<div className={classes.mobileBackButton}>
				<IconButton onClick={() => toggleSidebar(layoutDispatch)}>
					<ArrowBackIcon
						classes={{
							root: classNames(classes.headerIcon, classes.headerIconCollapse)
						}}
					/>
				</IconButton>
			</div>
			<List
				className={classes.sidebarList}
				classes={{ padding: classes.padding }}
			><SidebarLink
					label='Home'
					link={`/user/home`}
					location={location}
					isSidebarOpened={isSidebarOpenedWrapper}
					icon={<HomeIcon />}
					toggleDrawer={toggleDrawer(true)}
				/>
				<SidebarLink
					label='Edit User'
					link={`/user/edit`}
					location={location}
					isSidebarOpened={isSidebarOpenedWrapper}
					icon={<EditIcon />}
					toggleDrawer={toggleDrawer(true)}
				/>
				{isAdmin &&
					<SidebarLink
						label="Admin Dashboard"
						link="/admin/dashboard"
						location={location}
						isSidebarOpened={isSidebarOpenedWrapper}
						icon={<FolderIcon />}
						toggleDrawer={toggleDrawer(true)}
						children={[
							{
								label: "Users",
								link: "/admin/users",
							},
							{
								label: "Location Preference",
								link: "/admin/locationpreference",
							},
							{
								label: "User Survey",
								link: "/admin/usersurvey",
							},
							{
								label: "User Preference",
								link: "/admin/userpreference",
							},
							{
								label: "User Question Weight",
								link: "/admin/userquestionweight",
							},
							{
								label: "User Selections",
								link: "/admin/usersurvey",
							},
						]}
					/>
				}


				{isAdmin && <SidebarLink
					label="Documentation"
					link="/documentation"
					location={location}
					isSidebarOpened={isSidebarOpenedWrapper}
					icon={<DocumentationIcon />}
					toggleDrawer={toggleDrawer(true)}
					children={[
						{
							label: "Getting Started",
							link: "/documentation/getting-started",
							children: [
								{
									label: "Quick start",
									link: "/documentation/getting-started/quick-start"
								}
							]
						},
						{
							label: "Components",
							link: "/documentation/components",
							children: [
								{
									label: "Typography",
									link: "/documentation/components/typography"
								},
								{
									label: "Header",
									link: "/documentation/components/header"
								},
								{
									label: "Sidebar",
									link: "/documentation/components/sidebar"
								},
								{
									label: "Buttons",
									link: "/documentation/components/buttons"
								},
							]
						},
					]}
				/>
				}

				{isAdmin && <SidebarLink
					label='API docs'
					link='/admin/api-docs'
					location={location}
					isSidebarOpened={isSidebarOpenedWrapper}
					icon={<DocumentationIcon />}
					toggleDrawer={toggleDrawer(true)}
				/>}
			</List>
		</Drawer>
	);

	// ##################################################################
	function handleWindowWidthChange() {
		let windowWidth = window.innerWidth;
		let breakpointWidth = theme.breakpoints.values.md;
		let isSmallScreen = windowWidth < breakpointWidth;

		if (isSmallScreen && isPermanent) {
			setPermanent(false);
		} else if (!isSmallScreen && !isPermanent) {
			setPermanent(true);
		}
	}
}

export default withRouter(Sidebar);
