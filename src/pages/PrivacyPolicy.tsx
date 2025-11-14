import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card border border-border rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground italic mb-8">Last Updated: November 13, 2025</p>

          <p className="text-foreground/90 leading-relaxed mb-8">Welcome to Lokal. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your information. This Privacy Policy explains our practices regarding your data when you use our mobile application and services.</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-2">1.1 Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, username, and password.</li>
                <li><strong>Profile Information:</strong> You may provide additional information such as a profile picture, bio, and other profile details.</li>
                <li><strong>Content:</strong> We collect the videos, photos, comments, and other content you create, upload, or share through the app.</li>
                <li><strong>Business Information:</strong> If you register as a business or influencer, we may collect business name, address, contact information, and payment details.</li>
                <li><strong>Communications:</strong> When you contact us or communicate through the app, we collect the content of those communications.</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">1.2 Information Collected Automatically</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li><strong>Location Data:</strong> We collect precise location information through GPS and Bluetooth Low Energy (BLE) beacon technology to provide location-based features, connect you with local content, and enable business attribution and analytics.</li>
                <li><strong>Device Information:</strong> We collect information about your device, including device model, operating system, unique device identifiers, mobile network information, and device settings.</li>
                <li><strong>Usage Data:</strong> We collect information about how you use the app, including videos watched, search queries, interactions with content, features used, and time spent in the app.</li>
                <li><strong>Analytics Data:</strong> We collect analytics information including app performance, crash reports, and user engagement metrics.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">2. How We Use Your Information</h2>
              <p className="text-foreground/90 leading-relaxed mb-3">We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li><strong>Provide and Maintain Services:</strong> To operate and provide you with the features and functionality of Lokal.</li>
                <li><strong>Personalization:</strong> To personalize your experience, including showing you relevant local content and recommendations based on your location and interests.</li>
                <li><strong>Location-Based Features:</strong> To connect you with local businesses, influencers, and community content in your area.</li>
                <li><strong>Business Services:</strong> To facilitate connections between businesses and influencers, manage advertising campaigns, and provide analytics and attribution services.</li>
                <li><strong>Communication:</strong> To send you updates, notifications, and respond to your inquiries.</li>
                <li><strong>Safety and Security:</strong> To protect the safety and security of our users and enforce our Terms of Service.</li>
                <li><strong>Analytics and Improvement:</strong> To understand how users interact with the app and improve our services.</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and respond to lawful requests.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">3. How We Share Your Information</h2>
              <p className="text-foreground/90 leading-relaxed mb-3">We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li><strong>Public Content:</strong> Content you post publicly (videos, comments, profile information) is visible to other users of the app.</li>
                <li><strong>Business Partners:</strong> When you interact with business content or influencer partnerships, relevant information may be shared to facilitate those services.</li>
                <li><strong>Service Providers:</strong> We work with third-party service providers who help us operate the app, including:
                  <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                    <li>Supabase for authentication and backend services</li>
                    <li>Cloudflare R2 for video storage and delivery</li>
                    <li>Analytics providers for app performance and usage analytics</li>
                  </ul>
                </li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal process.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
                <li><strong>With Your Consent:</strong> We may share information with third parties when you give us explicit consent to do so.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">4. Your Privacy Rights and Choices</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-2">4.1 Access and Control</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li><strong>Account Information:</strong> You can access and update your account information through the app settings.</li>
                <li><strong>Content Deletion:</strong> You can delete your posts and content at any time through the app.</li>
                <li><strong>Account Deletion:</strong> You can request deletion of your account by contacting us.</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">4.2 Location Services</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>You can control location permissions through your device settings.</li>
                <li>Disabling location services will limit certain features of the app.</li>
                <li>You can disable Bluetooth to prevent BLE beacon detection, though this will affect location-based features.</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">4.3 Communications</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>You can opt out of promotional communications by following the unsubscribe instructions in those messages.</li>
                <li>You cannot opt out of service-related communications that are necessary for the operation of the app.</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">4.4 Privacy Rights by Location</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">Depending on your location, you may have additional rights including:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Right to access your personal data</li>
                <li>Right to correction of inaccurate data</li>
                <li>Right to deletion of your data</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed">To exercise these rights, please contact us using the information provided below.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">5. Data Security</h2>
              <p className="text-foreground/90 leading-relaxed mb-3">We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication systems</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication requirements</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed">However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">6. Data Retention</h2>
              <p className="text-foreground/90 leading-relaxed">We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will delete or anonymize your information, except where we are required to retain it for legal, regulatory, or legitimate business purposes.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">7. Children's Privacy</h2>
              <p className="text-foreground/90 leading-relaxed">Lokal is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">8. International Data Transfers</h2>
              <p className="text-foreground/90 leading-relaxed">Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than your country. We take steps to ensure that your information receives an adequate level of protection in the jurisdictions in which we process it.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">9. Third-Party Services and Links</h2>
              <p className="text-foreground/90 leading-relaxed">Our app may contain links to third-party websites or services. This Privacy Policy does not apply to those third-party services. We encourage you to review the privacy policies of any third-party services you access through our app.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-foreground/90 leading-relaxed">We may update this Privacy Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this policy. We will notify you of any material changes through the app or by email. Your continued use of the app after changes become effective constitutes acceptance of the updated Privacy Policy.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">11. Contact Us</h2>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:</p>
                <div className="space-y-1 text-foreground/90 mb-4">
                  <p><strong>Email:</strong> <a href="mailto:privacy@sharelokal.com" className="text-primary hover:underline">privacy@sharelokal.com</a></p>
                  <p><strong>Website:</strong> <a href="https://sharelokal.com" className="text-primary hover:underline">sharelokal.com</a></p>
                </div>
                <p className="text-foreground/90 text-sm">For privacy-related inquiries and to exercise your privacy rights, please include "Privacy Request" in the subject line of your email.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">12. California Privacy Rights</h2>
              <p className="text-foreground/90 leading-relaxed mb-3">If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Right to know what personal information we collect, use, disclose, and sell</li>
                <li>Right to request deletion of your personal information</li>
                <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                <li>Right to non-discrimination for exercising your CCPA rights</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed">To exercise these rights, please contact us using the information provided above.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
