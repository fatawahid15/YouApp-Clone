"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import clsx from "clsx";

type NotificationType = "success" | "error";
interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notify: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);

  const notify = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {visible && notification && (
        <div
          className={clsx(
            "fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-md text-white font-medium",
            {
              "bg-green-500": notification.type === "success",
              "bg-red-500": notification.type === "error",
            }
          )}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
