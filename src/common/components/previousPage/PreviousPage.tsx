import React from 'react';
import arrow from '../../../assets/images/arrow.svg';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/material';

type PreviousPagePropsType = {
    routeNavigate: any
    title: string
}

export const PreviousPage: React.FC<PreviousPagePropsType> = ({routeNavigate, title}) => {

    const navigate = useNavigate()

    return (
        <Box sx={{cursor: 'pointer',  marginBottom: '24px', fontSize: '14px', textDecoration: 'none', color: 'var( --text-color1)'}}
             onClick={() => {
                 navigate(routeNavigate)
             }}>
            <img style={{marginRight: '12px'}} src={arrow} alt="arrow"/>
            {title}
        </Box>
    );
};

