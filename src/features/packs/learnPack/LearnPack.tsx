import {
    getCardsTC,
    postCardGrade,
    setCardsToEmptyState,
    setDeckCover,
    setPackEmptyStatus,
    setPackName,
    setPackUserId
} from '../myPack/mypack-reducer';
import {PreviousPage} from '../../../common/components/previousPage/PreviousPage';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import FormControlLabel from '@mui/material/FormControlLabel';
import {getCard} from './utils/functionRandomizationCard';
import packDecoy from '../../../assets/images/packDecoy.png';
import RadioGroup from '@mui/material/RadioGroup';
import {useSearchParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {CardType} from '../../../api/cardAPI';
import Radio from '@mui/material/Radio';
import {Box, Container, styled} from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const grades = ['Did not know', 'Forgot', 'a lot of thougth', 'Confused', 'Knew the answer'];

export const LearnPack = () => {

    const cards = useAppSelector(state => state.myPack.cards)
    const packName = useAppSelector(state => state.myPack.packName)
    const packId = useAppSelector(state => state.myPack.cardsPackId)
    const packIsEmpty = useAppSelector(state => state.myPack.packIsEmpty)
    const packDeckCover = useAppSelector(state => state.myPack.packDeckCover)

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch()

    const [card, setCard] = useState<CardType>({} as CardType);
    const [grade, setGrade] = useState<number>(0)
    const [completed, setCompleted] = useState<boolean>(false)

    useEffect(() => {
            return () => {
                dispatch(setCardsToEmptyState([]))
                dispatch(setPackName(''))
                dispatch(setPackEmptyStatus(false))
                dispatch(setDeckCover(''))
            }
        }, []
    )

    useEffect(() => {
            setCard(getCard(cards))
        }, [cards, dispatch]
    )
    useEffect(() => {
        if (packId === '') {
            dispatch(setPackUserId(packIdQuery))
        }
        if (packId !== '') {
            dispatch(getCardsTC({cardsPack_id: packId, pageCount: 1000}))
            setSearchParams({packId})
        }
    }, [dispatch, packId])

    const nextQuestion = () => {
        dispatch(postCardGrade(grade, card._id))
        setCompleted(false)
        setGrade(0)
    }

    const packIdQuery = searchParams.get('packId') || ''

    return (
        <Container fixed>
            <LearnPackWrapper>
                <Box sx={{marginTop: '20px'}}><PreviousPage routeNavigate={-2} title={'Back to previous page'}/></Box>
                {
                    packDeckCover && packDeckCover !== '' && packDeckCover !== 'url or base64'
                        ? <img src={packDeckCover} alt="Cover" style={{width: '90px'}}/>
                        : <img src={packDecoy} alt="deckCoverDefault" style={{width: '90px'}}/>
                }

                {
                    card && !!cards.length && !!Object.keys(card).length
                        ? <>
                            <h3 style={{color: 'var(--text-color1)'}}> Learnpack: {packName}</h3>
                            <Box style={{marginTop: '5px', fontSize: '14px', color: 'var(--text-color1)'}}>Number of
                                attempts to
                                answer the question: {
                                    card.shots
                                }</Box>
                            <Paper sx={{width: '100%', padding: '10px', marginTop: '3px'}}>
                                <Box sx={{wordBreak: 'break-word'}}><b>Question:</b> {
                                    card.question.startsWith('data:image/')
                                        ? <img src={card.question} alt="question img" style={{
                                            height: '104px', width: '104px'
                                        }}/>
                                        : card.question
                                }
                                </Box>
                                {!completed &&
                                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                        <BtnShowAndNext
                                            variant={'contained'}
                                            onClick={() => setCompleted(true)}
                                        >Show answer</BtnShowAndNext></Box>}
                                {completed && <div>
                                    <Box sx={{marginTop: '5px', wordBreak: 'break-word'}}><b>Answer:</b> {
                                        card.answer.startsWith('data:image/') ?
                                            <img src={card.answer} alt="card answer"
                                                 style={{height: '104px', width: '104px'}}/> :
                                            card.answer
                                    }</Box>
                                    <span style={{marginTop: '5px'}}>Rate yourself:</span>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        {
                                            grades.map((grade, index) => {
                                                    return <Box key={index}>
                                                        <FormControlLabel
                                                            value={grade}
                                                            control={<Radio/>}
                                                            label={grade}
                                                            onClick={() => setGrade(index + 1)}/>
                                                    </Box>
                                                }
                                            )}
                                    </RadioGroup>
                                    <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                        <BtnShowAndNext
                                            variant={'contained'}
                                            onClick={nextQuestion}
                                            disabled={grade === 0}
                                        >Next</BtnShowAndNext></Box>
                                </div>}
                            </Paper> </>
                        : <Box style={{fontSize: '28px'}}>{packIsEmpty && 'The user has not added the cards yet'}</Box>
                }
            </LearnPackWrapper>
        </Container>
    );
}
const LearnPackWrapper = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '700px',
    margin: '60px auto',

    [theme.breakpoints.down('lg')]: {
        width: '652',
    },
    [theme.breakpoints.down('md')]: {
        width: '552px',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    }
}));
export const BtnShowAndNext = styled(Button)(({theme}) => ({
    width: '373px',
    height: '36px',

    borderRadius: '30px'
}));