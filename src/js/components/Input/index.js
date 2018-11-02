import React from 'react';
import {string, func, bool, objectOf, any, number, oneOfType} from 'prop-types';
import './index.css';

const Input = ({
    title,
    placeholder,
    onChange,
    type,
    name,
    showError,
    errorText,
    doubleRow,
    tripleRow,
    value,
    onEnter,
    inputStyle
}) => {
    const handleKeyPress = e => e.key === 'Enter' && onEnter();

    return (
        <div className={doubleRow ? `double-row` : tripleRow ? `triple-row` : ``}>
            {title && (
                <label className="input-title" htmlFor={`input-${name}`}>
                    {title}
                </label>
            )}
            <div className="input-holder">
                {value !== undefined ? (
                    <input
                        className={showError ? `form-input error-input` : `form-input`}
                        id={`input-${name}`}
                        name={name}
                        onChange={onChange}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        style={inputStyle}
                        type={type}
                        value={value}
                    />
                ) : (
                    <input
                        className={showError ? `form-input error-input` : `form-input`}
                        id={`input-${name}`}
                        name={name}
                        onChange={onChange}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        type={type}
                    />
                )}
            </div>
            {showError && <div className="error-input-message">{errorText}</div>}
        </div>
    );
};

Input.propTypes = {
    title: string,
    placeholder: string,
    onChange: func,
    type: string,
    name: string,
    showError: bool,
    errorText: string,
    doubleRow: bool,
    value: oneOfType([string, number]),
    onEnter: func,
    tripleRow: bool,
    inputStyle: objectOf(any)
};

Input.defaultProps = {
    title: null,
    placeholder: ``,
    onChange: () => false,
    type: `text`,
    name: ``,
    showError: false,
    errorText: ``,
    value: '',
    doubleRow: false,
    tripleRow: false,
    onEnter: () => false,
    inputStyle: {}
};

export default Input;
