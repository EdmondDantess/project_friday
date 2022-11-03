import React from 'react';
import {useLocation, useNavigate, useRoutes} from 'react-router-dom';
import {Avatar, Box, Button, CircularProgress, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import styles from './pageNavigation.module.scss';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ErrorSnackbar} from '../../common/components/errorSnackbar/ErrorSnackbar';
import {logoutTC} from '../profile/profile-reducer';
import {PATH} from '../pages/Pages';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const userMenuElements: { title: string, componentLink: string, icon: JSX.Element }[] = [
    {
        title: 'Profile',
        componentLink: PATH.PROFILE,
        icon: <PersonOutlineIcon/>
    },
    {
        title: 'Packs',
        componentLink: PATH.PACKSLIST,
        icon: <InventoryIcon/>
    },
    {
        title: 'Logout',
        componentLink: PATH.LOGIN,
        icon: <LogoutRoundedIcon/>
    },
];

export const PageNavigation = () => {

    const circularEntity = useAppSelector(state => state.userFeedback.circularEntity)
    const isLogged = useAppSelector(state => state.profile.isLogged)
    const avatar = useAppSelector(state => state.profile.avatar)
    const name = useAppSelector(state => state.profile.name)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    let routesButtonHead = useRoutes([
        {path: PATH.LOGIN, element: <span>Sign up</span>},
        {path: '*', element: <span>Sign in</span>},
    ])

    const redirectsLoginHandler = () => {
        location.pathname === `${PATH.LOGIN}` ? navigate(PATH.REGISTRATION) : navigate(PATH.LOGIN)
    }

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (link: string) => {
        return () => {
            if (link === PATH.LOGIN) {
                dispatch(logoutTC())
            }
            setAnchorElUser(null);
            navigate(link)
        }
    };

    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className={styles.AppNavBar}>
            <div className={styles.logoContainer} onClick={() => navigate(PATH.PACKSLIST)}>
                <div className={styles.itIncubLogo}></div>
            </div>
            <div className={styles.buttonLogContainer}>
                {
                    isLogged ?
                        <div className={styles.divProfileHeader}
                        >
                            <b style={{margin: '5px 10px 0 0 '}} onClick={handleOpenUserMenu}>{name}
                                <hr/>
                            </b>
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt={name !== '' ? name : 'fail'} src={avatar}
                                                sx={{width: 36, height: 36}}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
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
                                    onClose={handleCloseMenu}
                                >
                                    {userMenuElements.map((navLink, index) => (
                                        <MenuItem key={index} onClick={handleCloseUserMenu(navLink.componentLink)}>
                                            {navLink.icon}
                                            <Typography textAlign="center"
                                                        sx={{margin: '0 0 0 5px'}}>{navLink.title}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </div>

                        : <Button type={'submit'}
                                  variant={'contained'}
                                  color={'primary'}
                                  className={styles.buttonLog}
                                  onClick={redirectsLoginHandler}
                        > {routesButtonHead}</Button>
                }
            </div>

            <ErrorSnackbar/>

            {circularEntity && <CircularProgress className={styles.progress}/>}

        </div>
    );
}