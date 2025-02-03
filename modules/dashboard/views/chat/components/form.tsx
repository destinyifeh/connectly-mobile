import {AppLoader} from '@/components/AppLoader';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {globalStore} from '@/stores/global-store';
import {EvilIcons, MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {useRouter} from 'expo-router';
import {FC, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import io from 'socket.io-client';

import {
  Actions,
  Bubble,
  GiftedChat,
  IMessage,
  Send,
} from 'react-native-gifted-chat';
export interface IMessages {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: object;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: string;
}

type ChatFormProps = {
  chatUser?: object;
};
export const ChatForm: FC<ChatFormProps> = ({chatUser}) => {
  const {themeColor} = globalStore(state => state);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const router = useRouter();
  const socket = io('http://192.168.0.198:4000');

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('newMessage', message => {
      console.log(message, 'messageeeeedee');
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('newMessage');
    };
  }, []);
  useEffect(() => {
    setMessages([
      //   {
      //     _id: 1,
      //     text: 'Hello developer',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'React Native',
      //       avatar: 'https://placeimg.com/140/140/any',
      //     },
      //     sent: true,
      //     received: true,
      //   },

      {
        _id: 1,
        text: 'My received message',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        //  image: 'https://facebook.github.io/react/img/logo_og.png',
        // additional custom parameters
        sent: true,
        received: true,
      },
      {
        _id: 2,
        text: 'My sent message',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 21, 0)),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        //  image: 'https://facebook.github.io/react/img/logo_og.png',
        // additional custom parameters
        sent: true,
        received: true,
      },
    ]);
  }, []);
  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const item = newMessages.map(item => item);
    console.log(item, 'itemm');
    socket.emit('sendMessage', ...item);

    // const post = {
    //   text: 'deeee',
    //   userId: 1,
    //   username: 'dee',
    //   image: 'ddddd',
    // };
    // axios.post('http://192.168.0.198:4000/api/v1/user/chat', post);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

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
          _id: 1, // Adjust to your user ID
          name: 'User Name', // Adjust to your user's name
        },
        image: uri,
        text: '',
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

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 2,
        name: 'React Native',
      }}
      renderSend={renderSend}
      renderBubble={renderBubble}
      renderActions={renderActions}
      renderLoading={() => <AppLoader />}

      //messagesContainerStyle={{backgroundColor: COLOUR_Dark_WHITE}}
    />
  );
};
