'use client';

import * as React from 'react';
import {
  Edit3Icon,
  MessageCircleIcon,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import axios from 'axios';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Conversation, ConversationContext } from '@/components/conversation';
import { Skeleton } from '@/components/ui/skeleton';

export function NavMain({
  items,
}: { items: Conversation[] } & React.ComponentPropsWithoutRef<
  typeof SidebarGroup
>) {
  const context = React.useContext(ConversationContext);
  const { isMobile } = useSidebar();

  function isActive(index: number): boolean {
    return context!.activeConversationIndex === index;
  }

  function handleClick(index: number) {
    context!.setActiveConversationIndex(index);
  }

  async function handleDelete(index: number) {
    context!.setConversations((prev) => {
      if (prev) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });

    try {
      await axios.delete(`http://localhost:5000/conversation/${index}`);
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  }

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel className='text-nowrap'>
        Chat History
      </SidebarGroupLabel>
      <SidebarMenu>
        {context!.conversationLoading && <Skeleton className='w-full h-8' />}

        {items.map((item, index) => {
          if (item.model !== context!.models[context!.activeModelIndex]!.model)
            return null;
          else
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  isActive={isActive(index)}
                  onClick={() => handleClick(index)}
                  asChild
                >
                  <a>
                    <MessageCircleIcon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className='sr-only'>More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className='w-48 rounded-lg'
                    side={isMobile ? 'bottom' : 'right'}
                    align={isMobile ? 'end' : 'start'}
                  >
                    <DropdownMenuItem>
                      <Folder className='text-muted-foreground' />
                      <span>View Chat</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(index)}>
                      <Trash2 className='text-muted-foreground' />
                      <span>Delete Chat</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
