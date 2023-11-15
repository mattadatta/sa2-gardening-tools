interface ButtonProps {
    onPress: () => void;
    label: string;
}

export default function Button({ onPress, label }: ButtonProps) {
    return (
        <button
            className='bg-blue-500 rounded-lg px-5 py-2 text-white cursor-pointer'
            onClick={onPress}>
            {label}
        </button>
    );
};
