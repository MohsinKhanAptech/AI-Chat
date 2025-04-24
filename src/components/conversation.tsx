import * as React from 'react';
import { InfinityIcon, LucideIcon, SparkleIcon } from 'lucide-react';

// Define reusable types
type Conversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<string>;
};
type Model = {
  name: string;
  icon: LucideIcon;
  type: 'Local Model' | 'Remote Model';
  conversations: Array<Conversation>;
};
type ConversationContextProps = {
  Models: Array<Model>;
  setModels: React.Dispatch<React.SetStateAction<Array<Model>>>;
  activeModel: Model;
  setActiveModel: React.Dispatch<React.SetStateAction<Model>>;
  activeConversation: Conversation | null;
  setActiveConversation: React.Dispatch<
    React.SetStateAction<Conversation | null>
  >;
};

// Create context
const ConversationContext =
  React.createContext<ConversationContextProps | null>(null);

function ConversationProvider({ ...props }: React.ComponentProps<'div'>) {
  const [Models, setModels] = React.useState<Array<Model>>([
    {
      name: 'Gemini',
      icon: SparkleIcon,
      type: 'Remote Model',
      conversations: [
        {
          id: '1',
          title: 'Gemini Conversation 1',
          createdAt: '2023-10-01T12:00:00Z',
          updatedAt: '2023-10-01T12:00:00Z',
          messages: ['Hi', 'Hi, how can I help you today?'],
        },
      ],
    },
    {
      name: 'Llama',
      icon: InfinityIcon,
      type: 'Local Model',
      conversations: [],
    },
  ]);
  const [activeModel, setActiveModel] = React.useState<Model>(Models[0]);
  const [activeConversation, setActiveConversation] =
    React.useState<Conversation | null>(null);

  const contextValue = React.useMemo(
    () => ({
      Models,
      setModels,
      activeModel,
      setActiveModel,
      activeConversation,
      setActiveConversation,
    }),
    [
      Models,
      setModels,
      activeModel,
      setActiveModel,
      activeConversation,
      setActiveConversation,
    ]
  );

  return (
    <ConversationContext.Provider value={contextValue}>
      <div {...props}></div>
    </ConversationContext.Provider>
  );
}

export { ConversationProvider, ConversationContext };
export type { Conversation, Model };
