import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { SendIcon } from 'lucide-react';
import { Button } from './ui/button';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

import { cn } from '@/lib/utils';

// type ChatContextProps = {
//   chats: Array<string>;
//   setChats: React.Dispatch<React.SetStateAction<Array<string>>>;
// };

// const ChatContext = React.createContext<ChatContextProps | null>(null);

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

function ChatContainer({ ...props }) {
  const [conversation, setConversation] = React.useState<Array<string>>([]);
  const [userPromt, setUserPrompt] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   const c = [];
  //   for (let i = 0; i < 10; i++) {
  //     c.push(`Chat ${i}`);
  //   }
  //   setConversation(c);
  // }, []);

  function addChat(chat: string | undefined) {
    if (!chat) return;
    setConversation((prev) => [...prev, chat]);
  }

  // function removeChat(index: number) {
  //   setConversation((prev) => prev.filter((x) => x === prev[index]));
  // }

  function removeLastChat() {
    setConversation((prev) => prev.slice(0, -1));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const prompt = userPromt;

    addChat(userPromt);
    addChat('Thinking...');
    setUserPrompt('');
    setDisabled(true);

    // use your API key
    const ai = new GoogleGenAI({
      apiKey: 'API_KEY',
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    removeLastChat();
    addChat(response.text);
    console.log(response);

    setDisabled(false);
  }

  return (
    <>
      {conversation.length === 0 ? (
        <div className='flex flex-1 flex-col justify-center items-center gap-2'>
          <span className='text-4xl font-bold'>Welcome!</span>
          <span>What's on your mind?</span>
        </div>
      ) : (
        <ScrollArea className='h-[calc(100vh-12.3rem)]'>
          <div className='flex flex-1 flex-col justify-end gap-8' {...props}>
            {conversation.map((chat, index) => (
              <Chat key={index} variant={index % 2 === 0 ? 'user' : 'bot'}>
                <Markdown>{chat}</Markdown>
              </Chat>
            ))}
          </div>
        </ScrollArea>
      )}

      <form className='flex gap-2' onSubmit={(e) => onSubmit(e)}>
        <Input
          className='bg-muted dark:bg-muted/50 shadow-sm'
          type='text'
          placeholder={disabled ? 'waiting for reply...' : 'Start chatting...'}
          value={userPromt}
          onChange={(e) => setUserPrompt(e.target.value)}
          disabled={disabled}
        />
        <Button type='submit'>
          <SendIcon />
        </Button>
      </form>
    </>
  );
}

export { Chat, chatVariants, ChatContainer };
