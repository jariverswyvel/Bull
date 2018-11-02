import React from 'react';
import {string, func, bool, number} from 'prop-types';

const Option = ({title, img, handleOptionClick, type, selected, price}) => {
    return (
        <div
            className={`option pointer ${selected ? `option-selected` : ``}`}
            onClick={() => handleOptionClick(type, title, img, price)}>
            <div className="option-img">
                <img alt="" className="cover" src={img} />
            </div>
            <div className="option-title upper">
                <p>{title}</p>
                {price !== 0 && <p>+ €{price}</p>}
            </div>
        </div>
    );
};

Option.propTypes = {
    title: string.isRequired,
    img: string.isRequired,
    handleOptionClick: func.isRequired,
    type: string.isRequired,
    selected: bool.isRequired,
    price: number.isRequired
};

export default Option;
