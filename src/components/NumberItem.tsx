interface Props {
  number: number;
  bgColor?: string;
}

export const NumberItem = ({ number, bgColor = '#dbd8d7' }: Props) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className='flex items-center justify-center w-6 h-6 text-sm font-bold text-black rounded-full'
    >
      {number}
    </div>
  );
};
