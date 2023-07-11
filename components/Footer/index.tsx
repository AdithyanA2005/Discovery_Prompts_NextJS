import Link from "next/link";
import FooterSocials from "./FooterSocials";
import FooterThankYou from "./FooterThankYou";

type Props = {}

export default function Footer({ }: Props) {
  return (
    <>
      <footer className="mt-12 footer footer-center grid-flow-row lg:grid-flow-col p-6 lg:p-10 bg-base-200 text-base-content">
        <FooterSocials />
        <FooterThankYou />
      </footer>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className="tooltip tooltip-accent" data-tip="View Adithyan's Portfolio">
          <Link className="font-semibold tracking-wide hover:text-accent" href="https://adithyana.vercel.app" target="_blank" rel="noopener noreferrer">Created By Adithyan A</Link>
        </div>
      </footer>
    </>
  )
}