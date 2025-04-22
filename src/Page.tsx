import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { SendIcon } from 'lucide-react';
import { Chat } from './components/chat';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Design Engineering</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 p-4 pt-0'>
          <div className='flex flex-1 flex-col justify-end gap-8 rounded-xl m-8'>
            <Chat variant={'user'} children='pookie wookie dookie' />
            <Chat
              variant={'bot'}
              children='Laborum ut ad amet eu aliquip consectetur fugiat reprehenderit qui et. Est nisi amet sint velit eu cillum dolore cillum irure ut non mollit. Aliquip non ad non tempor est eu officia culpa incididunt eu. Dolor incididunt enim enim laboris officia veniam.'
            />
            <div className='flex gap-2'>
              <Input
                className='bg-background'
                type='text'
                placeholder='Start Chatting...'
              />
              <Button>
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
