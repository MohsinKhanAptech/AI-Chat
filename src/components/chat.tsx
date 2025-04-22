import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const chatVariants = cva('rounded-md text-sm font-medium transition-all', {
  variants: {
    variant: {
      bot: 'self-start bg-muted text-primary shadow-sm dark:bg-muted/50 rounded-bl-none',
      user: 'self-end shadow-sm text-secondary bg-primary rounded-br-none',
    },
    size: {
      default: 'max-w-6xl px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'bot',
    size: 'default',
  },
});

function Chat({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof chatVariants>) {
  return (
    <div
      className={cn(chatVariants({ variant, size, className }))}
      {...props}
    ></div>
  );
}

export { Chat, chatVariants };
