'use client';

import * as React from 'react';
import {
  HelpCircleIcon,
  InfinityIcon,
  MessageCircleIcon,
  MoonIcon,
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
    name: 'donatedsalt',
    email: 'ds@example.com',
    avatar: '/avatars/donatedsalt.jpg',
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
      action: async () => {},
      icon: MessageCircleIcon,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      action: async () => {},
      icon: MessageCircleIcon,
    },
    {
      name: 'Travel',
      url: '#',
      action: async () => {},
      icon: MessageCircleIcon,
    },
  ],
  navSecondary: [
    {
      title: 'Get Help',
      url: '#',
      action: async () => {},
      icon: HelpCircleIcon,
    },
    {
      title: 'Change Theme',
      url: '#',
      action: async () => {
        document.documentElement.classList.toggle('dark');
      },
      icon: MoonIcon,
    },
    {
      title: 'Settings',
      url: '#',
      action: async () => {},
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
