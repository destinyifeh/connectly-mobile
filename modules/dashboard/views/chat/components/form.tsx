import {AppLoader} from '@/components/AppLoader';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {SocketContext} from '@/contexts/socketContext';
import {dismissAllNotifications} from '@/helpers/services/app-notification/configure-notifications';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {EvilIcons, MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {useRouter} from 'expo-router';
import {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {
  Actions,
  Bubble,
  GiftedChat,
  IMessage,
  Send,
} from 'react-native-gifted-chat';
import {Toast} from 'toastify-react-native';

interface IMessages {
  _id: string | number;
  text?: string;
  createdAt: Date | number;
  user: {
    _id: string | number;
    name?: string; // <-- Make it optional
  };
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  receiverId?: string;
}

// Extend IMessage to add receiverId
interface CustomMessage extends IMessage {
  receiverId?: string; // ✅ Add receiverId
  senderId?: string;
  senderPhoto?: string;
  receiverPhoto?: string;
}

type ChatFormProps = {
  chatUser: any;
};
export const ChatForm: FC<ChatFormProps> = ({chatUser}) => {
  const {themeColor, setIsChatting} = useGlobalStore(state => state);
  const {currentUser} = useUserStore(state => state);
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  const socket = useContext(SocketContext);
  console.log(JSON.parse(chatUser), 'cheet user');
  const theUser = JSON.parse(chatUser);
  console.log(socket, 'sockerrr');
  const {
    isSuccess,
    isLoading: isLoadingChats,
    isFetching,
    isError,
    error,
    refetch,
    data: chatsData,
  } = apiHookRequester.useFetchData(
    currentUser._id
      ? `/api/v1/user/chat/${currentUser?._id}/${theUser._id}`
      : '',
    'chatUsers',
  );

  console.log(chatsData, 'chatdata');
  useEffect(() => {
    dismissAllNotifications();
    setIsChatting(true);

    return () => {
      setIsChatting(false);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    // Listen for new messages from the server
    socket.on('newMessage', message => {
      console.log(message, 'messageeeeedee');
      const updatedMessage = {...message, received: true};
      setIsChatting(true);
      setMessages(prevMessages =>
        GiftedChat.append(prevMessages, [updatedMessage]),
      );

      // Notify the server that this message was received
      socket.emit('messageReceived', {
        messageId: message._id,
        receiverId: currentUser._id, // The person who just received it
        senderId: theUser._id,
      });
    });

    // Cleanup on unmount
    return () => {
      socket.off('newMessage');
      setIsChatting(false);
    };
  }, [currentUser._id, socket]);

  useEffect(() => {
    if (!socket) return;
    console.log('📡 Listening for messageSaved events...');

    socket.on('messageSaved', message => {
      console.log('📩 Received messageSaved event:', message);
      setMessages(prevMessages => GiftedChat.append(prevMessages, [message]));
    });

    return () => {
      console.log('🛑 Removing messageSaved listener...');
      socket.off('messageSaved');
    };
  }, [socket]);

  useEffect(() => {
    if (isSuccess && chatsData?.data?.chats?.length > 0) {
      setMessages([]);

      setMessages(prevMessages =>
        GiftedChat.append(prevMessages, chatsData.data.chats),
      );
    }
  }, [isSuccess, chatsData]);

  useEffect(() => {
    if (!socket) return;

    socket.on('typing', ({senderId, isTyping}) => {
      console.log(`User ${senderId} is ${isTyping ? 'typing' : 'not typing'}`);
      if (isTyping) {
        console.log('okayyyy');
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off('typing');
      setIsTyping(false);
    };
  }, [theUser._id, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('messageReceivedStatus', ({messageId, received}) => {
      console.log(
        `Message ${messageId} status updated to received: ${received}`,
      );

      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg._id === messageId ? {...msg, received} : msg,
        ),
      );
    });

    return () => {
      socket.off('messageReceivedStatus');
    };
  }, [socket]);

  const onSend = useCallback(
    (newMessages: CustomMessage[] = []) => {
      if (!newMessages.length) return;
      const message = newMessages[0]; // Get the latest message
      console.log(message, 'fmmessMe');

      const formattedMessage: CustomMessage = {
        ...message,
        _id: message._id ?? Date.now().toString(), // ID of the person receiving the message
        createdAt: new Date(),
        receiverId: theUser._id,
        senderId: currentUser._id,
        received: false,
        sent: false,
        pending: true,
        //senderPhoto:currentUser.profilePhoto.url,
        //receiverPhoto:theUser.profilePhoto.url,
      };
      console.log(formattedMessage, 'fmmess');

      socket?.emit('sendMessage', formattedMessage);
    },
    [theUser],
  );

  const renderSend = (props: any) => (
    <Send {...props}>
      <View style={{marginBottom: 11, marginRight: 10}}>
        <MaterialIcons name="send" size={24} color={APP_DEFAULT_COLOUR} />
      </View>
    </Send>
  );

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0', // Background color for received messages
        },
        right: {
          backgroundColor: APP_DEFAULT_COLOUR, // Background color for sent messages
        },
      }}
      textStyle={{
        left: {
          color: '#000000', // Text color for received messages
        },
        right: {
          color: '#ffffff', // Text color for sent messages
        },
      }}
    />
  );

  const handlePickImage = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (response.canceled) {
      console.log('User cancelled image picker');
    } else {
      console.log(response.assets, 'myuyuu');
      const {uri, type, mimeType, width, base64, fileSize} = response.assets[0];

      // Convert size from bytes to MB
      const ONE_MB = 1000000;

      // Allowed MIME types
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      // Check file size
      if (fileSize && fileSize > ONE_MB) {
        Toast.error('File too big!.', 'bottom');
        return;
      }

      // Check file type
      if (!allowedMimeTypes.includes(mimeType?.toLowerCase() || '')) {
        Toast.error('Unsupported file type!', 'bottom');
        return;
      }
      const imageMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        user: {
          _id: currentUser._id,
          name: currentUser.username,
        },
        image: 'data:image/jpeg;base64,' + base64,
        text: '',
        receiverId: theUser._id,
        received: false,
        pending: true,
        sent: false,
        //senderPhoto:currentUser.profilePhoto.url,
        //receiverPhoto:theUser.profilePhoto.url,
      };
      onSend([imageMessage]);
    }
  };

  const handlePickPhoto = async () => {
    let response = await ImagePicker.launchCameraAsync({
      //mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (response.canceled) {
      console.log('User cancelled image picker');
    } else {
      const {uri, base64} = response.assets[0];
      const imageMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        user: {
          _id: 1, // Adjust to your user ID
          name: 'User Name', // Adjust to your user's name
        },
        image: 'data:image/jpeg;base64,' + base64 || undefined,
        text: 'destoo',
      };
      onSend([imageMessage]);
    }
  };
  const renderActions = (props: any) => (
    <Actions
      {...props}
      containerStyle={{backgroundColor: '#fff'}}
      //   options={{
      //     'Choose From Library': handlePickImage,
      //     //   Camera: handlePickPhoto,
      //   }}
      onPressActionButton={handlePickImage}
      icon={() => <EvilIcons name="camera" size={24} color="black" />}
      //  onSend={args => console.log(args)}
    />
  );

  const renderLoading = () => {
    if (isLoadingChats) {
      return (
        <View className="mx-auto">
          <AppLoader />
        </View>
      );
    }
  };

  // Call this function on text input change
  const handleTyping = (text: string) => {
    // Emit typing event: true if there is text, false otherwise
    socket?.emit('typing', {
      senderId: currentUser._id,
      receiverId: theUser._id,
      isTyping: text.length > 0,
    });
  };
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser._id,
          name: currentUser.username,
        }}
        renderSend={renderSend}
        renderBubble={renderBubble}
        renderActions={renderActions}
        renderLoading={renderLoading}
        isTyping={isTyping}
        onInputTextChanged={handleTyping}
        renderMessageImage={props => (
          <Image
            source={{uri: props.currentMessage.image}}
            style={{
              width: 200,
              height: 200,
              borderRadius: 15,
              margin: 3,
            }}
            resizeMode="cover"
          />
        )}
        //renderChatEmpty={renderChatEmpty}
        //renderFooter={renderFooter}

        //messagesContainerStyle={{backgroundColor: COLOUR_Dark_WHITE}}
      />
    </View>
  );
};
