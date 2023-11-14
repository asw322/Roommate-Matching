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

import EditUser from '../../pages/EditUser/EditUser';
import Login from "../../pages/login/Login";

// pages
import AdminDashboard from '../../pages/AdminDashboard/AdminDashboard'
import BreadCrumbs from '../BreadCrumbs'

// context
import { useLayoutState } from '../../context/LayoutContext'

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import LocationpreferenceFormPage from 'pages/CRUD/Locationpreference/form/LocationpreferenceFormPage';
import LocationpreferenceTablePage from 'pages/CRUD/Locationpreference/table/LocationpreferenceTablePage';

import UsersurveyFormPage from 'pages/CRUD/Usersurvey/form/UsersurveyFormPage';
import UsersurveyTablePage from 'pages/CRUD/Usersurvey/table/UsersurveyTablePage';

import UserpreferenceFormPage from 'pages/CRUD/Userpreference/form/UserpreferenceFormPage';
import UserpreferenceTablePage from 'pages/CRUD/Userpreference/table/UserpreferenceTablePage';

import UserquestionweightFormPage from 'pages/CRUD/Userquestionweight/form/UserquestionweightFormPage';
import UserquestionweightTablePage from 'pages/CRUD/Userquestionweight/table/UserquestionweightTablePage';

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
                    <Route path="/admin/dashboard" component={AdminDashboard} />
                    <Route path="/admin/user/edit" component={EditUser} />
                    <Route
                      path={'/admin/api-docs'}
                      exact
                      component={(props) => <Redirect url={process.env.NODE_ENV === 'production'
                        ? window.location.origin + '/api-docs'
                        : 'http://localhost:8080/api-docs'} {...props}/>}
                    />

                    <Route path={"/admin/users"} exact component={UsersTablePage} />
                    <Route path={"/admin/users/new"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id/edit"} exact component={UsersFormPage} />

                    <Route path={"/admin/locationpreference"} exact component={LocationpreferenceTablePage} />
                    <Route path={"/admin/locationpreference/new"} exact component={LocationpreferenceFormPage} />
                    <Route path={"/admin/locationpreference/:id/edit"} exact component={LocationpreferenceFormPage} />

                    <Route path={"/admin/usersurvey"} exact component={UsersurveyTablePage} />
                    <Route path={"/admin/usersurvey/new"} exact component={UsersurveyFormPage} />
                    <Route path={"/admin/usersurvey/:id/edit"} exact component={UsersurveyFormPage} />

                    <Route path={"/admin/userpreference"} exact component={UserpreferenceTablePage} />
                    <Route path={"/admin/userpreference/new"} exact component={UserpreferenceFormPage} />
                    <Route path={"/admin/userpreference/:id/edit"} exact component={UserpreferenceFormPage} />

                    <Route path={"/admin/userquestionweight"} exact component={UserquestionweightTablePage} />
                    <Route path={"/admin/userquestionweight/new"} exact component={UserquestionweightFormPage} />
                    <Route path={"/admin/userquestionweight/:id/edit"} exact component={UserquestionweightFormPage} />

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
