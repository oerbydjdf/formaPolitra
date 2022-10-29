import React from 'react';
import { Link } from 'react-router-dom';
import s from './nav.module.css';

const Navigation = () => {
    return (
        <nav className={s.nav}>
            <Link className={s.link} to='/'>Форма</Link>
            <Link className={s.link} to='/Politra'>Политра</Link>
        </nav>
    );
};

export default Navigation;