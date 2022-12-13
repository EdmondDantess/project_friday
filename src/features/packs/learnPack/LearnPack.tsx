import React, {useEffect, useState} from 'react';
import {Button, Paper} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import module from './learnPack.module.scss'
import {CardType} from '../../../api/cardAPI';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {getCardsTC, postCardGrade, setPackUserId} from '../myPack/mypack-reducer';
import {useSearchParams} from 'react-router-dom';
import {PreviousPage} from '../../../common/components/previousPage/PreviousPage';
import {getCard} from './functionRandomizationCard';

const grades = ['Did not know', 'Forgot', 'a lot of thougth', 'Confused', 'Knew the answer'];

export const LearnPack = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.myPack.cards)
    const packId = useAppSelector(state => state.myPack.idOfCardsPack)
    const packName = useAppSelector(state => state.myPack.packName)

    const [searchParams, setSearchParams] = useSearchParams();
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        __v: 0,
    });
    const [completed, setCompleted] = useState<boolean>(false)
    const [grade, setGrade] = useState<number>(0)


    useEffect(() => {
            setCard(getCard(cards))
        }, [cards]
    )

    const nextQuestion = () => {
        dispatch(postCardGrade(grade, card._id))
        setCompleted(false)
        setGrade(0)
    }

    const packIdQuery = searchParams.get('packId') || ''


    useEffect(() => {
        if (packId === '') {
            dispatch(setPackUserId(packIdQuery))
        }
    }, [])


    useEffect(() => {
        if (packId !== '') {
            dispatch(getCardsTC({cardsPack_id: packId, pageCount: 1000}))
            setSearchParams({packId})
        }
    }, [dispatch, packId])

    return (
        <div className={module.mainDivLearnPack}>
            <PreviousPage routeNavigate={-2} title={'Back to previous page'}/>
            {
                cards[0].type !== 'NoCards' ? <>
                    <h3> Learnpack: {packName}</h3>
                    <Paper sx={{padding: '10px'}}>
                        <div><b>Question: {
                            card.answer.includes('data:image/jpeg;base64') ?
                                <img src={card.question} alt="" style={{height: '104px', width: '104px'}}/> :
                                card.question
                        }</b></div>
                        <div style={{fontSize: '14px'}}>Number of attempts to answer the question: {card.shots}</div>
                        {!completed &&
                            <Button variant={'contained'} sx={{width: '373px', height: '36px', borderRadius: '30px'}}
                                    onClick={() => setCompleted(true)}
                            >Show answer</Button>}
                        {completed && <div>
                            <div><b>Answer: {
                                card.answer.includes('data:image/jpeg;base64') ?
                                    <img src={card.question} alt="" style={{height: '104px', width: '104px'}}/> :
                                    card.answer
                            }</b></div>
                            <span>Rate yourself:</span>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                {grades.map((grade, index) => {
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
                            <Button variant={'contained'} sx={{width: '373px', height: '36px', borderRadius: '30px'}}
                                    onClick={nextQuestion}
                                    disabled={grade === 0}
                            >Next</Button>
                        </div>}
                    </Paper> </> : <div style={{color: 'red', fontSize: '48px'}}>Пользователь не добавил карточки</div>
            }
        </div>
    );
}