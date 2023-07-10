type Props = {
  heading: string;
  headingSpecial: string;
  description: string;
}

export default function HeroSection({ heading, headingSpecial, description }: Props) {
  return (
    <section className="mt-8 w-full flex flex-col items-center">
      <h1 className="font-bold leading-[4rem] text-5xl text-center">
        <span>{heading}</span>
        <br />
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{headingSpecial}</span>
      </h1>

      <p className="tracking-wider mt-6 max-w-2xl text-center">
        {description}
      </p>
    </section>
  )
}

