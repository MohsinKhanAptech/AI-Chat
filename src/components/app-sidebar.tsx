'use client';

import * as React from 'react';
import {
  HelpCircleIcon,
  InfinityIcon,
  MessageCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
  SparkleIcon,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { AISwitcher } from '@/components/ai-switcher';
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
import { NavSecondary } from './nav-secondary';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  AI: [
    {
      name: 'Gemini',
      logo: SparkleIcon,
      plan: 'Hosted Model',
    },
    {
      name: 'Llama',
      logo: InfinityIcon,
      plan: 'Local Model',
    },
  ],
  navMain: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: MessageCircleIcon,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: MessageCircleIcon,
    },
    {
      name: 'Travel',
      url: '#',
      icon: MessageCircleIcon,
    },
  ],
  navSecondary: [
    {
      title: 'Get Help',
      url: '#',
      icon: HelpCircleIcon,
    },
    {
      title: 'Settings',
      url: '#',
      icon: SettingsIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <AISwitcher AI={data.AI} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Chat History</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip='New Chat'>
                  <PlusCircleIcon />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip='New Chat'
                  className='min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground'
                >
                  <PlusCircleIcon />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
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
