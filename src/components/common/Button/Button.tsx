'use client';

import React from 'react';
import classNames from 'classnames';

import { Link } from '@/configs/i18n/routing';

import styles from './Button.module.scss';

interface ButtonProps {
    buttonType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({
    buttonType,
    children,
    className,
    disabled = false,
    href,
    onClick,
}: ButtonProps) => {
    return (
        <>
            {href ? (
                <Link href={href} className={classNames(styles.btn, className)}>
                    {children}
                </Link>
            ) : (
                <button
                    type={buttonType}
                    onClick={onClick}
                    disabled={disabled}
                    className={classNames(styles.btn, className)}
                >
                    {children}
                </button>
            )}
        </>
    );
};
