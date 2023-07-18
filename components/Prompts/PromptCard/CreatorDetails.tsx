import Image from "next/image";

type Props = {
  name: string;
  email: string;
  imgSrc: string;
  handleProfileClick: () => void;
}

export default function CreatorDetails({ name, email, imgSrc, handleProfileClick }: Props) {
  return (
    <div onClick={handleProfileClick} className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
      <Image
        src={imgSrc}
        alt="Creator"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />

      <div className="flex flex-col">
        <h3 className="font-semibold text-[1.1rem] text-gray-200"> {name} </h3>
        <p className="font-inter text-xs text-gray-300"> {email} </p>
      </div>
    </div>
  )
}
