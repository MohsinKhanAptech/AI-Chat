import * as React from 'react';
import Markdown from 'react-markdown';
import { SendIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConversationContext } from '@/components/conversation';
import axios from 'axios';

const chatVariants = cva('rounded-md text-sm font-medium transition-all', {
  variants: {
    variant: {
      user: 'self-end shadow-sm text-secondary bg-primary rounded-br-none',
      assistant:
        'self-start bg-muted text-primary shadow-sm dark:bg-muted/50 rounded-bl-none',
      system:
        'self-start bg-muted text-primary italic animate-pulse shadow-sm dark:bg-muted/50 rounded-bl-none',
    },
    size: {
      default: 'max-w-6xl px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'assistant',
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

function ChatProvider({ ...props }) {
  const context = React.useContext(ConversationContext);

  const [userPromt, setUserPrompt] = React.useState<string>('');
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  function addChat(
    chat: {
      role: 'user' | 'assistant' | 'system';
      content: string;
    },
    isNewChat: boolean = false
  ) {
    if (!chat || !chat.role || !chat.content) return;

    if (isNewChat) {
      // if new conversation
      context!.setConversations((prev) => {
        return [
          ...prev,
          {
            title: `Chat ${context!.conversations.length}`,
            model: context!.models[context!.activeModelIndex].name,
            messages: [chat],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
      });
      context!.setActiveConversationIndex(context!.conversations.length);
    } else {
      // if old conversation
      context!.setConversations((prev) => {
        if (prev) {
          return prev.map((conversation, index) => {
            if (index === context!.activeConversationIndex) {
              return {
                ...conversation,
                messages: [...conversation.messages, chat],
              };
            }
            return conversation;
          });
        }
        return prev;
      });
    }
  }

  function removeLastChat() {
    context!.setConversations((prev) => {
      if (prev) {
        return prev.map((conversation, index) => {
          if (index === context!.activeConversationIndex) {
            return {
              ...conversation,
              messages: conversation.messages.slice(0, -1),
            };
          }
          return conversation;
        });
      }
      return prev;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (userPromt === '') return;

    const prompt = userPromt;

    addChat(
      { role: 'user', content: prompt },
      context!.activeConversationIndex === context!.conversations.length
    );
    addChat({ role: 'system', content: 'Thinking...' });

    setUserPrompt('');
    setIsDisabled(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        conversationIndex: context!.activeConversationIndex,
        prompt: prompt,
      });
      console.log(response);

      removeLastChat();
      addChat({ role: 'assistant', content: response.data });
    } catch (error) {
      console.log(error);
    }

    setIsDisabled(false);
  }

  return (
    <>
      {context!.activeConversationIndex === null ||
      context!.activeConversationIndex === -1 ||
      context!.activeConversationIndex === context!.conversations.length ? (
        <div className='flex flex-1 flex-col justify-center items-center gap-2'>
          <span className='text-4xl font-bold'>Welcome!</span>
          <span>What's on your mind?</span>
        </div>
      ) : (
        <ScrollArea className='h-[calc(100vh-12.3rem)]'>
          <div className='flex flex-1 flex-col justify-end gap-8' {...props}>
            {context!.conversations[
              context!.activeConversationIndex!
            ].messages.map((message, index) => (
              <Chat key={index} variant={message.role}>
                <Markdown>{message.content}</Markdown>
              </Chat>
            ))}
          </div>
        </ScrollArea>
      )}

      <form className='flex gap-2' onSubmit={(e) => handleSubmit(e)}>
        <Input
          className='bg-muted dark:bg-muted/50 shadow-sm'
          type='text'
          placeholder={
            isDisabled ? 'waiting for reply...' : 'Start chatting...'
          }
          value={userPromt}
          onChange={(e) => setUserPrompt(e.target.value)}
          disabled={isDisabled}
        />
        <Button type='submit'>
          <SendIcon />
        </Button>
      </form>
    </>
  );
}

export { Chat, ChatProvider };
