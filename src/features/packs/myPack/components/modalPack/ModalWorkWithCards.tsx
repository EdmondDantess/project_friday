import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
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
                    ? <Button
                        disabled={props.disabled}
                        sx={{borderRadius: '30px', width: '184px', height: '36px'}}
                        variant={'contained'}
                        onClick={handleOpen}>Add new card</Button>
                    : <IconButton onClick={handleOpen} disabled={props.disabled}><BorderColorOutlinedIcon/></IconButton>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{fontSize: '18px', color: '#000000'}}>
                        <b>{props.icon === 'edit' ? 'Edit card' : 'Add new card'}</b>
                        <IconButton onClick={handleClose} sx={{position: 'absolute', top: '0', right: '0'}}><CloseIcon/></IconButton>
                    </Typography>
                    <hr/>
                    {selectValue !== 'Text' && <Box style={{padding: '5px', fontSize: '12px'}}>Image max 1mb</Box>}
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
                                <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                                    <IconButton onClick={() => setQuestionTextField('')} sx={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '20px'
                                    }}><CloseIcon/></IconButton>
                                    <span>Question:</span> <img
                                    src={questionTextField} alt="question" style={{width: '90px'}}/>
                                </Box>) ||
                            <TextField onChange={(e) => {
                                setQuestionTextField(e.currentTarget.value)
                                setError(null)
                            }} id="standard-basic"
                                       value={questionTextField}
                                       error={!!error}
                                       label="Question" variant="standard" size={'medium'}
                                       disabled={questionTextField?.includes('data:image/')}/>
                            : <Box>
                                {questionTextField?.includes('data:image/') &&
                                    <Box sx={{
                                        position: 'relative', display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <IconButton onClick={() => setQuestionTextField('')} sx={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '20px'
                                        }}><CloseIcon/></IconButton>
                                        <img src={questionTextField} alt="question"
                                             style={{height: '100px'}}/>
                                    </Box>}
                                <InputTypeFile setQuestionTextField={setQuestionTextField} profile={'postQuestion'}>< Button
                                    variant={'contained'}
                                    sx={{
                                        marginTop: '10px',
                                        width: '200px',
                                        borderRadius: '40px'
                                    }}
                                    component={'span'}>Add question</Button>
                                </InputTypeFile>
                            </Box>
                    }
                    <br/>
                    {
                        selectValue === 'Text'
                            ? (answerTextField?.includes('data:image/') &&
                                <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                                    <IconButton onClick={() => setAnswerTextField('')} sx={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '20px'
                                    }}><CloseIcon/></IconButton>
                                    <span>Answer:</span> <img
                                    src={answerTextField} alt="answer" style={{width: '90px'}}/>
                                </Box>) ||
                            <TextField onChange={(e) => {
                                setAnswerTextField(e.currentTarget.value)
                                setError(null)
                            }} id="standard-basic"
                                       value={answerTextField}
                                       error={!!error}
                                       label="Answer" variant="standard" size={'medium'}
                                       disabled={answerTextField?.includes('data:image/')}/>
                            : <Box>
                                {answerTextField?.includes('data:image/') && <Box sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <IconButton onClick={() => setAnswerTextField('')} sx={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '20px'
                                    }}><CloseIcon/></IconButton>
                                    <img src={answerTextField} alt="" style={{height: '100px'}}/>
                                </Box>
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
                    <Button
                        disabled={isFetching}
                        sx={{
                            borderRadius: '30px',
                            width: '180px',
                            height: '36px',
                            margin: '10px 10px'
                        }}
                        variant={'contained'}
                        onClick={postNewCard}>{props.icon === 'addButton' ? 'Add new card' : 'Edit'}
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
})