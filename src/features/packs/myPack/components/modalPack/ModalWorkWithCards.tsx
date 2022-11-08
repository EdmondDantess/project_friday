import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks';
import {getCardsTC, postCardTC, updateCardTC} from '../../mypack-reducer';

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
    disabled?: boolean
    icon: 'edit' | 'addButton'
    cardId?: string
    question?: string
    answer?: string
}

export const ModalAddEditCard = (props: ModalAddEditCardPropsType) => {

    const dispatch = useAppDispatch()
    const packId = useAppSelector(state => state.myPack.idOfCardsPack)
    const pageCount = useAppSelector(state => state.myPack.pageCount)
    const sortCards = useAppSelector(state => state.myPack.cardsSorted)

    const [open, setOpen] = React.useState(false);
    const [questionTextField, setQuestionTextField] = React.useState(props.question);
    const [answerTextField, setAnswerTextField] = React.useState(props.answer);
    const [selectValue, setSelectValue] = React.useState('Text');

    useEffect(() => {
        setQuestionTextField(props.question ? props.question : '')
        setAnswerTextField(props.answer ? props.answer : '')
    }, [open])

    const handleChange = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postNewCard = async () => {
        const question = questionTextField?.trim()
        const answer = answerTextField?.trim()

        if (props.icon === 'edit') {
            await dispatch(updateCardTC({_id: props.cardId ? props.cardId : '', answer, question}))
        }
        if (props.icon === 'addButton') {
            await dispatch(postCardTC({cardsPack_id: packId, answer, question}))
        }
        await dispatch(getCardsTC({cardsPack_id: packId, pageCount: pageCount, sortCards: sortCards}))
        handleClose()
    }

    return (
        <div>
            {
                props.icon === 'addButton' ?
                    <Button
                        disabled={props.disabled}
                        sx={{borderRadius: '30px', width: '184px', height: '36px'}} variant={'contained'}
                        onClick={handleOpen}>Add new card</Button>
                    :
                    <IconButton onClick={handleOpen} disabled={props.disabled}> <BorderColorOutlinedIcon/> </IconButton>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{fontSize: '18px', color: '#000000'}}>
                        <b>Add new card </b> <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                    </Typography>
                    <hr/>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" size={'small'}>Choose a question
                                format</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectValue}
                                label="Choose a question format"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Text'}>Text</MenuItem>
                                <MenuItem value={'Picture'}>Picture</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField onChange={(e) => setQuestionTextField(e.currentTarget.value)} id="standard-basic"
                               value={questionTextField} label="Question" variant="standard" size={'medium'}/>
                    <br/>
                    <TextField onChange={(e) => setAnswerTextField(e.currentTarget.value)} id="standard-basic"
                               value={answerTextField} label="Answer" variant="standard" size={'medium'}/> <br/>
                    <Button
                        disabled={props.disabled}
                        sx={{marginTop: '20px', borderRadius: '30px', width: '180px', height: '36px'}}
                        variant={'contained'}
                        onClick={postNewCard}>{props.icon === 'addButton' ? 'Add new card' : 'Edit'}</Button>
                </Box>
            </Modal>
        </div>
    );
}