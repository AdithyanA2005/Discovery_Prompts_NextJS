type Props = {
  heading: string;
  headingSpecial: string;
  description: string;
};

export default function HeroSection({ heading, headingSpecial, description }: Props) {
  return (
    <section className="my-[3vh] sm:my-[8vh] md:my-[9vh] w-full flex flex-col justify-center items-center">
      {/* Heading */}
      <h1 className="font-bold leading-[3rem] sm:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem] text-[2.5rem] sm:text-5xl md:text-[3.25rem] lg:text-6xl xl:text-7xl text-center">
        <span>{heading}</span>
        <br />
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{headingSpecial}</span>
      </h1>

      {/* Description */}
      <p className="tracking-wider md:leading-8 md:text-lg mt-4 sm:mt-6 md:mt-9 max-w-lg sm:max-w-xl md:max-w-2xl text-center">
        {description}
      </p>
    </section>
  );
}

