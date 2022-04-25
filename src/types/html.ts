import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export type HTMLButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

export type HTMLTagName = keyof HTMLElementTagNameMap;
