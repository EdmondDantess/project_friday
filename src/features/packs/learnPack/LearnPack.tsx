import React, {useEffect, useState} from 'react';
import {Button, Paper} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import module from './learnPack.module.scss'
import {CardType} from '../../../api/cardAPI';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {getCardsTC, postCardGrade, setPackUserId} from '../myPack/mypack-reducer';
import {useNavigate, useSearchParams} from 'react-router-dom';
import arrow from '../../../assets/images/arrow.svg';
import {setPackName} from './learnPack-reducer';

export const LearnPack = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const grades = ['Did not know', 'Forgot', 'a lot of thougth', 'Confused', 'Knew the answer'];
    const cards = useAppSelector(state => state.myPack.cards)
    const packId = useAppSelector(state => state.myPack.idOfCardsPack)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const packName = useAppSelector(state => state.learnPack.packName)
    const findPackName = cardPacks.find(p => p._id === packId)?.name

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

    const getCard = (cards: CardType[]) => {
        let buildedPack: CardType[] = []    //Array that collects running cards
        for (let i = 0; i < cards.length; i++) {
            const cardGrade = Math.round(cards[i].grade)
            const pushCards: (n: number) => null = (n: number) => {    //How many times to push a card into an array
                if (n < 1) {
                    return null
                } else {
                    buildedPack.push(cards[i])
                    return pushCards(n - 1)
                }
            }
            switch (cardGrade) {    // If our card has 0 stars. Then it should occur 6 times in the array. If there is 1 star, then push it 5 times. 2 stars push 4 times and so on. Thus, we increase the probability of cards that have a smaller number of stars falling out
                case (0): {
                    pushCards(Math.pow(6, 2))
                    break;
                }
                case (1): {
                    pushCards(Math.pow(5, 2))
                    break;
                }
                case (2): {
                    pushCards(Math.pow(4, 2))
                    break;
                }
                case (3): {
                    pushCards(Math.pow(3, 2))
                    break;
                }
                case (4): {
                    pushCards(Math.pow(2, 2))
                    break;
                }
                case (5): {
                    pushCards(1)
                    break;
                }
            }
        }
        buildedPack.sort(() => Math.random() - 0.5)  //shuffling our array
        const index = Math.floor(Math.random() * buildedPack.length) //choosing a random index of our collected array
        return buildedPack[index]
    }

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
    const packNameQuery = searchParams.get('packName') || ''

    useEffect(() => {


        if (packId === '') {
            dispatch(setPackUserId(packIdQuery))
            dispatch(setPackName(packNameQuery))
        }

        setSearchParams({packId, packName})
        if (packId !== '') {
            dispatch(getCardsTC({cardsPack_id: packId, pageCount: 1000}))
        }
    }, [packId])

    return (
        <div className={module.mainDivLearnPack}>
            <div style={{
                cursor: 'pointer',
                marginBottom: '24px',
                fontSize: '14px',
                textDecoration: 'none',
                color: 'black'
            }}
                 onClick={() => {
                     navigate(-2)
                 }}>
                <img style={{marginRight: '12px'}} src={arrow} alt="arrow"/>
                Back to previous page
            </div>

            {
                cards.length > 0 ? <>
                    <h3> Learnpack: {packNameQuery}</h3>
                    <Paper sx={{padding: '10px'}}>
                        <div><b>Question: {card.question}</b></div>
                        <div style={{fontSize: '14px'}}>Количество попыток ответов на
                            вопрос: {card.shots}</div>
                        {!completed &&
                            <Button variant={'contained'} sx={{width: '373px', height: '36px', borderRadius: '30px'}}
                                    onClick={() => setCompleted(true)}
                            >Show
                                answer</Button>}
                        {completed && <div>
                            <div><b>Answer: {card.answer}</b></div>
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
                    </Paper> </> : <h1 style={{color: 'red'}}>CARDS NOT FOUND</h1>
            }
        </div>
    );
}