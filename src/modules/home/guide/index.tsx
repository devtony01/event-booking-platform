
import { Step } from './step';
import { Tab } from './tab';

const steps = [
    {
        number: 1,
        title: "Create Your Profile",
        description: "Start by creating an account. you'll be asked to provide basic personal information to get started."
    },
    {
        number: 2,
        title: "Create Your Profile",
        description: "Start by creating an account. you'll be asked to provide basic personal information to get started."
    },
    {
        number: 3,
        title: "Create Your Profile",
        description: "Start by creating an account. you'll be asked to provide basic personal information to get started."
    },
    {
        number: 4,
        title: "Create Your Profile",
        description: "Start by creating an account. you'll be asked to provide basic personal information to get started."
    }
];

const Guide = () => {
    return (
        <div className="flex overflow-hidden flex-wrap gap-10 items-start bg-white">
            <img
                loading="lazy"
                src="images/guide-image-left.png"
                alt=""
                className="object-contain grow shrink mt-auto aspect-[0.87] min-w-[240px] w-[282px] hidden xl:flex"
            />
            <div className="flex flex-col grow shrink gap-5 items-center self-stretch py-24 min-w-[240px] w-[527px] max-md:max-w-full max-sm:gap-7">
                <div className="flex flex-col mt-7 max-w-full w-[314px] max-sm:justify-center max-sm:items-center max-sm:self-center max-sm:w-auto">
                    <div className="flex gap-2 justify-center items-center mt-6 w-full text-5xl font-bold leading-none max-md:text-4xl max-sm:justify-center max-sm:self-center max-sm:w-auto">
                        <div className="w-auto grow-0 text-neutral-950 max-md:text-4xl max-sm:w-auto max-sm:grow-0">
                            How it
                        </div>
                        <div className="shrink w-auto text-green-800 grow-0 max-md:text-4xl max-sm:w-auto max-sm:grow-0">
                            works
                        </div>
                    </div>
                    <div className="px-4 py-2.5 w-full h-auto text-base text-center text-stone-500 max-sm:self-center max-sm:w-auto">
                        Follow these easy steps to get started
                    </div>
                </div>
                <div className="flex flex-col gap-5 max-w-full text-base w-[501px] max-sm:gap-5">
                    <div className="flex flex-row justify-between self-stretch px-11 py-3 w-full text-base whitespace-nowrap rounded-2xl bg-zinc-100 min-h-[64px] text-stone-500 max-md:px-5 max-md:max-w-full max-sm:flex max-sm:flex-row max-sm:gap-5 max-sm:justify-around max-sm:pt-3">
                        <Tab label="Retiree" isActive={true} />
                        <Tab label="PFA" />
                        <Tab label="MDA" />
                    </div>
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            number={step.number}
                            title={step.title}
                            description={step.description}
                        />
                    ))}
                </div>
            </div>
            <img
                loading="lazy"
                src="images/guide-image-right.png"
                alt=""
                className="object-contain grow shrink mt-auto aspect-[0.87] min-w-[240px] w-[282px] hidden xl:flex"
            />
        </div>
    );
}

export default Guide