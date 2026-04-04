import Image from "next/image";

export default function PrivacyPage() {

    return (

        <div className="px-10 py-8 max-w-[640px] mx-auto">
            <a href="/welcome" className="flex flex-col items-center gap-2 hover:scale-95 transition-all">
                <Image src="/icon1.png" alt="100words logo" width={64} height={64} />
                100words.app
            </a>

            <div className="component-bg p-8 mt-12">

                <h1 className="flex text-[clamp(32px,4.5vw,58px)] font-light tracking-[-0.03em] leading-[1.1]">Privacy Policy</h1>
                <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4 underline"><strong>Effective Date:</strong> 2026-01-03</p>


                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">1. Information We Collect</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    <h3>a. Authentication Data</h3>
                    <p>We collect basic account information via Supabase Auth using Google login. This may include:</p>
                    <ul className="pl-8 list-disc marker:text-neutral-800 marker:text-neutral-800">
                        <li>Email address</li>
                        <li>Name</li>
                        <li>Profile image (if provided by Google)</li>
                    </ul>
                    <h3>b. User Content</h3>
                    <ul className="pl-8 list-disc marker:text-neutral-800">
                        <li>Journal entries (encrypted)</li>
                        <li>Streak data and usage activity</li>
                    </ul>
                    <h3>c. Payment Information</h3>
                    <p>Payments are processed by third-party providers such as Stripe. We do not store your payment details.</p>
                </div>


                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">2. How We Use Information</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    <p>We use collected data to:</p>
                    <ul className="pl-8 list-disc marker:text-neutral-800">
                        <li>Provide journaling functionality</li>
                        <li>Store and retrieve encrypted notes</li>
                        <li>Track user streaks</li>
                        <li>Enable AI-powered features (if subscribed)</li>
                        <li>Manage subscriptions and payments</li>
                    </ul>
                </div>


                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">3. Data Storage and Security</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    <ul className="pl-8 list-disc marker:text-neutral-800">
                        <li>Notes are encrypted using Supabase Vault</li>
                        <li>Data is stored on secure Supabase infrastructure</li>
                        <li>We implement reasonable safeguards, but no system is 100% secure</li>
                    </ul>
                </div>

                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">4. Data Sharing</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    <p>We only share data with essential service providers:</p>
                    <ul className="pl-8 list-disc marker:text-neutral-800">
                        <li>Supabase (database and authentication)</li>
                        <li>Stripe (payment processing)</li>
                    </ul>
                    <p>We do not sell or rent your personal data.</p>
                </div>

                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">5. Data Retention</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    <p>We retain your data as long as your account is active.</p>
                    <p>When you delete your account:</p>
                    <ul className="pl-8 list-disc marker:text-neutral-800">
                        <li>All personal data, notes, and streak data are permanently deleted</li>
                        <li>This deletion cannot be undone</li>
                    </ul>
                </div>

                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">6. Your Rights</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    <p>You can:</p>
                    <ul className="pl-8 list-disc marker:text-neutral-800">
                        <li>Access your data</li>
                        <li>Delete your account at any time</li>
                        <li>Stop using paid features by canceling your subscription</li>
                    </ul>
                </div>

                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">7. Children’s Privacy</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                    <p>The App is not intended for users under 13.</p>
                </div>

                <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">8. Changes to This Policy</h2>
                <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
                <p>We may update this Privacy Policy. Continued use of the App means you accept the updated version.</p>
                </div>

            </div>

        </div>

    )
}