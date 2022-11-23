import React, {ChangeEvent, ReactNode} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {updateUserInfoTC} from '../../../features/profile/profile-reducer';

type InputPropsType = {
    children: ReactNode,
    profile: 'profile' | 'postQuestion' | 'postAnswer'
}

export const InputTypeFile: React.FC<InputPropsType> = ({profile, children}) => {

    const dispatch = useAppDispatch()
    const name = useAppSelector(state => state.profile.name)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    if (profile === 'postQuestion') {

                    }
                    if (profile === 'profile') {
                        dispatch(updateUserInfoTC({name, avatar: file64}))
                    }
                })
            } else {
                alert('Файл слишком большого размера!')
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

    return (
        <div>
            <label>
                <input type="file"
                       accept="image/*"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                {children}
            </label>
        </div>
    )
}
   