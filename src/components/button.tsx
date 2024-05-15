import React, { type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx';
import Spinner from './spinner';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    iconBefore?: ReactNode;
    iconAfter?: ReactNode;
    isLoading?: boolean;
    size?: 'small' | 'medium' | 'large';
    buttonType?: 'default' | 'outlined';
};

export const buttonVariantsSize = cva('', {
    variants: {
        size: {
            small: ['h-7', 'px-3', 'text-sm'],
            medium: ['h-9', 'px-3', 'text-md'],
            large: ['h-14', 'px-9', 'text-md'],
        },
    },
    defaultVariants: {
        size: 'large',
    },
});

export const buttonVariantsType = cva('', {
    variants: {
        buttonType: {
            default: [],
            outlined: [
                'bg-white',
                'border-solid',
                'border-primary-500',
                'text-primary-500',
                'border-[1.5px]',
                'text-2xl',
                'font-semibold'
            ],
        },
    },
    defaultVariants: {
        buttonType: 'default',
    },
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            iconBefore,
            iconAfter,
            size = 'large',
            buttonType = 'default',
            className,
            isLoading,
            ...props
        },
        ref,
    ) => (
        <button
            ref={ref}
            className={twMerge(
                clsx(
                    'inline-flex items-center justify-center gap-1 rounded font-medium transition-colors disabled:cursor-not-allowed relative',
                    'bg-primary-900 text-white w-fit',
                    buttonVariantsSize({ size }),
                    buttonVariantsType({ buttonType }),
                    className,
                ),
            )}
            type="button"
            {...props}
        >
            {(isLoading ?? false) && (
                <div className="inline-flex h-5 w-5 content-center items-center animate-spin">
                    <Spinner />
                </div>
            )}
            {iconBefore && <div>{iconBefore}</div>}
            {children}
            {iconAfter && <div className="inline-flex">{iconAfter}</div>}
        </button>
    ),
);

Button.displayName = "Button";
export default Button;
