import { NotificationProvider } from "@/components/NotificationProvider";

export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <NotificationProvider>
        {children}
      </NotificationProvider>
    );
  }