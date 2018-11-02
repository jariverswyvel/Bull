import React from 'react';
import {arrayOf, object, func, string} from 'prop-types';
import Option from '../Option';

const OptionsHolder = ({handleChooseOption, selectedOption, options}) => {
    if (options !== ``) {
        return (
            <div className="options-holder">
                {options.map((option, index) => (
                    <Option
                        handleOptionClick={handleChooseOption}
                        img={option.img}
                        key={index}
                        price={option.price}
                        selected={selectedOption === option.title}
                        title={option.title}
                        type={option.type}
                    />
                ))}
            </div>
        );
    } else return null;
};

OptionsHolder.propTypes = {
    options: arrayOf(object).isRequired,
    handleChooseOption: func.isRequired,
    selectedOption: string.isRequired
};

export default OptionsHolder;
