import React from 'react';
const Button = ({name, className, onClick}) => {
    
    return (
        <button onClick={() => onClick()} className={className}>{name}</button>
    );
};

export default Button;