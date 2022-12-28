import {Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import {PreviousPage} from '../../../../../common/components/previousPage/PreviousPage';
import {ModalEditAddPack} from '../../../packsList/components/modalPack/ModalPack';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import {ModalAddEditCard} from '../modalPack/ModalWorkWithCards';
import {CardPackType} from '../../../../../api/packAPI';
import {useAppSelector} from '../../../../../app/hooks';
import {SearchField} from './search/SearchField';
import {useNavigate} from 'react-router-dom';
import style from '../../myPack.module.scss';
import {PATH} from '../../../../pages/Pages';
import React, {useEffect} from 'react';

type MyPackNavbarPropsType = {
    disabledBut: boolean
}

export const MyPackNavbar: React.FC<MyPackNavbarPropsType> = ({disabledBut}) => {

    const currentUserId = useAppSelector(state => state.packs.currentUserId)
    const packUserId = useAppSelector(state => state.myPack.packCreatorId)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const packId = useAppSelector(state => state.myPack.cardsPackId)

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate()

    useEffect(() => {
        if (packId === 'deleted') {
            navigate(PATH.PACKSLIST)
        }
    }, [packId])

    const findPackName = () => {
        let currentCardPack = cardPacks.find((p: CardPackType) => p._id === packId)
        if (currentCardPack) {
            return currentCardPack.name
        } else {
            return
        }
    }
    const packName = findPackName()
    const menuMypack: { title: string, link: string, icon: JSX.Element }[] = [
        {
            title: 'Edit',
            link: '',
            icon: <label style={{
                display: 'flex',
                alignItems: 'center', cursor: 'pointer', color: 'black', height: '25px'
            }}><ModalEditAddPack icon={'Edit'} packId={packId} name={packName}/>Edit</label>
        },
        {
            title: 'Delete',
            link: PATH.PACKSLIST,
            icon: <label style={{
                display: 'flex',
                alignItems: 'center', cursor: 'pointer', color: 'black', height: '25px'
            }}><ModalEditAddPack icon={'Delete'} packId={packId} page={'myPack'}/>Delete</label>
        },
        {
            title: 'Learn',
            link: PATH.LEARNPACK,
            icon: <label style={{
                display: 'flex',
                alignItems: 'center', cursor: 'pointer', color: 'black', height: '25px'
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
            <PreviousPage routeNavigate={PATH.PACKSLIST} title={'Back to packlist'}/>
            <div className={style.headWithBut}>
                <Box sx={{flexGrow: 0}}>
                    <b style={{fontSize: '20px'}} onClick={handleOpenPackMenu}>{
                        currentUserId === packUserId ?
                            <span>My pack: <i>{packName}</i></span> :
                            <span>Friends pack: <i>{packName}</i></span>
                    }</b>
                    <Tooltip title="Open settings">
                        {
                            currentUserId === packUserId ?
                                <IconButton size={'small'} onClick={handleOpenPackMenu}>
                                    <MoreVertRoundedIcon/>
                                </IconButton> : <></>
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
                        {menuMypack.map((navLink, index) => (
                            <MenuItem key={index} onClick={handleClosePackMenu(navLink)}>
                                {navLink.icon}
                                <Typography textAlign="center"
                                            sx={{margin: '0 0 0 5px'}}></Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                {
                    currentUserId === packUserId ? <ModalAddEditCard disabled={disabledBut} icon={'addButton'}/>
                        : <Button
                            sx={{borderRadius: '30px', width: '184px', height: '36px'}} variant={'contained'}
                            onClick={() => navigate(PATH.LEARNPACK)}>Learn to pack</Button>
                }
            </div>
            <span style={{fontSize: '14px', marginTop: '28px'}}>
                    Search
                </span>
            <SearchField/>
        </>
    )
}