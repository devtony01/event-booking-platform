import Link from 'next/link';
import * as React from "react";

export const Hero = () => {
  return (
    <section className="flex flex-wrap gap-[120px] justify-center items-center mt-8 w-full min-h-[563px] max-md:max-w-full">
      <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[562px] max-md:max-w-full">
        <div className="flex flex-col w-full text-stone-500 max-md:max-w-full">
          <h1 className="self-start text-6xl font-bold text-black leading-[64px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
            One Platform,<br />Two Solutions
          </h1>
          <h2 className="mt-8 text-3xl font-semibold leading-9 max-md:max-w-full">
            Simplifying Benefits for Retirees and<br />Employers
          </h2>
          <p className="mt-8 mr-8 text-base leading-6 max-md:mr-2.5 max-md:max-w-full">
            Whether you're a retiree claiming your benefits or an employer
            submitting employee data for verification, we've got you covered with a
            secure and seamless experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 pr-14 mt-7 w-full text-lg leading-none max-md:max-w-full">
          <Link
            href="/claim-benefits"
            className="flex relative flex-col px-8 py-3 bg-ui-camarone text-white aspect-[4.708] max-md:px-5 hover:opacity-90 transition-opacity duration-200 rounded"
          >
            <span className="relative z-10">Claim Your Benefits</span>
          </Link>
          <Link
            href="/upload-data"
            className="flex relative flex-col px-9 py-3 rounded border border-ui-camarone text-green-800 aspect-[5.333] w-fit max-md:px-5 hover:opacity-90 transition-opacity duration-200"
          >
            <span className="relative z-10">Upload Employee Data</span>
          </Link>
        </div>
      </div>
      <img
        loading="lazy"
        src="images/hero-image.png"
        alt="Platform illustration"
        className="object-contain self-stretch my-auto aspect-[0.78] w-[320px] hidden xl:flex"
      />
    </section>
  );
};

export default Hero