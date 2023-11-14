import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import classnames from 'classnames'

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import {
    Fab,
    IconButton
} from '@mui/material'
import { connect } from 'react-redux';
// styles
import useStyles from './styles'

// components
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import { Link } from '../Wrappers/Wrappers'
import ColorChangeThemePopper from './components/ColorChangeThemePopper'



// pages
import BreadCrumbs from '../BreadCrumbs'
import UserDashboard from '../../pages/UserDashboard/UserDashboard';
import EditUser from '../../pages/EditUser/EditUser';
import ViewUserProfile from '../../pages/ViewUserProfile/ViewUserProfile';
import Login from "../../pages/login/Login";

// context
import { useLayoutState } from '../../context/LayoutContext'


const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url))
  return <span>Redirecting...</span>;
}

function Layout(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    // global
    let layoutState = useLayoutState()

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Sidebar />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <BreadCrumbs />
                <Switch>
					<Route path="/user/home" component={UserDashboard} />
                    <Route path="/user/edit" component={EditUser} />
					<Route path="/user/:id/profile" exact component={ViewUserProfile} /> 
                </Switch>
				<Fab
                    color="primary"
                    aria-label="settings"
                    onClick={e => handleClick(e)}
                    className={classes.changeThemeFab}
                    style={{ zIndex: 100 }}
                >
                    <SettingsIcon style={{ color: '#fff' }} />
                </Fab>
                <ColorChangeThemePopper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                />
                {/* <Footer>
                    <div>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Flatlogic
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/about'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            About Us
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/blog'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Blog
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={'https://www.facebook.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="facebook">
                              <FacebookIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://twitter.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="twitter">
                              <TwitterIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://github.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton
                                aria-label="github"
                                style={{ padding: '12px 0 12px 12px' }}
                            >
                              <GithubIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                    </div>
                </Footer> */}
            </div>
        </div>
    )
}

export default withRouter(connect()(Layout))
