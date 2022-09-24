import React, {useState} from 'react';
import SuperInputText from '../../../common/components/SuperInput/SuperInputText';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../common/components/SuperEditableSpan/SuperEditableSpan';
import SuperCheckbox from '../../../common/components/SuperCheckBox/SuperCheckbox';
import SuperRadio from '../../../common/components/SuperRadio/SuperRadio';
import SuperSelect from '../../../common/components/SuperSelect/SuperSelect';
import './SupComponents.css'

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