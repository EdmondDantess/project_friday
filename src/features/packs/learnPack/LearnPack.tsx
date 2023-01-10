import {
    getCardsTC,
    postCardGrade,
    setCardsToEmptyState,
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
import {Button, Paper} from '@mui/material';
import Radio from '@mui/material/Radio';
import styled from '@emotion/styled';

export const LearnPackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 439px;
  margin: 0 auto
`;


const grades = ['Did not know', 'Forgot', 'a lot of thougth', 'Confused', 'Knew the answer'];

export const LearnPack = () => {

    const cards = useAppSelector(state => state.myPack.cards)
    const packName = useAppSelector(state => state.myPack.packName)
    const packId = useAppSelector(state => state.myPack.cardsPackId)
    const deckCover = useAppSelector(state => state.myPack.deckCover)
    const packIsEmpty = useAppSelector(state => state.myPack.packIsEmpty)

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
        <LearnPackWrapper>
            <PreviousPage routeNavigate={-2} title={'Back to previous page'}/>
            {
                deckCover
                    ? <img src={deckCover} alt="Cover" style={{width: '50px'}}/>
                    : <img src={packDecoy} alt="deckCoverDefault" style={{width: '50px'}}/>
            }
            {
                card && !!cards.length && !!Object.keys(card).length
                    ? <>
                        <h3> Learnpack: {packName}</h3>
                        <Paper sx={{padding: '10px'}}>
                            <div><b>Question: {
                                card.question.startsWith('data:image/')
                                    ? <img src={card.question} alt="question img" style={{
                                        height: '104px', width: '104px'
                                    }}/>
                                    : card.question
                            }
                            </b></div>
                            <div style={{fontSize: '14px'}}>Number of attempts to answer the question: {card.shots}</div>
                            {!completed &&
                                <Button variant={'contained'}
                                        sx={{width: '373px', height: '36px', borderRadius: '30px'}}
                                        onClick={() => setCompleted(true)}
                                >Show answer</Button>}
                            {completed && <div>
                                <div><b>Answer: {
                                    card.answer.startsWith('data:image/') ?
                                        <img src={card.answer} alt="card answer"
                                             style={{height: '104px', width: '104px'}}/> :
                                        card.answer
                                }</b></div>
                                <span>Rate yourself:</span>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    {
                                        grades.map((grade, index) => {
                                                return <div key={index}>
                                                    <FormControlLabel
                                                        value={grade}
                                                        control={<Radio/>}
                                                        label={grade}
                                                        onClick={() => setGrade(index + 1)}/>
                                                </div>
                                            }
                                        )}
                                </RadioGroup>
                                <Button variant={'contained'}
                                        sx={{width: '373px', height: '36px', borderRadius: '30px'}}
                                        onClick={nextQuestion}
                                        disabled={grade === 0}
                                >Next</Button>
                            </div>}
                        </Paper> </>
                    : <div style={{fontSize: '28px'}}>{packIsEmpty && 'Пользователь не добавил карточки'}</div>
            }
        </LearnPackWrapper>
    );
}