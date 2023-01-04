import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import {InputTypeFile} from '../../../../../common/components/uploadFile/UploadFile';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {getCardsTC, postCardTC, updateCardTC} from '../../mypack-reducer';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

    const packId = useAppSelector(state => state.myPack.cardsPackId)
    const pageCount = useAppSelector(state => state.myPack.pageCount)
    const sortCards = useAppSelector(state => state.myPack.cardsSorted)

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const [answerTextField, setAnswerTextField] = useState(props.answer);
    const [selectValue, setSelectValue] = useState('Text');
    const [questionTextField, setQuestionTextField] = useState(props.question);

    useEffect(() => {
        if (!props.question?.includes('data:image/')) {
            setQuestionTextField(props.question ? props.question : '')
        }
        if (!props.answer?.includes('data:image/')) {
            setAnswerTextField(props.answer ? props.answer : '')
        }
    }, [open])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string);
    };
    const postNewCard = async () => {
        const question = questionTextField?.trim()
        const answer = answerTextField?.trim()
        console.log(question)
        console.log(answer)
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
                    : <IconButton onClick={handleOpen} disabled={props.disabled}><BorderColorOutlinedIcon/></IconButton>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{fontSize: '18px', color: '#000000'}}>
                        <b>{props.icon === 'edit' ? 'Edit card' : 'Add new card'}</b>
                        <IconButton onClick={handleClose} sx={{bottom: '30px', left: '55px'}}><CloseIcon/></IconButton>
                    </Typography>
                    <hr/>
                    {selectValue === 'Text' ? <></> : <div style={{padding: '5px', fontSize: '12px'}}>Image max 1mb</div>}
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" size={'small'}>
                                Choose a question format</InputLabel>
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
                    {selectValue === 'Text' ?
                        <TextField onChange={(e) => setQuestionTextField(e.currentTarget.value)} id="standard-basic"
                                   value={questionTextField} label="Question" variant="standard" size={'medium'}/>
                        :
                        <InputTypeFile setQuestionTextField={setQuestionTextField} profile={'postQuestion'}>< Button
                            variant={'contained'}
                            sx={{
                                marginTop: '10px',
                                width: '200px',
                                borderRadius: '40px'
                            }}
                            component={'span'}>Add question</Button>
                        </InputTypeFile>}
                    <br/>
                    {selectValue === 'Text' ?
                        <TextField onChange={(e) => setAnswerTextField(e.currentTarget.value)} id="standard-basic"
                                   value={answerTextField} label="Answer" variant="standard" size={'medium'}/>
                        :
                        <InputTypeFile profile={'postAnswer'} setAnswerTextField={setAnswerTextField}><Button
                            component={'span'}
                            sx={{width: '200px', borderRadius: '40px'}}
                            variant={'contained'}>Add answer</Button>
                        </InputTypeFile>}
                    <br/>
                    <Button
                        disabled={props.disabled}
                        sx={{
                            marginTop: '20px',
                            borderRadius: '30px',
                            width: '180px',
                            height: '36px',
                            margin: 'auto 10px'
                        }}
                        variant={'contained'}
                        onClick={postNewCard}>{props.icon === 'addButton' ? 'Add new card' : 'Edit'}</Button>
                </Box>
            </Modal>
        </div>
    );
}