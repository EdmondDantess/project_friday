import React, {useEffect} from 'react';
import {Button, Paper} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {CardPackType} from '../../../api/packAPI';
import module from './learnPack.module.scss'
import {CardType} from '../../../api/cardAPI';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {getCardsTC, postCardGrade} from '../myPack/mypack-reducer';


export const LearnPack = () => {
    const dispatch = useAppDispatch()
    const grades = ['Did not know', 'Forgot', 'a lot of thougth', 'Confused', 'Knew the answer'];
    const cards = useAppSelector(state => state.myPack.cards)
    const packId = useAppSelector(state => state.myPack.idOfCardsPack)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const packName = cardPacks.find((p: CardPackType) => p._id === packId)!.name
    const [card, setCard] = React.useState<CardType>({
        _id: 'fake',
        cardsPack_id: '0',
        user_id: '0',
        answer: 'string',
        question: 'string',
        grade: 0,
        shots: 0,
        comments: 'string',
        type: 'string',
        rating: 0,
        more_id: 'string',
        created: 'string',
        updated: 'string',
        __v: 0,
    });
    const [completed, setCompleted] = React.useState<boolean>(false)
    const [grade, setGrade] = React.useState<number>(0)


    const getCard = (cards: CardType[]) => {
        let res = []
        for (let i = 0; i < cards.length; i++) {
            const cardGrade = Math.round(cards[i].grade)
            switch (cardGrade) {
                case (0): {
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    break;
                }
                case (1): {
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    break;
                }
                case (2): {
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    break;
                }
                case (3): {
                    res.push(cards[i])
                    res.push(cards[i])
                    res.push(cards[i])
                    break;
                }
                case (4): {
                    res.push(cards[i])
                    res.push(cards[i])
                    break;
                }
                case (5): {
                    res.push(cards[i])
                    break;
                }
            }
        }
        res.sort(()=>Math.random()-0.5)
        const index = Math.floor(Math.random() * res.length)
        console.log(index)
        console.log(res)
        return setCard(res[index])
    }

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id:packId, pageCount: 1000}))
    }, [])

    useEffect(() => {
        getCard(cards)
    }, [cards])


    const nextQuestion = () => {
       // getCard(cards)
        dispatch(postCardGrade(grade, card._id))
        setCompleted(false)
        setGrade(0)
    }

    return (
        <div className={module.mainDivLearnPack}>
            <h3> Learnpack: {packName}</h3>
            <Paper sx={{padding: '10px'}}>
                <div><b>Question: {card.question}</b></div>
                <div style={{fontSize: '14px'}}>Количество попыток ответов на вопрос: {card.shots}</div>
                {!completed && <Button variant={'contained'} sx={{width: '373px', height: '36px', borderRadius: '30px'}}
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
            </Paper>
        </div>

    );
};
