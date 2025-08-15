'use client';

import {
    ChangeEvent,
    forwardRef,
    TextareaHTMLAttributes,
    useState,
} from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames';

import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    defaultValue?: string;
    errorMessage?: string;
    id?: string;
    label: string;
    name: string;
    setValue?: UseFormSetValue<FieldValues>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            name,
            label,
            id = name,
            errorMessage = '',
            defaultValue = '',
            setValue,
            onChange,
            ...props
        }: TextareaProps,
        ref,
    ) => {
        const [textareaValue, setTextareaValue] = useState(defaultValue);

        const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const value = event.currentTarget.value;

            setTextareaValue(value);

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

                <textarea
                    {...props}
                    ref={ref}
                    id={id}
                    name={name}
                    value={textareaValue}
                    className={styles.textarea}
                    onChange={handleChange}
                />

                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
            </div>
        );
    },
);
