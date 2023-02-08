import React from 'react';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type PreviousPagePropsType = {
    routeNavigate: any
    title: string
}

export const PreviousPage: React.FC<PreviousPagePropsType> = ({routeNavigate, title}) => {

    const navigate = useNavigate()

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'var(--text-color1)'
        }}
             onClick={() => {
                 navigate(routeNavigate)
             }}>
            <ArrowBackIcon sx={{mr: '5px'}}/>
            {title}
        </div>
    );
};

