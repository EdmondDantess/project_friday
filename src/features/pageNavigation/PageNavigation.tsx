import React from "react";
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logoutTC} from "../profile/profile-reducer";
import {PATH} from "../pages/Pages";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {ThemeSwitch} from "../../common/components/themeSwitch/ThemeSwitch";
import Logo from "../../assets/logo.svg"
import logoWhite from "../../assets/logoWhite.svg"

const userMenuElements: { title: string, componentLink: string, icon: JSX.Element }[] = [
    {
        title: "Profile",
        componentLink: PATH.PROFILE,
        icon: <PersonOutlineIcon/>
    },
    {
        title: "Packs",
        componentLink: PATH.PACKSLIST,
        icon: <InventoryIcon/>
    },
    {
        title: "Logout",
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
        {path: "*", element: <span>Sign in</span>},
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
        <>
            {/*<div className={styles.AppNavBar}>*/}
            {/*    <div className={styles.logoContainer} onClick={() => navigate(PATH.PROFILE)}>*/}
            {/*        <div className={styles.itIncubLogo}></div>*/}
            {/*    </div>*/}
            {/*    <div className={styles.buttonLogContainer}>*/}
            {/*        {*/}
            {/*            isLogged*/}
            {/*                ?*/}
            {/*                <div className={styles.divProfileHeader}*/}
            {/*                >*/}
            {/*                    <ThemeSwitch/>*/}
            {/*                    <b style={{margin: "5px 10px 0 0 "}} onClick={handleOpenUserMenu}>{name}*/}
            {/*                        <hr/>*/}
            {/*                    </b>*/}
            {/*                    <Box sx={{flexGrow: 0}}>*/}
            {/*                        <Tooltip title="Open settings">*/}
            {/*                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>*/}
            {/*                                <Avatar alt={name !== "" ? name : "fail"}*/}
            {/*                                        src={avatar ? avatar : "https://bit.ly/3CKLqoF"}*/}
            {/*                                        sx={{width: 36, height: 36}}/>*/}
            {/*                            </IconButton>*/}
            {/*                        </Tooltip>*/}
            {/*                        <Menu*/}
            {/*                            sx={{mt: "45px"}}*/}
            {/*                            id="menu-appbar"*/}
            {/*                            anchorEl={anchorElUser}*/}
            {/*                            anchorOrigin={{*/}
            {/*                                vertical: "top",*/}
            {/*                                horizontal: "right",*/}
            {/*                            }}*/}
            {/*                            keepMounted*/}
            {/*                            transformOrigin={{*/}
            {/*                                vertical: "top",*/}
            {/*                                horizontal: "right",*/}
            {/*                            }}*/}
            {/*                            open={Boolean(anchorElUser)}*/}
            {/*                            onClose={handleCloseMenu}*/}
            {/*                        >*/}
            {/*                            {userMenuElements.map((navLink, index) => (*/}
            {/*                                <MenuItem key={index} onClick={handleCloseUserMenu(navLink.componentLink)}>*/}
            {/*                                    {navLink.icon}*/}
            {/*                                    <Typography textAlign="center"*/}
            {/*                                                sx={{margin: "0 0 0 5px"}}>{navLink.title}</Typography>*/}
            {/*                                </MenuItem>*/}
            {/*                            ))}*/}
            {/*                        </Menu>*/}
            {/*                    </Box>*/}
            {/*                </div>*/}

            {/*                : <>*/}
            {/*                    <ThemeSwitch/>*/}
            {/*                    <Button type={"submit"}*/}
            {/*                            variant={"contained"}*/}
            {/*                            color={"primary"}*/}
            {/*                            className={styles.buttonLog}*/}
            {/*                            onClick={redirectsLoginHandler}*/}
            {/*                    >{routesButtonHead}</Button>*/}
            {/*                </>*/}
            {/*        }*/}
            {/*    </div>*/}

            {/*    <ErrorSnackbar/>*/}

            {/*    {circularEntity && <CircularProgress className={styles.progress}/>}*/}

            {/*</div>*/}
            <ResponsiveAppBar/>
        </>
    );
}

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {

    const circularEntity = useAppSelector(state => state.userFeedback.circularEntity)
    const isLogged = useAppSelector(state => state.profile.isLogged)
    const avatar = useAppSelector(state => state.profile.avatar)
    const name = useAppSelector(state => state.profile.name)

    const paletteMode = useAppSelector((state) => state.userFeedback.paletteMode);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    let routesButtonHead = useRoutes([
        {path: PATH.LOGIN, element: <span>Sign up</span>},
        {path: "*", element: <span>Sign in</span>},
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
        <AppBar position="static" sx={{backgroundColor: "var(--bg1)", backgroundImage: "none", height: "60px"}}>
            <NavbarContainer sx={{height: "60px"}}>
                <Toolbar disableGutters>
                    {
                        paletteMode === "light"
                            ? <Box
                                component={"img"}
                                sx={{
                                    width: "50px",
                                    height: "50px",
                                    color: "var(--text-color1)",
                                    mb: "5px",
                                    mr: "10px",
                                }}
                                alt={"Quiz Logo"}
                                src={Logo}/>

                            : <Box
                                component={"img"}
                                sx={{
                                    width: "50px",
                                    height: "50px",
                                    color: "var(--text-color1)",
                                    mb: "5px",
                                    mr: "10px",
                                }}
                                alt={"Quiz Logo"}
                                src={logoWhite}
                            />
                    }
                    <Typography
                        variant="h6"
                        // noWrap
                        component="a"
                        href="/"
                        sx={{
                            width: "90px",
                            mr: 2,
                            display: {xs: 'none', sm: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: "var(--text-color1)",
                            textDecoration: 'none',
                        }}
                    >
                        QUIZ
                    </Typography>

                    <Box sx={{flex: "1 1 100%"}}/>

                    <Box sx={{flexGrow: 0}}>
                        {
                            isLogged
                                ?
                                <Box sx={{display: "flex"}}>
                                    <ThemeSwitch/>
                                    <Typography
                                        onClick={handleOpenUserMenu}
                                        noWrap
                                        sx={{
                                            mr: "10px",
                                            width: "120px",
                                            fontWeight: 700,
                                            textDecoration: "underline",

                                            cursor: "pointer",
                                            color: "var(--text-color1)",

                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {name.length > 11 ? `${name.slice(0, 11)}...` : name}
                                    </Typography>
                                    <Box sx={{flexGrow: 0}}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                <Avatar alt={name !== "" ? name : "fail"}
                                                        src={avatar ? avatar : "https://bit.ly/3CKLqoF"}
                                                        sx={{width: 36, height: 36}}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{mt: "45px"}}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseMenu}
                                        >
                                            {userMenuElements.map((navLink, index) => (
                                                <MenuItem key={index}
                                                          onClick={handleCloseUserMenu(navLink.componentLink)}>
                                                    {navLink.icon}
                                                    <Typography textAlign="center"
                                                                sx={{margin: "0 0 0 5px"}}>{navLink.title}</Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                </Box>
                                : <Box sx={{display: "flex"}}>
                                    <ThemeSwitch/>
                                    <Button type={"submit"}
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={redirectsLoginHandler}
                                            sx={{height: "36px", width: "114px"}}
                                    >{routesButtonHead}</Button>
                                </Box>
                        }
                    </Box>
                </Toolbar>
            </NavbarContainer>
        </AppBar>
    );
}

export const NavbarContainer = styled(Container)(({theme}) => ({
    backgroundColor: "var(--bg1)",

    maxWidth: theme.breakpoints.values.lg,
    [theme.breakpoints.down("lg")]: {
        maxWidth: theme.breakpoints.values.md,
    },
    [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
    },
}));

export default ResponsiveAppBar;

