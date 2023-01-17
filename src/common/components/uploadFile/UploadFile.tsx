import React, {ChangeEvent, ReactNode} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {updateUserInfoTC} from '../../../features/profile/profile-reducer';

type InputPropsType = {
    children: ReactNode,
    profile: 'profile' | 'postQuestion' | 'postAnswer',
    setQuestionTextField?: (value: string) => void
    setAnswerTextField?: (value: string) => void
}

export const InputTypeFile: React.FC<InputPropsType> = ({
                                                            profile,
                                                            children,
                                                            setAnswerTextField,
                                                            setQuestionTextField
                                                        }) => {

    const dispatch = useAppDispatch()
    const name = useAppSelector(state => state.profile.name)


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 100000) {
                convertFileToBase64(file, (file64: string) => {
                    if (profile === 'postQuestion') {
                        setQuestionTextField && setQuestionTextField(file64)
                    }
                    if (profile === 'postAnswer') {
                        console.log(file64)
                        setAnswerTextField && setAnswerTextField(file64)
                    }
                    if (profile === 'profile') {
                        dispatch(updateUserInfoTC({name, avatar: file64}))
                    }
                })
            } else {
                alert('Файл слишком большого размера! Макс размер 100кб')
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
   