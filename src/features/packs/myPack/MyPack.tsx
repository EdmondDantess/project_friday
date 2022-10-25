import React, {useEffect} from 'react';
import style from './myPack.module.scss'
import {Button, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {CardsType} from '../../../api/myPackApi';
import {ff, getCardsTC, postCardTC} from './mypack-reducer';

export const MyPack = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.myPack.cards)
    const packId = useAppSelector(state => state.myPack.packUserId)

useEffect(()=> {
   dispatch(getCardsTC(packId))
    //dispatch(ff())
}, [dispatch])


    const cardsBodyTAble = cards.map((c: CardsType, index )=> {
        return (
            <div className={style.bodyTableMyPack} key={index}>
                <span>{c.question}</span>
                <span>{c.answer}</span>
                <span>--</span>
                <span>Grades  <span>Icons</span></span>
            </div>
        )
    })

    return (
        <div className={style.parentContainerMyPack}>
            <div className={style.headwithBut}>
                <span><b>My Pack</b></span> <Button variant={'contained'}  onClick={()=>dispatch(postCardTC(packId))}>Add new card</Button>
            </div>
            <span>
                    Search
                </span>
            <TextField className={style.inputMyPack} size={'small'}></TextField>
            <div className={style.headTableMyPack}>
                <span>Question</span>
                <span>Answer</span>
                <span>Last Update</span>
                <span>Grade</span>
            </div>
            {cardsBodyTAble}
        </div>
    );
};

