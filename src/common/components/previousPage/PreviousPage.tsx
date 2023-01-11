import React from 'react';
import arrow from '../../../assets/images/arrow.svg';
import {useNavigate} from 'react-router-dom';

type PreviousPagePropsType = {
    routeNavigate: any
    title: string
}

export const PreviousPage: React.FC<PreviousPagePropsType> = ({routeNavigate, title}) => {

    const navigate = useNavigate()

    return (
        <div style={{cursor: 'pointer',  marginBottom: '24px', fontSize: '14px', textDecoration: 'none', color: 'black'}}
             onClick={() => {
                 navigate(routeNavigate)
             }}>
            <img style={{marginRight: '12px'}} src={arrow} alt="arrow"/>
            {title}
        </div>
    );
};

