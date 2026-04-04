import Image from "next/image";

export default function AboutPage() {

    return (
        <div className="px-10 py-8 max-w-[640px] mx-auto">

            <a href="/welcome" className="flex flex-col items-center gap-2 hover:scale-95 transition-all">
                    <Image src="/icon1.png" alt="100words logo" width={64} height={64} />
                    100words.app
            </a>

            <div className="component-bg p-8 mt-12">
                <h1 className="flex text-[clamp(32px,4.5vw,58px)] font-light tracking-[-0.03em] leading-[1.1] mb-16">
                    About
                </h1>

                <p className="text-[17px] text-[#666] font-light leading-[1.78]">
                    100 Words is a tool designed to help people develop the habit of journaling. Thanks to the unique principles built into its foundation, the simple act of typing transforms into an engaging process. The app features an ultra-minimalist design and serves a single purpose—but it does it better than anyone else.
                </p>

                {/* <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-8">
                    The app challenges the idea that modern technology robs us of privacy and authenticity. By making journaling a daily habit, you can rediscover yourself and improve your life.
                </p> */}

                <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-8">
                    100 Words is perfect for anyone who loves to write: as a complementary tool for therapy, for self-reflection, for learning a new language, or for describing your life.
                </p>

                <div className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">Who built this</div>

                <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    100words.app was created by Ivan, an indie developer who has been keeping a journal for over five years. His primary goal was to create an app that would demonstrate how simple journaling is and how beneficial it can be for others. He developed the app in his spare time, outside of his main job, investing a great deal of time and effort into it.
                </p>

                <div className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">Contact</div>

                <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    Please email us with any questions or suggestions <a className="text-neutral-400" href="mailto:help@100words.app">help@100words.app</a>
                </p>
            </div>
        </div>
    )
}