import React, {useState} from 'react';
import './SupComponents.css'
import SuperInputText from '../../common/components/SuperInput/SuperInputText';
import SuperCheckbox from '../../common/components/SuperCheckBox/SuperCheckbox';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import SuperRadio from '../../common/components/SuperRadio/SuperRadio';
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan';
import SuperSelect from '../../common/components/SuperSelect/SuperSelect';

const SuperComponents = () => {
    const arrRadioSel = ['test1', 'test2', 'test3', 'test4']
    const [supRadio, setSupRadio] = useState(arrRadioSel[0])
    const [supSelect, setSupSelect] = useState(arrRadioSel[0])
    const [valueEdSpan, setValueEdSpan] = useState('TEXT')

    return (
        <div className="SupComponents">
            <SuperInputText/>
            <SuperButton>default</SuperButton>
            <SuperEditableSpan value={valueEdSpan} onChangeText={setValueEdSpan}/>
            <SuperCheckbox> CheckBox </SuperCheckbox>
            <SuperRadio value={supRadio} options={arrRadioSel} onChangeOption={setSupRadio}/>
            <SuperSelect value={supSelect} options={arrRadioSel} onChangeOption={setSupSelect}/>
        </div>
    );
};

export default SuperComponents;