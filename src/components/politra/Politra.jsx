import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import sBtn from '../button/button.module.css';
import s from './politra.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addColor, replacementColor, replacement, deleteColor } from '../../slice/politraSlice';
import cx from 'classnames';

const Politra = () => {
    let colorArr = useSelector(state => state.politra.colors);
    let dispatch = useDispatch();

    let [condition, setCondition] = useState(true);
    let [inputVal, setInputVal] = useState(colorArr.at(-1));
    let [condClouse, setcondClouse] = useState(-1)

    let colorInput = React.createRef();
    useEffect(() =>{
        if(condition === false) {
            colorInput.current.focus();
            colorInput.current.click();
        }        
    })

    let handl = () => {
        if(condition === false) return;
        setCondition(false);
        if(colorArr.length > 0) return;
        dispatch(addColor('#FF0000'))
    }
    let choice;
    let addColors = () => {
        setCondition(true);
        if(choice === undefined) return;
        if(colorArr.includes(choice)) {
            alert('Такой цвет уже есть');
            return;
        }
        dispatch(addColor(choice));
        dispatch(replacement());
    }

    let editingСolor = (i) => {
        handl();
        setInputVal(colorArr[i])
        dispatch(replacementColor({color:colorArr[i], index: i}));
    }

    let showClouseBtn = (i) => {
        setcondClouse(i);
    }
        
    let hideClouseBtn = (i) => setcondClouse(-1);
    let delColor = (e, i) => {
        dispatch(deleteColor(i));
        hideClouseBtn(i);
        e.stopPropagation();
    }


    let color = colorArr.map((e, i) => {
        return (
            <div onMouseOver={() => showClouseBtn(i)} onMouseOut={() => hideClouseBtn(i)} key={e}
            onClick={() => editingСolor(i)} className={s.squareColor} style={{backgroundColor: e}}>
                <div onClick={(event) => delColor(event, i)} 
                    className={cx((condClouse !== i) ? s.del :  s.delActive )}>
                    <span></span><span></span>
                </div>                
            </div>)})
    return (
        <div  className={s.politra}>
            <div className={s.main}>
                <div className={s.mainColor}>
                    {color}
                </div>
                <Button  className={sBtn.btn} onClick={handl} name='Добавить цвет' />
            </div>
            <div className={s.randomColor}>
                <input ref={colorInput} onBlur={addColors}  hidden={condition} value={inputVal} onChange={(e) => choice = e.target.value} className={s.r} type="color" />
            </div>
        </div>
    );
};

export default Politra;