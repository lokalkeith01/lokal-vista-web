import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card border border-border rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground italic mb-8">Last Updated: November 13, 2025</p>

          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Please read these Terms of Service carefully before using Lokal. By accessing or using our application, you agree to be bound by these Terms. If you do not agree to these Terms, do not use Lokal.
            </AlertDescription>
          </Alert>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">1. Acceptance of Terms</h2>
              <p className="text-foreground/90 leading-relaxed">These Terms of Service ("Terms") constitute a legally binding agreement between you and Lokal ("we," "us," or "our") regarding your use of the Lokal mobile application and related services (collectively, the "Service"). By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">2. Eligibility</h2>
              <p className="text-foreground/90 leading-relaxed mb-3">To use Lokal, you must:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li>Be at least 13 years of age</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Not be prohibited from using the Service under applicable laws</li>
                <li>Comply with all local, state, national, and international laws and regulations</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-3">Users between 13 and 18 years of age must have parental or guardian consent to use the Service. By using the Service as a minor, you represent that you have obtained such consent.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">3. Account Registration and Security</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">3.1 Account Creation</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">To access certain features of Lokal, you must create an account. You agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account credentials</li>
                <li>Notify us immediately of any unauthorized access or security breach</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">3.2 Account Types</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">Lokal offers different account types:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li><strong>Personal Accounts:</strong> For individual users to create, share, and view content</li>
                <li><strong>Business Accounts:</strong> For businesses to promote their services, run advertising campaigns, and connect with local influencers</li>
                <li><strong>Influencer Accounts:</strong> For content creators to partner with businesses and monetize their content</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed">Additional terms and requirements may apply to Business and Influencer accounts.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">4. User Content</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">4.1 Your Content Rights</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">You retain all ownership rights to the content you create, upload, or share on Lokal ("User Content"). However, by posting User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with operating and providing the Service.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">4.2 Content Responsibilities</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">You are solely responsible for your User Content. You represent and warrant that:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>You own or have the necessary rights to all User Content you post</li>
                <li>Your User Content does not violate any third-party rights, including intellectual property, privacy, or publicity rights</li>
                <li>Your User Content complies with these Terms and all applicable laws</li>
                <li>You have obtained all necessary permissions, releases, and consents for any individuals appearing in your User Content</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">4.3 Content Standards</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">You agree not to post User Content that:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>Infringes any patent, trademark, trade secret, copyright, or other proprietary rights</li>
                <li>Contains nudity, graphic violence, or promotes illegal activities</li>
                <li>Depicts minors in a sexual or suggestive manner</li>
                <li>Promotes hate speech, discrimination, or violence against individuals or groups</li>
                <li>Contains false or misleading information</li>
                <li>Violates the privacy or publicity rights of others</li>
                <li>Contains viruses, malware, or other harmful code</li>
                <li>Constitutes spam or unsolicited advertising</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">4.4 Content Moderation</h3>
              <p className="text-foreground/90 leading-relaxed">We reserve the right, but have no obligation, to monitor, review, or remove User Content at our sole discretion. We may remove User Content that violates these Terms or for any other reason without prior notice.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">5. Business Services and Advertising</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">5.1 Advertising Services</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">Business accounts may purchase advertising services through Lokal, including:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Promoted videos and content</li>
                <li>Banner advertisements</li>
                <li>Sponsored content placements</li>
                <li>Targeted campaigns based on location and demographics</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">5.2 Campaign Terms</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">When creating advertising campaigns, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Comply with all applicable advertising laws and regulations</li>
                <li>Ensure all advertising content is truthful, accurate, and not misleading</li>
                <li>Obtain all necessary rights and permissions for advertising content</li>
                <li>Pay all fees associated with your campaigns as specified</li>
                <li>Not advertise illegal products, services, or activities</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">5.3 Attribution and Analytics</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">We provide attribution and analytics services using location data, including Bluetooth Low Energy (BLE) beacon technology. By using these services, you acknowledge that:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li>Attribution data is provided on a best-effort basis and may not be 100% accurate</li>
                <li>We are not liable for any business decisions made based on analytics data</li>
                <li>You will use analytics data in compliance with applicable privacy laws</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">6. Influencer Marketplace</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">6.1 Influencer Partnerships</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">Lokal facilitates connections between businesses and influencers. When participating in influencer partnerships, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Honor all commitments made in partnership agreements</li>
                <li>Disclose sponsored content in accordance with FTC guidelines and applicable laws</li>
                <li>Deliver content that meets agreed-upon specifications and deadlines</li>
                <li>Maintain professional communication and conduct</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">6.2 Platform Role</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">Lokal acts solely as a platform to facilitate connections between businesses and influencers. We are not a party to any agreements between businesses and influencers and are not responsible for:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li>The performance or quality of influencer services</li>
                <li>Payment disputes between parties</li>
                <li>Breach of contract by either party</li>
                <li>The results or effectiveness of influencer campaigns</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">7. Location Services</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">7.1 Location Data</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">Lokal uses location services, including GPS and BLE beacon technology, to provide location-based features. By using location services, you consent to:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Collection of your precise location data</li>
                <li>Use of Bluetooth to detect nearby beacons</li>
                <li>Sharing of location data with businesses for attribution purposes</li>
                <li>Use of location data to personalize content and recommendations</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">7.2 Location Controls</h3>
              <p className="text-foreground/90 leading-relaxed">You can control location permissions through your device settings. Disabling location services will limit certain features of the app.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">8. Prohibited Conduct</h2>
              <p className="text-foreground/90 leading-relaxed mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate any person or entity or falsely represent your affiliation</li>
                <li>Interfere with or disrupt the Service or servers/networks connected to the Service</li>
                <li>Use automated systems (bots, scrapers, spiders) to access the Service</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Remove or modify any copyright, trademark, or proprietary notices</li>
                <li>Collect or harvest information about other users without permission</li>
                <li>Engage in any activity that could harm minors</li>
                <li>Transmit any viruses, malware, or harmful code</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Encourage or facilitate any violations of these Terms</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">9. Intellectual Property</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">9.1 Our Intellectual Property</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">The Service, including its design, features, functionality, text, graphics, logos, and software, is owned by Lokal and protected by copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our express written permission.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">9.2 Trademarks</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">Lokal and associated logos are trademarks or registered trademarks of Lokal. You may not use these marks without our prior written permission.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">9.3 Copyright Complaints</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">We respect intellectual property rights. If you believe your copyright has been infringed, please contact us with:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li>A description of the copyrighted work you claim has been infringed</li>
                <li>The location of the infringing material on our Service</li>
                <li>Your contact information</li>
                <li>A statement that you have a good faith belief that the use is not authorized</li>
                <li>A statement that the information in your notice is accurate</li>
                <li>Your physical or electronic signature</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">10. Payment Terms</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">10.1 Fees</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">Certain features of the Service, including advertising services and premium features, may require payment. You agree to pay all fees as specified at the time of purchase.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">10.2 Payment Processing</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">Payments are processed through third-party payment processors. You agree to comply with their terms and conditions. We are not responsible for errors or issues arising from third-party payment processing.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">10.3 Refunds</h3>
              <p className="text-foreground/90 leading-relaxed">All fees are non-refundable unless otherwise specified or required by law. Refund requests should be submitted to our support team for review on a case-by-case basis.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">11. Third-Party Services and Links</h2>
              <p className="text-foreground/90 leading-relaxed">The Service may contain links to third-party websites, services, or content not owned or controlled by Lokal. We are not responsible for the content, privacy policies, or practices of any third-party services. You acknowledge and agree that we shall not be liable for any damage or loss caused by your use of any third-party services.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">12. Disclaimers</h2>
              <p className="text-foreground/90 leading-relaxed mb-4 font-semibold">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.</p>
              <p className="text-foreground/90 leading-relaxed mb-3">WE DO NOT WARRANT THAT:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>The results obtained from using the Service will be accurate or reliable</li>
                <li>Any errors in the Service will be corrected</li>
                <li>The Service will meet your requirements or expectations</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed font-semibold">YOU ASSUME ALL RISK FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA RESULTING FROM USING THE SERVICE.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">13. Limitation of Liability</h2>
              <p className="text-foreground/90 leading-relaxed mb-3 font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOKAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 mb-4">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed font-semibold">IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">14. Indemnification</h2>
              <p className="text-foreground/90 leading-relaxed mb-3">You agree to indemnify, defend, and hold harmless Lokal, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                <li>Your access to or use of the Service</li>
                <li>Your User Content</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">15. Termination</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">15.1 Termination by You</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">You may terminate your account at any time by contacting us or using the account deletion feature in the app.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">15.2 Termination by Us</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">We reserve the right to suspend or terminate your account and access to the Service at any time, with or without notice, for any reason, including if we believe you have violated these Terms or engaged in conduct harmful to other users or the Service.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">15.3 Effect of Termination</h3>
              <p className="text-foreground/90 leading-relaxed">Upon termination, your right to use the Service will immediately cease. We may delete your account and User Content without liability. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">16. Dispute Resolution</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">16.1 Governing Law</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">These Terms shall be governed by and construed in accordance with the laws of the State of [Your State], without regard to its conflict of law provisions.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">16.2 Arbitration</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">Any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in [Your Location]. Each party shall bear its own costs and expenses.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">16.3 Class Action Waiver</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. You waive the right to participate in a class action lawsuit or class-wide arbitration.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">16.4 Exceptions</h3>
              <p className="text-foreground/90 leading-relaxed">Either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of intellectual property rights.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">17. General Provisions</h2>
              <h3 className="text-xl font-medium text-foreground mb-2">17.1 Modifications to Terms</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms and updating the "Last Updated" date. Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">17.2 Modifications to Service</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">17.3 Entire Agreement</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">These Terms, together with our Privacy Policy and any additional terms you agree to when using specific features of the Service, constitute the entire agreement between you and Lokal regarding the Service.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">17.4 Severability</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">If any provision of these Terms is found to be invalid or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">17.5 Waiver</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such provision or any other provision.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">17.6 Assignment</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign or transfer these Terms without restriction.</p>

              <h3 className="text-xl font-medium text-foreground mb-2">17.7 Force Majeure</h3>
              <p className="text-foreground/90 leading-relaxed">We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, war, terrorism, pandemic, labor disputes, or internet failures.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-4">18. Contact Information</h2>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground mb-4">If you have any questions about these Terms of Service, please contact us:</p>
                <div className="space-y-1 text-foreground/90">
                  <p><strong>Email:</strong> <a href="mailto:support@sharelokal.com" className="text-primary hover:underline">support@sharelokal.com</a></p>
                  <p><strong>Legal Inquiries:</strong> <a href="mailto:legal@sharelokal.com" className="text-primary hover:underline">legal@sharelokal.com</a></p>
                  <p><strong>Website:</strong> <a href="https://sharelokal.com" className="text-primary hover:underline">sharelokal.com</a></p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
