import {Box, Button, IconButton, Menu, MenuItem, styled, Tooltip, Typography} from '@mui/material';
import {PreviousPage} from '../../../../../common/components/previousPage/PreviousPage';
import {ModalEditAddPack} from '../../../packsList/components/modalPack/ModalPack';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import packDecoy from '../../../../../assets/images/packDecoy.png';
import {ModalAddEditCard} from '../modalPack/ModalWorkWithCards';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks';
import {SearchField} from './search/SearchField';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {PATH} from '../../../../pages/Pages';
import React, {useEffect} from 'react';
import {setDeckCover} from '../../mypack-reducer';

type MyPackNavbarPropsType = {
    disabledBut: boolean
}

export const MyPackNavbar: React.FC<MyPackNavbarPropsType> = ({disabledBut}) => {

    const packDeckCover = useAppSelector(state => state.myPack.packDeckCover)
    const currentUserId = useAppSelector(state => state.packs.currentUserId)
    const packUserId = useAppSelector(state => state.myPack.packCreatorId)
    const packId = useAppSelector(state => state.myPack.cardsPackId)
    const packName = useAppSelector(state => state.myPack.packName)

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const pack = searchParams.get('pack') || ''

    useEffect(() => {
        if (packId === 'deleted') {
            navigate(PATH.PACKSLIST)
        }
        return () => {
            dispatch(setDeckCover(''))
        }
    }, [packId])

    const menuMypack: { title: string, link: string, icon: JSX.Element }[] = [
        {
            title: 'Edit',
            link: '',
            icon: <label style={{
                display: 'flex',
                alignItems: 'center', cursor: 'pointer', color: 'var(--text-color1)', height: '25px'
            }}><ModalEditAddPack icon={'Edit'} packId={packId} name={packName}/>Edit</label>
        },
        {
            title: 'Delete',
            link: PATH.PACKSLIST,
            icon: <label style={{
                display: 'flex',
                alignItems: 'center', cursor: 'pointer', color: 'var(--text-color1)', height: '25px'
            }}><ModalEditAddPack icon={'Delete'} packId={packId} page={'myPack'}/>Delete</label>
        },
        {
            title: 'Learn',
            link: PATH.LEARNPACK,
            icon: <label style={{
                display: 'flex',
                alignItems: 'center', cursor: 'pointer', color: 'var(--text-color1)', height: '25px'
            }}><IconButton><SchoolOutlinedIcon color={'action'}/></IconButton>Learn</label>
        },
    ];
    const handleOpenPackMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleClosePackMenu = (action: { title: string, link: string, icon: JSX.Element }) => {
        return () => {
            if (action.title === 'Learn') {
                navigate(action.link)
            }
            setAnchorElUser(null);
        }
    };
    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{marginTop: '-40px'}}>
                <PreviousPage routeNavigate={PATH.PACKSLIST} title={'Back to packlist'}/>
            </Box>
            {
                packDeckCover && packDeckCover !== '' && packDeckCover !== 'url or base64'
                    ? <img src={packDeckCover} alt="" style={{width: '150px'}}/>
                    : <img src={packDecoy} alt="deckCoverDefault" style={{width: '150px'}}/>
            }
            <NavBarBoxWrapper>
                <Box>
                    <b style={{fontSize: '20px', color: 'var(--text-color1)'}} onClick={handleOpenPackMenu}>{
                        currentUserId === packUserId || pack === 'My pack'
                            ? <span>My pack: <i>{packName}</i></span>
                            : <span>Friends pack: <i>{packName}</i></span>
                    }</b>
                    <Tooltip title="Open settings">
                        {
                            currentUserId === packUserId || pack === 'My pack'
                                ? <IconButton size={'small'} onClick={handleOpenPackMenu}>
                                    <MoreVertRoundedIcon/>
                                </IconButton>
                                : <></>
                        }
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
                        {
                            menuMypack.map((navLink, index) => (
                                <MenuItem key={index} onClick={handleClosePackMenu(navLink)}>
                                    {navLink.icon}
                                    <Typography textAlign="center"
                                                sx={{margin: '0 0 0 5px'}}></Typography>
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </Box>
                {
                    currentUserId === packUserId || pack === 'My pack'
                        ? <ModalAddEditCard disabled={disabledBut} icon={'addButton'}/>
                        : <BtnLearnPack
                            variant={'contained'}
                            onClick={() => navigate(PATH.LEARNPACK)}>Learn to pack</BtnLearnPack>
                }
            </NavBarBoxWrapper>
            <Typography style={{fontSize: '14px', marginTop: '28px', color: 'var(--text-color1)'}}>
                Search
            </Typography>
            <Box sx={{width: '100%'}}><SearchField/></Box>
        </>
    )
}

export const NavBarBoxWrapper = styled(Box)(({theme}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
}));
export const BtnLearnPack = styled(Button)(({theme}) => ({
    borderRadius: '30px',
    width: '184px',
    height: '36px',

    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
       padding: '20px'
    },
}));
