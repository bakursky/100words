export default function tos() {

    return (
        <div className="px-10 py-32 max-w-[1200px] mx-auto">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> 2026-03-19</p>
            <h2 className="pt-4">1. Information We Collect</h2>
            <h3>a. Authentication Data</h3>
            <p>We collect basic account information via Supabase Auth using Google login. This may include:</p>
            <ul>
                <li>Email address</li>
                <li>Name</li>
                <li>Profile image (if provided by Google)</li>
            </ul>
            <h3>b. User Content</h3>
            <ul>
                <li>Journal entries (encrypted)</li>
                <li>Streak data and usage activity</li>
            </ul>
            <h3>c. Payment Information</h3>
            <p>Payments are processed by third-party providers such as Stripe and Polar.sh. We do not store your payment details.</p>
            <h2 className="pt-4">2. How We Use Information</h2>
            <p>We use collected data to:</p>
            <ul>
                <li>Provide journaling functionality</li>
                <li>Store and retrieve encrypted notes</li>
                <li>Track user streaks</li>
                <li>Enable AI-powered features (if subscribed)</li>
                <li>Manage subscriptions and payments</li>
            </ul>
            <h2 className="pt-4">3. Data Storage and Security</h2>
            <ul>
                <li>Notes are encrypted using Supabase Vault</li>
                <li>Data is stored on secure Supabase infrastructure</li>
                <li>We implement reasonable safeguards, but no system is 100% secure</li>
            </ul>
            <h2 className="pt-4">4. Data Sharing</h2>
            <p>We only share data with essential service providers:</p>
            <ul>
                <li>Supabase (database and authentication)</li>
                <li>Stripe (payment processing)</li>
                <li>Polar.sh (payment processing)</li>
            </ul>
            <p>We do not sell or rent your personal data.</p>
            <h2 className="pt-4">5. Data Retention</h2>
            <p>We retain your data as long as your account is active.</p>
            <p>When you delete your account:</p>
            <ul>
                <li>All personal data, notes, and streak data are permanently deleted</li>
                <li>This deletion cannot be undone</li>
            </ul>
            <h2 className="pt-4">6. Your Rights</h2>
            <p>You can:</p>
            <ul>
                <li>Access your data</li>
                <li>Delete your account at any time</li>
                <li>Stop using paid features by canceling your subscription</li>
            </ul>
            <h2 className="pt-4">7. Children’s Privacy</h2>
            <p>The App is not intended for users under 13.</p>
            <h2 className="pt-4">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy. Continued use of the App means you accept the updated version.</p>
        </div>
    )
}