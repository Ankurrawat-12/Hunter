interface NotificationProps {
    message: string | null;
}

export default function Notification({ message }: NotificationProps) {
    if (!message) return null;
    
    return (
        <div className="fixed top-4 right-4 z-[60] bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in font-bold border border-green-400">
            {message}
        </div>
    );
}
