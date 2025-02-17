import {AppLoader} from '@/components/AppLoader';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {EvilIcons, MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {useRouter} from 'expo-router';
import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {
  Actions,
  Bubble,
  GiftedChat,
  IMessage,
  Send,
} from 'react-native-gifted-chat';
import {io, Socket} from 'socket.io-client';

interface IMessages {
  _id: string | number;
  text: string;
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
}

type ChatFormProps = {
  chatUser: any;
};
export const ChatForm: FC<ChatFormProps> = ({chatUser}) => {
  const {themeColor} = useGlobalStore(state => state);
  const {currentUser} = useUserStore(state => state);
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const socket = io('http://192.168.0.198:4000');
  console.log(JSON.parse(chatUser), 'cheet user');
  const theUser = JSON.parse(chatUser);

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

  console.log(chatsData, 'chatsdata');
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://192.168.0.198:4000'); // Initialize socket only once
    }
    const socket = socketRef.current;
    socket.emit('userConnected', currentUser._id);
    // Listen for new messages from the server
    socket.on('newMessage', message => {
      console.log(message, 'messageeeeedee');
      setMessages(prevMessages => GiftedChat.append(prevMessages, [message]));
      // setMessages(prevMessages => [...prevMessages, message]);

      // if (message.receiverId === currentUser._id) {
      //   // setMessages(prevMessages => GiftedChat.append(prevMessages, [receivedMessage]));
      //   setMessages(prevMessages => GiftedChat.append(prevMessages, [message]));
      // }
    });

    // Cleanup on unmount
    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [currentUser._id]);
  // useEffect(() => {
  //   setMessages([
  //     //   {
  //     //     _id: 1,
  //     //     text: 'Hello developer',
  //     //     createdAt: new Date(),
  //     //     user: {
  //     //       _id: 2,
  //     //       name: 'React Native',
  //     //       avatar: 'https://placeimg.com/140/140/any',
  //     //     },
  //     //     sent: true,
  //     //     received: true,
  //     //   },

  //     {
  //       _id: 1,
  //       text: 'My received message',
  //       createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //       },
  //       //  image: 'https://facebook.github.io/react/img/logo_og.png',
  //       // additional custom parameters
  //       sent: true,
  //       received: true,
  //     },
  //     {
  //       _id: 2,
  //       text: 'My sent message',
  //       createdAt: new Date(Date.UTC(2016, 5, 11, 17, 21, 0)),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //       },
  //       //  image: 'https://facebook.github.io/react/img/logo_og.png',
  //       // additional custom parameters
  //       sent: true,
  //       received: true,
  //     },
  //   ]);
  // }, []);
  // const onSend = useCallback((newMessages: IMessage[] = []) => {
  //   console.log(newMessages, 'new messa');
  //   const item = newMessages.map(item => item);
  //   console.log(item, 'itemm');
  //   socket.emit('sendMessage', ...item);

  //   // const post = {
  //   //   text: 'deeee',
  //   //   userId: 1,
  //   //   username: 'dee',
  //   //   image: 'ddddd',
  //   // };
  //   // axios.post('http://192.168.0.198:4000/api/v1/user/chat', post);
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, newMessages),
  //   );
  // }, []);

  useEffect(() => {
    if (isSuccess && chatsData?.data?.chats?.length > 0) {
      setMessages(prevMessages =>
        GiftedChat.append(prevMessages, chatsData.data.chats),
      );
    }
  }, [isSuccess, chatsData]);

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
        sent: true,
      };
      console.log(formattedMessage, 'fmmess');
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [formattedMessage]),
      );

      // Send the message to your backend or Firebase
      //sendMessageToBackend(formattedMessage);
      socket.emit('sendMessage', formattedMessage);
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
    });

    if (response.canceled) {
      console.log('User cancelled image picker');
    } else {
      const {uri} = response.assets[0];
      const imageMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        user: {
          _id: currentUser._id, // Adjust to your user ID
          name: currentUser.username, // Adjust to your user's name
        },
        image: uri,
        text: '',
        receiverId: theUser._id,
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
      const {uri} = response.assets[0];
      const imageMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        user: {
          _id: 1, // Adjust to your user ID
          name: 'User Name', // Adjust to your user's name
        },
        image: uri || 'ddeee',
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

  const renderChatEmpty = () => {
    const {chats, code} = chatsData?.data || [];

    return (
      <View className="mx-auto">
        <Text>Hi! {currentUser.username}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    console.log(error, 'err users');
    chatsData?.data.chats.forEach((chat: any) => {
      if (!chat._id || !chat.createdAt) {
        console.warn('Missing `_id` or `createdAt` in message:', chat);
      }
    });

    const {message, code} = (error as any)?.data || {};
    const {userMessage, userCode} = chatsData?.data || {};

    if (isLoadingChats || isFetching)
      return (
        <View style={{paddingVertical: 20, marginTop: 80, alignSelf: 'center'}}>
          <AppLoader />
        </View>
      );
    // return (
    //   <View style={{paddingVertical: 20, marginTop: 80}}>
    //     <Text
    //       className="text-base font-sans text-center"
    //       style={{color: themeColor.text}}>
    //       {message || userMessage}
    //     </Text>
    //   </View>
    // );
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
        //renderChatEmpty={renderChatEmpty}
        renderFooter={renderFooter}
        // messageIdGenerator={message =>
        //   message
        //     ? `${message._id}_${message.createdAt}_${message.user.name}`
        //     : Math.random().toString(36).substring(7)
        // }

        keyExtractor={message =>
          message
            ? `${message._id}_${message.createdAt}_${
                message.user.name
              }_${Math.random().toString(36).substring(7)}`
            : Math.random().toString(36).substring(7)
        }

        //messagesContainerStyle={{backgroundColor: COLOUR_Dark_WHITE}}
      />
    </View>
  );
};
