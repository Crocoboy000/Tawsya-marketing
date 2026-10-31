import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'dark';
type ButtonSize = 'default' | 'small';

const baseClasses =
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent px-5 text-center text-[0.8125rem] font-semibold tracking-[0.005em] transition-[background-color,border-color,box-shadow,color,translate,scale] duration-150 ease-(--ease-out-soft) [-webkit-tap-highlight-color:transparent] hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-[0.55] disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'relative rounded-2xl overflow-hidden bg-primary text-on-brand shadow-btn-primary hover:bg-brand hover:-translate-y-3 hover:shadow-btn-primary-hover not-disabled:active:scale-[0.96] not-disabled:active:bg-brand-strong not-disabled:active:shadow-btn-primary-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral before:absolute before:inset-0 before:translate-x-[-150%] before:bg-[linear-gradient(100deg,transparent_32%,rgb(255_255_255/0.8)_50%,transparent_68%)] before:transition-none before:blur-2xl hover:before:translate-x-[150%] hover:before:transition-transform hover:before:duration-1200 after:absolute after:inset-0 after:bg-[radial-gradient(120%_140%_at_50%_0%,rgb(255_255_255/0.14)_0%,rgb(255_255_255/0)_60%)] motion-reduce:before:hidden motion-reduce:not-disabled:active:scale-100',
  secondary:
    'border-line-strong bg-transparent text-ink hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral',
  dark: 'bg-neutral text-on-brand rounded-xl hover:scale-90  not-disabled:active:scale-[0.96] not-disabled:active:bg-ink not-disabled:active:shadow-btn-primary-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: '',
  small: 'min-h-[38px] px-4 text-xs',
};

const iconClasses: Record<ButtonSize, string> = {
  default: 'size-5',
  small: 'size-4',
};

export function buttonClasses({
  variant = 'primary',
  size = 'default',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'default',
  icon: Icon,
  className,
}: ButtonLinkProps) {
  return (
    <Link data-cursor="button" href={href} className={buttonClasses({ variant, size, className })}>
      {children}
      {Icon ? <Icon aria-hidden="true" className={cn('shrink-0', iconClasses[size])} /> : null}
    </Link>
  );
}
