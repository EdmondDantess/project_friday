import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent, useState,
} from 'react';
import s from './SuperInputText.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void;
    onEnter?: () => void;

    spanClassName?: string;
};

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
                                                               type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
                                                               onChange,
                                                               onChangeText,
                                                               onKeyPress,
                                                               onEnter,

                                                               className,
                                                               spanClassName,

                                                               ...restProps // все остальные пропсы попадут в объект restProps
                                                           }) => {

    const [errorInput, setErrorInput] = useState<any>(null)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && // если есть пропс onChange
        onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
        setErrorInput(e.currentTarget.value)
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter(); // то вызвать его
        setErrorInput(null)
    };

    let finalInputClassName = s.errorInput
    if (errorInput) {
        finalInputClassName = s.noErrorInput
    }

    return (
        <>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
        </>
    );
};

export default SuperInputText;
