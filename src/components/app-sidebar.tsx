'use client';

import * as React from 'react';
import {
  HelpCircleIcon,
  LucideIcon,
  MessageCircleIcon,
  MoonIcon,
  PlusCircleIcon,
  SettingsIcon,
} from 'lucide-react';

import { ModelSwitcher } from '@/components/model-switcher';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
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
import { ConversationContext, Model } from '@/components/conversation';

type NavUser = {
  name: string;
  email: string;
  avatar: string;
};
type NavModel = Model;
type NavItem = {
  id: string;
  title: string;
  url: string;
  action: () => Promise<void>;
  icon: LucideIcon;
};
type NavData = {
  user: NavUser;
  model: NavModel[];
  navMain: NavItem[];
  navSecondary: NavItem[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const conversationContext = React.useContext(ConversationContext);

  const data: NavData = {
    user: {
      name: 'donatedsalt',
      email: 'ds@example.com',
      avatar: '/avatars/donatedsalt.jpg',
    },
    model: conversationContext!.Models,
    navMain:
      conversationContext?.activeModel.conversations.map((conversation) => ({
        id: conversation.id,
        title: conversation.title,
        url: '#',
        action: async () => {
          conversationContext?.setActiveConversation(conversation);
        },
        icon: MessageCircleIcon,
      })) || [],
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

  React.useEffect(() => {}, []);

  function handleNewChat() {
    conversationContext?.setActiveConversation(null);
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <ModelSwitcher Model={data.model} />
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export type { NavUser, NavModel, NavItem, NavData };
