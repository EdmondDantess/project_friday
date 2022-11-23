import React, {ChangeEvent, ReactNode, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {updateUserInfoTC} from '../../../features/profile/profile-reducer';

type InputPropsType = {
    children: ReactNode,
    image: string | null
}

export const InputTypeFile: React.FC<InputPropsType> = ({image, children}) => {

    const [ava, setAva] = useState(image)
    const [isAvaBroken, setIsAvaBroken] = useState(false)
    const dispatch = useAppDispatch()
    const name = useAppSelector(state => state.profile.name)


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(updateUserInfoTC({name, avatar: file64}))
                    setAva(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    // const errorHandler = () => {
    //     setIsAvaBroken(true)
    //     alert('Кривая картинка')
    // }

    return (
        <div>
            {/*<img*/}
            {/*    src={isAvaBroken ? defaultAva : ava}*/}
            {/*    style={{width: '100px'}}*/}
            {/*    onError={errorHandler}*/}
            {/*    alt="ava"*/}
            {/*/>*/}
            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                {children}
            </label>
        </div>
    )
}
   