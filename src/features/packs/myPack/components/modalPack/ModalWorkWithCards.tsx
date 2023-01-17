import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
    TextField
} from '@mui/material';
import {InputTypeFile} from '../../../../../common/components/uploadFile/UploadFile';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {getCardsTC, postCardTC, updateCardTC} from '../../mypack-reducer';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {memo, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


type ModalAddEditCardPropsType = {
    disabled?: boolean
    icon: 'edit' | 'addButton'
    cardId?: string
    question?: string
    answer?: string
}

export const ModalAddEditCard = memo((props: ModalAddEditCardPropsType) => {

    const packId = useAppSelector(state => state.myPack.cardsPackId)
    const pageCount = useAppSelector(state => state.myPack.pageCount)
    const sortCards = useAppSelector(state => state.myPack.cardsSorted)
    const isFetching = useAppSelector(state => state.userFeedback.circularEntity)

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [answerTextField, setAnswerTextField] = useState(props.answer);
    const [selectValue, setSelectValue] = useState('Text');
    const [questionTextField, setQuestionTextField] = useState(props.question);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setError(null)
        setQuestionTextField('')
        setAnswerTextField('')
    };
    const handleChange = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string)
        setError(null)
    };
    const postNewCard = async () => {
        const question = questionTextField?.trim()
        const answer = answerTextField?.trim()
        if (question === '' || answer === '' || props.answer === undefined || props.question === undefined) {
            setError('Enter answer and question')
        }
        if (props.icon === 'edit' && question !== '' && answer !== '' && props.answer !== undefined && props.question !== undefined) {
            await dispatch(updateCardTC({_id: props.cardId ? props.cardId : '', answer, question}))
            setError(null)
        }
        if (props.icon === 'addButton' && question !== '' && answer !== '' && props.answer !== undefined && props.question !== undefined) {
            await dispatch(postCardTC({cardsPack_id: packId, answer, question}))
            setError(null)
        }
        if (question !== '' && answer !== '' && props.answer !== undefined && props.question !== undefined) {
            await dispatch(getCardsTC({cardsPack_id: packId, pageCount: pageCount, sortCards: sortCards}))
            setError(null)
            handleClose()
        }
    }

    useEffect(() => {
        setAnswerTextField(props.answer)
        setQuestionTextField(props.question)
    }, [open])

    return (
        <Box>
            {
                props.icon === 'addButton'
                    ? <BtnAddNewCard
                        disabled={props.disabled}
                        variant={'contained'}
                        onClick={handleOpen}>Add new card</BtnAddNewCard>
                    : <IconButton onClick={handleOpen} disabled={props.disabled}><BorderColorOutlinedIcon/></IconButton>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ModalBox>
                    <Typography id="modal-modal-title" sx={{fontSize: '18px', color: 'var(--text-color1)'}}>
                        <b>{props.icon === 'edit' ? 'Edit card' : 'Add new card'}</b>
                        <IconBtnClose onClick={handleClose}><CloseIcon/></IconBtnClose>
                    </Typography>
                    <hr/>
                    {selectValue !== 'Text' &&
                        <Typography style={{padding: '5px', fontSize: '12px'}}>Image max 1mb</Typography>}
                    <Box sx={{minWidth: 120, marginTop: '10px'}}>
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
                    {
                        selectValue === 'Text'
                            ? (questionTextField?.includes('data:image/') &&
                                <BoxImg>
                                    <IconBtnClose onClick={() => setQuestionTextField('')}><CloseIcon/></IconBtnClose>
                                    <span>Question:</span> <img
                                    src={questionTextField} alt="question" style={{width: '90px'}}/>
                                </BoxImg>) ||
                            <TextField onChange={(e) => {
                                setQuestionTextField(e.currentTarget.value)
                                setError(null)
                            }} id="standard-basic"
                                       value={questionTextField}
                                       error={questionTextField === '' || !!error}
                                       label="Question" variant="standard" size={'medium'}
                                       disabled={questionTextField?.includes('data:image/')}/>
                            : <Box>
                                {questionTextField?.includes('data:image/') &&
                                    <BoxImg>
                                        <IconBtnClose onClick={() => setQuestionTextField('')}><CloseIcon/></IconBtnClose>
                                        <img src={questionTextField} alt="question"
                                             style={{height: '100px'}}/>
                                    </BoxImg>}
                                <InputTypeFile setQuestionTextField={setQuestionTextField} profile={'postQuestion'}>
                                    <Button component="span"
                                            sx={{
                                                marginTop: '10px',
                                                width: '200px',
                                                borderRadius: '40px',
                                            }}
                                            variant={'contained'}>Add question</Button>
                                </InputTypeFile>
                            </Box>
                    }
                    <br/>
                    {
                        selectValue === 'Text'
                            ? (answerTextField?.includes('data:image/') &&
                                <BoxImg>
                                    <IconBtnClose onClick={() => setAnswerTextField('')}><CloseIcon/></IconBtnClose>
                                    <span>Answer:</span> <img
                                    src={answerTextField} alt="answer" style={{width: '90px'}}/>
                                </BoxImg>) ||
                            <TextField onChange={(e) => {
                                setAnswerTextField(e.currentTarget.value)
                                setError(null)
                            }} id="standard-basic"
                                       value={answerTextField}
                                       error={answerTextField === '' || !!error}
                                       label="Answer" variant="standard" size={'medium'}
                                       disabled={answerTextField?.includes('data:image/')}/>
                            : <Box>
                                {answerTextField?.includes('data:image/') && <BoxImg>
                                    <IconBtnClose onClick={() => setAnswerTextField('')}><CloseIcon/></IconBtnClose>
                                    <img src={answerTextField} alt="" style={{height: '100px'}}/>
                                </BoxImg>
                                }
                                <InputTypeFile profile={'postAnswer'} setAnswerTextField={setAnswerTextField}>
                                    <Button
                                        component={'span'}
                                        sx={{width: '200px', borderRadius: '40px'}}
                                        variant={'contained'}>Add answer</Button>
                                </InputTypeFile>
                            </Box>
                    }
                    <br/>
                    <Typography sx={{color: 'darkred'}}>{error}</Typography>
                    <BtnPostCard
                        disabled={isFetching}
                        variant={'contained'}
                        onClick={postNewCard}>{props.icon === 'addButton' ? 'Add new card' : 'Edit'}
                    </BtnPostCard>
                </ModalBox>
            </Modal>
        </Box>
    );
})

export const ModalBox = styled(Box)(({theme}) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--bg2)',
    // bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24px',
    padding: '40px',


}))
export const BtnAddNewCard = styled(Button)(({theme}) => ({
    borderRadius: '30px',
    width: '184px',
    height: '36px'
}))
export const IconBtnClose = styled(IconButton)(({theme}) => ({
    position: 'absolute',
    top: '0',
    right: '0'
}))
export const BoxImg = styled(Box)(({theme}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
}))
export const BtnPostCard = styled(Button)(({theme}) => ({
    borderRadius: '30px',
    width: '180px',
    height: '36px',
    margin: '10px 10px'
}))

