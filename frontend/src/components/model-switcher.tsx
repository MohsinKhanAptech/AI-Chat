'use client';

import * as React from 'react';
import {
  ChevronsUpDown,
  InfinityIcon,
  SparkleIcon,
  SparklesIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { ConversationContext, Model } from '@/components/conversation';
import axios from 'axios';

export function ModelSwitcher({ models }: { models: Model[] }) {
  const { isMobile } = useSidebar();
  const context = React.useContext(ConversationContext);

  const activeModel = context?.models[context?.activeModelIndex];

  async function handleClick(index: number) {
    try {
      await axios.post('http://localhost:5000/models/active', {
        modelIndex: index,
      });
    } catch (error) {
      console.error('Error setting active model:', error);
    }

    context?.setActiveModelIndex(index);
    context?.setActiveConversationIndex(context?.conversations.length);
  }

  if (context?.modelLoading) return <Skeleton className='w-full h-12' />;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                {activeModel?.name.includes('llama') ? (
                  <InfinityIcon className='size-4' />
                ) : (
                  <SparklesIcon className='size-4' />
                )}
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeModel?.name}
                </span>
                <span className='truncate text-xs'>Local Model</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              AI Models
            </DropdownMenuLabel>
            {models.map((model, index) => (
              <DropdownMenuItem
                key={model.name}
                onClick={() => handleClick(index)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  {model.name.includes('llama') ? (
                    <InfinityIcon className='size-4' />
                  ) : (
                    <SparkleIcon className='size-4' />
                  )}
                </div>
                {model.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
