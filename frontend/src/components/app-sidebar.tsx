'use client';

import * as React from 'react';
import {
  HelpCircleIcon,
  LucideIcon,
  MoonIcon,
  PlusCircleIcon,
  SettingsIcon,
} from 'lucide-react';

import { ModelSwitcher } from '@/components/model-switcher';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser as NavUserItem } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Conversation,
  ConversationContext,
  Model,
} from '@/components/conversation';

type NavUserItem = {
  name: string;
  email: string;
  avatar: string;
};
type NavItem = {
  id: string;
  title: string;
  url: string;
  action: () => Promise<void>;
  icon: LucideIcon;
};
type NavData = {
  user: NavUserItem;
  models: Model[];
  navMain: Conversation[];
  navSecondary: NavItem[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const context = React.useContext(ConversationContext);

  const data: NavData = {
    user: {
      name: 'donatedsalt',
      email: 'ds@example.com',
      avatar: './avatars/donatedsalt.jpg',
    },
    models: context!.models,
    navMain: context!.conversations,
    navSecondary: [
      {
        id: '1',
        title: 'Get Help',
        url: '#',
        action: async () => {},
        icon: HelpCircleIcon,
      },
      {
        id: '2',
        title: 'Change Theme',
        url: '#',
        action: async () => {
          document.documentElement.classList.toggle('dark');
        },
        icon: MoonIcon,
      },
      {
        id: '3',
        title: 'Settings',
        url: '#',
        action: async () => {},
        icon: SettingsIcon,
      },
    ],
  };

  function handleNewChat() {
    context?.setActiveConversationIndex(context.conversations.length);
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <ModelSwitcher models={data.models} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleNewChat} tooltip='New Chat'>
                  <PlusCircleIcon />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUserItem user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export type { NavUserItem, NavItem, NavData };
