import { useAuth } from '@/hooks/use-auth';
import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { getUserNotifications } from '@/lib/user';

export const useNotification = () => {
  const { session } = useAuth();
  const client = useRef<Client>();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const hasUnreadNotification = notifications.some((notification) => !notification.read);

  const readNotification = (notificationId: number) => {
    client.current?.publish({
      destination: `/pub/notification/${session?.id}`,
      body: JSON.stringify({ notificationId }),
    });
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, read: true };
        }
        return notification;
      })
    );
  };

  useEffect(() => {
    if (!session) return;

    client.current = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_WS_HOST}/stomp`,
      connectHeaders: { Authorization: sessionStorage.getItem('Authorization') as string },
      onConnect: () => {
        if (!client.current) return;
        client.current.subscribe(`/sub/notification/${session.id}`, onMessageReceived);
      },
      onStompError: (frame) => console.log(frame),
    });
    client.current.activate();

    const onMessageReceived = (iMessage: IMessage) => {
      const notification = JSON.parse(iMessage.body);
      setNotifications((prev) => [...prev, notification]);
    };

    getUserNotifications().then(setNotifications);

    return () => {
      client.current?.deactivate();
      setNotifications([]);
    };
  }, [session]);

  return { notifications, readNotification, hasUnreadNotification };
};
