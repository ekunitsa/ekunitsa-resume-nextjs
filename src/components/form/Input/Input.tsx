'use client';

import {
    ChangeEvent,
    forwardRef,
    InputHTMLAttributes,
    Ref,
    useState,
} from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    errorMessage?: string;
    id?: string;
    label: string;
    name: string;
    type: 'text' | 'password' | 'email' | 'search' | 'number' | 'tel';
    setValue?: UseFormSetValue<FieldValues>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            name,
            type,
            label,
            value = '',
            id = name,
            autoFocus = false,
            errorMessage = '',
            defaultValue = '',
            setValue,
            onChange,
            ...props
        }: InputProps,
        ref,
    ) => {
        const [inputValue, setInputValue] = useState(defaultValue);

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.currentTarget.value;

            setInputValue(value);

            if (setValue) {
                setValue(name, value);
            }

            if (onChange) {
                onChange(event);
            }
        };

        return (
            <div className={classNames(styles.wrapper)}>
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>

                <input
                    {...props}
                    ref={ref as Ref<HTMLInputElement> | undefined}
                    id={id}
                    name={name}
                    value={value || inputValue}
                    type={type}
                    autoFocus={autoFocus}
                    onChange={handleChange}
                    className={styles.input}
                />

                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
            </div>
        );
    },
);
