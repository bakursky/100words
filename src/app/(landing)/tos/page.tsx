import Image from "next/image";

export default function TosPage() {

  return (
    <div className="px-10 py-8 max-w-[640px] mx-auto">
      <a href="/welcome" className="flex flex-col items-center gap-2 hover:scale-95 transition-all">
        <Image src="/icon1.png" alt="100words logo" width={64} height={64} />
        100words.app
      </a>

      <div className="component-bg p-8 mt-12">

        <h1 className="flex text-[clamp(32px,4.5vw,58px)] font-light tracking-[-0.03em] leading-[1.1]">Terms and Conditions</h1>
        <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4 underline"><strong>Effective Date:</strong> 2026-01-03</p>


        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">1. Overview</h2>
        <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">This application ("App") provides journaling tools, including note storage, streak tracking, and optional AI-powered features. By using the App, you agree to these Terms.</p>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">2. Accounts</h2>
        <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">You must sign in using a third-party authentication provider (e.g., Google via Supabase Auth). You are responsible for maintaining access to your account.</p>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">3. User Content</h2>
        <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">You retain full ownership of all journal entries and content you create.</p>
        <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">You grant the App a limited license to store, encrypt, and process your content solely to provide the service.</p>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">4. Data Storage and Security</h2>
        <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">User notes are encrypted and stored using Supabase infrastructure. While strong security measures are used, absolute security cannot be guaranteed.</p>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">5. Paid Features</h2>
        <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
        <p>Some features require payment, processed through third-party providers such as Stripe.</p>
        <p>Paid features may include:</p>
        <ul className="pl-8 list-disc marker:text-neutral-800">
          <li>AI-generated daily and weekly reviews</li>
          <li>Premium journaling tools</li>
        </ul>
        </div>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">6. Billing and Subscriptions</h2>
        <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
        <p>Subscriptions renew automatically unless canceled.</p>
        <p>If you stop paying:</p>
        <ul className="pl-8 list-disc marker:text-neutral-800">
          <li>Premium features are disabled</li>
          <li>Your existing data remains safe and accessible (except premium functionality)</li>
        </ul>
        <p>No refunds are guaranteed unless required by law.</p>
        </div>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">7. Account Deletion</h2>
        <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
        <p>You may delete your account at any time.</p>
        <p>Upon deletion:</p>
        <ul className="pl-8 list-disc marker:text-neutral-800">
          <li>All user data, including notes and streaks, is permanently deleted from Supabase databases</li>
          <li>This action is irreversible</li>
        </ul>
        </div>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">8. Acceptable Use</h2>
        <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
        <p>You agree not to:</p>
        <ul className="pl-8 list-disc marker:text-neutral-800">
          <li>Use the App for illegal purposes</li>
          <li>Attempt to break, exploit, or reverse-engineer the system</li>
          <li>Abuse AI features or infrastructure</li>
        </ul>
        </div>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">9. Limitation of Liability</h2>
        <div className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">
        <p>The App is provided "as is" without warranties of any kind.</p>
        <p>We are not liable for:</p>
        <ul className="pl-8 list-disc marker:text-neutral-800">
          <li>Data loss</li>
          <li>Service interruptions</li>
          <li>Indirect or consequential damages</li>
        </ul>
        </div>
        
        <h2 className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em] pt-12">10. Changes to Terms</h2>
        <p className="text-[17px] text-[#666] font-light leading-[1.78] pt-4">We may update these Terms. Continued use of the App constitutes acceptance of changes.</p>

      </div>

    </div>
  )
}