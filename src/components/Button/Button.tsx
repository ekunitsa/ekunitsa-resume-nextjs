'use client';

import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './Button.module.scss';

interface ButtonProps {
    buttonType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    href?: string;
    hrefTarget?: '_self' | '_blank' | '_parent' | '_top';
    isExternalLink?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({
    buttonType,
    children,
    className,
    disabled = false,
    href,
    hrefTarget,
    isExternalLink = false,
    onClick,
}: ButtonProps) => {
    const CustomLink = isExternalLink ? 'a' : Link;

    return (
        <>
            {href ? (
                <CustomLink
                    href={href}
                    className={classNames(styles.btn, className)}
                    target={hrefTarget}
                >
                    {children}
                </CustomLink>
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
