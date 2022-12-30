import React, {ChangeEvent, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {Dialog, DialogActions, DialogContent, DialogContentText, IconButton, styled, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {createPack, deletePack, editPack} from "../../packsList-reducer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {deletePackOnMyPage} from "../../../myPack/mypack-reducer";

const style = {
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
};

type ModalAddEditCardPropsType = {
    icon: "Edit" | "Add new pack" | "Delete"
    packId?: string
    name?: string
    page?: "myPack" | "packlist"
}

export const ModalEditAddPack = (props: ModalAddEditCardPropsType) => {

    const dispatch = useAppDispatch()

    const disabler = useAppSelector(state => state.packs.disabler)

    const [deckCover, setDeckCover] = useState("")

    const [open, setOpen] = useState(false);
    const [packNameTextField, setPackNameTextField] = useState(props.name ? props.name : "");

    useEffect(() => {
        setPackNameTextField(props.name ? props.name : "")
    }, [open]);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postNewPack = async () => {
        if (props.icon === "Edit" && props.packId) {
            await dispatch(editPack({name: packNameTextField, _id: props.packId, deckCover}))
        }
        if (props.icon === "Add new pack") {
            await dispatch(createPack({name: packNameTextField, private: false, deckCover}))
        }
        if (props.icon === "Delete" && props.packId) {
            props.page === "packlist" ?
                await dispatch(deletePack(props.packId))
                : await dispatch(deletePackOnMyPage(props.packId))
        }

        handleClose()
    }

    return (
        <div>
            {props.icon === "Add new pack"
                ?
                <AddPackButton
                    variant={"contained"}
                    onClick={handleOpen}
                    disabled={disabler}
                >
                    Add new Pack
                </AddPackButton>
                : <></>}
            {props.icon === "Edit" ?
                <IconButton onClick={handleOpen} disabled={disabler}><BorderColorOutlinedIcon/></IconButton> : <></>}
            {props.icon === "Delete" ?
                <IconButton onClick={handleOpen} disabled={disabler}><DeleteOutlineIcon/></IconButton> : <></>}

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent sx={style}>
                    <DialogContentText id="modal-modal-title" sx={{fontSize: "18px", paddingLeft: "10px"}}>
                        {props.icon}
                        <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                    </DialogContentText>

                    {(props.icon === "Edit" || props.icon === "Add new pack") &&
                        <UploadButton imgURL={deckCover} saveImgUrl={setDeckCover} title={"Add cover"}/>}
                    {props.icon === "Delete"
                        ? "Do you really want to remove this pack? All cards will be deleted"
                        : <ModalTextField onChange={(e) => setPackNameTextField(e.currentTarget.value)}
                                          value={packNameTextField}
                                          label="Name pack"
                                          variant="standard"
                                          size={"medium"}/>
                    }
                    <DialogActions>
                        <Button
                            sx={{
                                marginTop: "20px", borderRadius: "30px", width: "180px", height: "36px"
                            }}
                            variant={"contained"}
                            onClick={handleClose}>Cancel</Button>
                        <Button
                            sx={{
                                marginTop: "20px", borderRadius: "30px", width: "180px", height: "36px"
                            }}
                            variant={"contained"}
                            onClick={postNewPack} disabled={disabler}>{props.icon}</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export const ModalTextField = styled(TextField)(({theme}) => ({
    alignSelf: "center",
    marginTop: "16px",
    width: "96%",

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--button-color1)",
    },
}));


export const AddPackButton = styled(Button)(({theme}) => ({
    width: "184px",
    height: "36px",
    borderRadius: "30px",
    backgroundColor: "var(--button-color1)",

    // "&.Mui-disabled": {
    //     backgroundColor: "var(--button1-color)",
    //     color: "#fff",
    // },
    [theme.breakpoints.down("sm")]: {
        width: "154px",
        height: "32px",
    }
}));

const convertToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const file64 = reader.result as string
        callBack(file64)
    }
    reader.readAsDataURL(file)
}

type UploadButtonType = {
    title: string
    label?: string
    imgURL: string
    saveImgUrl: (imgURL: string) => void
}
export const UploadButton: React.FC<UploadButtonType> = ({
                                                             title,
                                                             label,
                                                             imgURL,
                                                             saveImgUrl
                                                         }) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertToBase64(file, (img64: string) => {
                    saveImgUrl(img64)
                })
            } else {
                alert("File size is too big")
            }
        }
    }

    return <>
        {label && <span>{label}</span>}
        <Button variant="contained" component="label">
            {title}
            <input hidden accept="image/*" type="file" onChange={onChangeHandler}/>
        </Button>
        {imgURL &&
            <Button onClick={() => saveImgUrl("")} sx={{margin: "10px 0"}} variant="contained">Remove Img</Button>}
        {imgURL && <div style={{
            backgroundImage: `url(${imgURL})`, width: "350px",
            height: "150px",
            margin: "25px auto 0 auto",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        }}/>}
    </>
}