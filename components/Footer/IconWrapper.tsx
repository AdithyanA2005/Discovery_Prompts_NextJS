import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  link: `https://${string}`;
  title: string;
  children: ReactNode;
}

export default function IconWrapper({ link, title, children }: Props) {
  return (
    <div className="tooltip tooltip-primary" data-tip={`View ${title}`}>
      <Link className="text-xl text-primary" href={link} rel="noopener noreferrer" target="_blank">
        {children}
      </Link>
    </div>
  )
}