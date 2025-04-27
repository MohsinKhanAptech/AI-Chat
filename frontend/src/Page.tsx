import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ChatProvider } from '@/components/chat';
import { ConversationProvider } from '@/components/conversation';
import Header from './components/header';

export default function Page() {
  return (
    <ConversationProvider>
      <SidebarProvider>
        <AppSidebar variant='inset' />
        <SidebarInset>
          <Header />
          <div className='flex flex-1 p-4 pt-0'>
            <div className='flex flex-1 flex-col justify-end gap-8 mb-8 *:px-8'>
              <ChatProvider />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ConversationProvider>
  );
}
