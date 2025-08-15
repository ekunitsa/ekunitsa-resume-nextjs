'use client';

import { forwardRef, Ref } from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps {
    defaultChecked?: boolean;
    label: string;
    name: string;
    value?: string;
}

export const Checkbox = forwardRef(
    (
        { name, label, value, defaultChecked, ...props }: CheckboxProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <label className={styles.label}>
                <input
                    {...props}
                    className={styles.input}
                    defaultChecked={defaultChecked}
                    name={name}
                    ref={ref}
                    type="checkbox"
                    value={value}
                />
                <span className={styles.mark}></span>
                <span>{label}</span>
            </label>
        );
    },
);
