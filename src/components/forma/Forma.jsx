import React, { useState, useEffect } from 'react';
import foto from '../../img/Vector.svg'
import s from './forma.module.css'
import sBtn from '../button/button.module.css'
import cx from 'classnames';
import { createFormDate } from '../../utility/createFormDate'
import { formValidate } from '../../utility/formValidate'

import { api } from '../../api/api'
import Button from './../button/Button';

const Forma = () => {
    let [urlImg, setUrlImg] = useState(false)
    let [dataForm, setDataForm] = useState({ name: '', surname: '', patronymic: '', file: '' });
    let [addForm, { data }] = api.usePostUserMutation();
    let [validate, setValidate] = useState(false);


    useEffect(() => { setValidate(formValidate(dataForm)) }, [dataForm])


    let receivesPhotoData = (e => {
        let blob = new Blob([e.target.files[0]], { type: 'file' });
        setUrlImg(URL.createObjectURL(blob));
        setDataForm(dataForm => ({ ...dataForm, file: e.target.files[0] }))
    });
    let clearingForm = () => {
            for (let key in dataForm) {
                dataForm[key] = '';
            }
            setDataForm(dataForm => ({ ...dataForm}))
            setUrlImg(false);
    }
    let handlerClick = async (e) => {
        e.preventDefault();
        let date = createFormDate(dataForm, 1, 'send_data');
        await addForm(date);
        clearingForm();
    }


    let onDragStartHand = (e) => { e.preventDefault(); };
    let onDragLeaveHand = (e) => { e.preventDefault() };
    let onDropHand = (e) => {
        e.preventDefault();
        let blob = new Blob([e.dataTransfer.files[0]], { type: 'file' });
        setUrlImg(URL.createObjectURL(blob))
        setDataForm(dataForm => ({ ...dataForm, file: e.dataTransfer.files[0] }));
    }

    return (
        <div>
            <form onSubmit={(e) => handlerClick(e)} className={s.form}>
                <label className={s.label}> <span className={s.labelName}>Имя:</span>
                    <input onChange={(e) => setDataForm(dataForm => ({ ...dataForm, name: e.target.value }))}
                        value={dataForm.name} className={s.input} type="text" name="name" />
                </label>
                <label className={s.label}> <span className={s.labelName}>Фамилия:</span>
                    <input onChange={(e) => setDataForm(dataForm => ({ ...dataForm, surname: e.target.value }))}
                        value={dataForm.surname} className={s.input} type="text" name="surname" />
                </label>
                <label className={s.label}> <span className={s.labelName}>Отчество:</span>
                    <input onChange={(e) => setDataForm(dataForm => ({ ...dataForm, patronymic: e.target.value }))}
                        value={dataForm.patronymic} className={s.input} type="text" name="patronymic" />
                </label>
                <label className={cx(s.label, s.labelLast)}> <span className={s.labelName}>Фото:</span>
                    <div onDragStart={(e) => onDragStartHand(e)} onDragLeave={(e) => onDragLeaveHand(e)}
                        onDragOver={(e) => onDragStartHand(e)} className={s.wrap} onDrop={(e) => onDropHand(e)}>
                        <img className={s.img} src={(urlImg || foto)} alt="img" />

                        <input onChange={receivesPhotoData} className={s.inputDowland} type="file" accept="image/*" name="foto" />
                    </div>
                </label>
                {(validate) ? <Button onClick={() => console.log('')} className={sBtn.btn} name='Сохранить' type="submit" /> :
                    <Button name='Заполните форму' disabled className={cx(sBtn.btn, sBtn.btnDis)} />}
            </form>
            <div className={s.response}>Response</div>
            <div className={s.rectangle}>{(JSON.stringify(data) || '')}</div>
        </div>

    );
};

export default Forma;