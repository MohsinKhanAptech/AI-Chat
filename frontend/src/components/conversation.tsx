import * as React from 'react';
import axios from 'axios';

// Define reusable types
type Conversation = {
  title: string;
  model: string;
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  created_at: string;
  updated_at: string;
};
type Model = {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    parent_model: string;
    format: string;
    family: string;
    families: Array<string>;
    parameter_size: string;
    quantization_level: string;
  };
};
type ConversationContextProps = {
  models: Array<Model>;
  setModels: React.Dispatch<React.SetStateAction<Array<Model>>>;
  activeModelIndex: number;
  setActiveModelIndex: React.Dispatch<React.SetStateAction<number>>;
  conversations: Array<Conversation>;
  setConversations: React.Dispatch<React.SetStateAction<Array<Conversation>>>;
  activeConversationIndex: number;
  setActiveConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  modelLoading: boolean;
  conversationLoading: boolean;
};

// Create context
const ConversationContext =
  React.createContext<ConversationContextProps | null>(null);

function ConversationProvider({ ...props }: React.ComponentProps<'div'>) {
  const [models, setModels] = React.useState<Array<Model>>([]);
  const [conversations, setConversations] = React.useState<Array<Conversation>>(
    []
  );

  const [activeModelIndex, setActiveModelIndex] = React.useState<number>(0);
  const [activeConversationIndex, setActiveConversationIndex] =
    React.useState<number>(-1);
  const [modelLoading, setModelLoading] = React.useState(false);
  const [conversationLoading, setConversationLoading] = React.useState(false);

  // Fetch models from the backend
  async function fetchModels() {
    try {
      setModelLoading(true);
      const response = await axios.get('http://localhost:5000/models');
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setModelLoading(false);
    }
  }

  // Fetch conversations from the backend
  async function fetchConversations() {
    try {
      setConversationLoading(true);
      const response = await axios.get('http://localhost:5000/conversations');
      setConversations(response.data);
      setActiveConversationIndex(response.data.length);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setConversationLoading(false);
    }
  }

  React.useEffect(() => {
    fetchModels();
    fetchConversations();
  }, []);

  const contextValue = React.useMemo(
    () => ({
      models,
      setModels,
      activeModelIndex,
      setActiveModelIndex,
      conversations,
      setConversations,
      activeConversationIndex,
      setActiveConversationIndex,
      modelLoading,
      conversationLoading,
    }),
    [
      models,
      setModels,
      activeModelIndex,
      setActiveModelIndex,
      conversations,
      setConversations,
      activeConversationIndex,
      setActiveConversationIndex,
      modelLoading,
      conversationLoading,
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
