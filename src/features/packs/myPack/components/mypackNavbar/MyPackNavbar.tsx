import React, {useEffect} from 'react';
import {Box, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import {useAppSelector} from '../../../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {ModalEditAddPack} from '../../../packsList/components/modalPack/ModalPack';
import style from '../../myPack.module.scss';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import {ModalAddEditCard} from '../modalPack/ModalWorkWithCards';
import {PATH} from '../../../../pages/Pages';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import {CardPackType} from '../../../../../api/packAPI';
import {SearchField} from './search/SearchField';

type MyPackNavbarPropsType = {
    disabledBut: boolean
}

export const MyPackNavbar: React.FC<MyPackNavbarPropsType> = ({disabledBut}) => {

    const navigate = useNavigate()
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const packId = useAppSelector(state => state.myPack.idOfCardsPack)

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
            return ''
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
            link: PATH.PACKSLIST,
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
                navigate(PATH.LEARNPACK)
            }
            setAnchorElUser(null);
        }
    };
    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <div className={style.headWithBut}>
                <Box sx={{flexGrow: 0}}>
                    <b style={{fontSize: '20px'}} onClick={handleOpenPackMenu}>My pack: {packName}</b>
                    <Tooltip title="Open settings">
                        <IconButton size={'small'} onClick={handleOpenPackMenu}>
                            <MoreVertRoundedIcon/>
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
                        {menuMypack.map((navLink, index) => (
                            <MenuItem key={index} onClick={handleClosePackMenu(navLink)}>
                                {navLink.icon}
                                <Typography textAlign="center"
                                            sx={{margin: '0 0 0 5px'}}></Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <ModalAddEditCard disabled={disabledBut} icon={'addButton'}/>
            </div>
            <span style={{fontSize: '14px', marginTop: '28px'}}>
                    Search
                </span>
            <SearchField/>
        </>
    )
}