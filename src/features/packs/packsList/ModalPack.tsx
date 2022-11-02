import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useAppDispatch} from "../../../app/hooks";
import {IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {createPack, deletePack, editPack} from "./packsList-reducer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {deletePackOnMyPage} from "../myPack/mypack-reducer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ModalAddEditCardPropsType = {
    icon: 'Edit' | 'Add new pack' | 'Delete'
    packId?: string
    name?: string
    page?: 'myPack' | 'packlist'
}

export const ModalEditAddPack = (props: ModalAddEditCardPropsType) => {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const [packNameTextField, setPackNameTextField] = useState(props.name ? props.name : "");

    useEffect(() => {
        setPackNameTextField(props.name ? props.name : "")
    }, [open]);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postNewPack = async () => {
        if (props.icon === 'Edit' && props.packId) {
            await dispatch(editPack({name: packNameTextField, _id: props.packId}))
        }
        if (props.icon === 'Add new pack') {
            await dispatch(createPack({name: packNameTextField, private: false}))
        }
        if (props.icon === 'Delete' && props.packId) {
            props.page === 'packlist' ?
                await dispatch(deletePack(props.packId))
                : await dispatch(deletePackOnMyPage(props.packId))
        }

        handleClose()
    }

    return (
        <div>
            {props.icon === 'Add new pack' ? <Button
                sx={{borderRadius: '30px', width: '184px', height: '36px'}} variant={'contained'}
                onClick={handleOpen}>Add new Pack</Button> : <></>}
            {props.icon === 'Edit' ? <IconButton onClick={handleOpen}><BorderColorOutlinedIcon/></IconButton> : <></>}
            {props.icon === 'Delete' ? <IconButton onClick={handleOpen}><DeleteOutlineIcon/></IconButton> : <></>}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{fontSize: '18px', color: '#000000'}}>
                        <b> {props.icon} </b> <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                    </Typography>
                    <hr/>
                    {props.icon === 'Delete' ? 'Do you really want to remove this pack? ' +
                        'All cards will be deleted'
                        : <TextField onChange={(e) => setPackNameTextField(e.currentTarget.value)} id="standard-basic"
                                     value={packNameTextField} label="Name pack" variant="standard" size={'medium'}/>
                    }
                    <br/>
                    <Button
                        sx={{
                            marginTop: '20px', borderRadius: '30px', width: '180px', height: '36px'
                        }}
                        variant={'contained'}
                        color="inherit"
                        onClick={handleClose}>Cancel</Button>
                    <Button
                        sx={{
                            marginTop: '20px', borderRadius: '30px', width: '180px', height: '36px'
                        }}
                        variant={'contained'}
                        color={props.icon === 'Delete' ? 'error' : 'primary'}
                        onClick={postNewPack}>{props.icon}</Button>
                </Box>
            </Modal>
        </div>
    )
}

