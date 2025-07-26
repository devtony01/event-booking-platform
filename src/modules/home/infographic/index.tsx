import { Card } from "./feature-card";

const cardData = [
    {
        icon: "svg/bank-note-05.svg",
        title: "Secure and Reliable",
        description: "Our platform is designed with simplicity in mind. Whether you're a retiree submitting your employment history or an employer managing records, the process is quick and easy, with clear instructions at every step.",
        alt: "Security Icon"
    },
    {
        icon: "svg/book-02.svg",
        title: "User Friendly Interface",
        description: "Our platform is designed with simplicity in mind. Whether you're a retiree submitting your employment history or an employer managing records, the process is quick and easy, with clear instructions at every step.",
        alt: "Interface Icon"
    },
    {
        icon: "svg/help-circle-contained.svg",
        title: "Fast Processing",
        description: "Our platform is designed with simplicity in mind. Whether you're a retiree submitting your employment history or an employer managing records, the process is quick and easy, with clear instructions at every step.",
        alt: "Speed Icon"
    },
    {
        icon: "svg/shield-check.svg",
        title: "24/7 Support",
        description: "Our platform is designed with simplicity in mind. Whether you're a retiree submitting your employment history or an employer managing records, the process is quick and easy, with clear instructions at every step.",
        alt: "Support Icon"
    },
    {
        icon: "svg/users-profiles-03.svg",
        title: "Data Protection",
        description: "Our platform is designed with simplicity in mind. Whether you're a retiree submitting your employment history or an employer managing records, the process is quick and easy, with clear instructions at every step.",
        alt: "Protection Icon"
    }
];

const Infographic = () => {

    return (
        <section className="flex overflow-hidden flex-col sm:items-center px-28 py-28 w-full bg-zinc-100 max-md:px-5 max-md:py-24 max-md:max-w-full">
            <div className="flex flex-col sm:items-center items-start text-5xl font-bold leading-none max-md:max-w-full max-md:text-4xl">
                <div className="mt-11 text-neutral-950 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                    Retiree data processing
                </div>
                <div className="text-green-800 max-md:text-4xl">made easy!</div>
            </div>
            <div className="flex flex-wrap gap-8 items-start justify-center mt-16 max-w-full w-[1224px] max-md:mt-10">
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>
        </section>

    );
}

export default Infographic