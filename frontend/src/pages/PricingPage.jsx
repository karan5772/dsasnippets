import React, { useState, useEffect } from "react";
import {
  Brain,
  CheckCircle,
  Play,
  Code2,
  ArrowRight,
  Mail,
} from "lucide-react";

export const PricingPage = () => {
  return (
    <div className="relative min-h-screen min-w-7xl px-4 pt-8">
      {/* Background Glow */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-40 blur-3xl rounded-md z-0"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-secondary opacity-40 blur-3xl rounded-md z-0"></div>

      {/* Heading */}
      <div className="pt-24 pb-10 text-center relative z-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent pb-4">
          Pricing Plans
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
          Choose the plan that fits your journey—whether you’re a creator or a
          learner.
        </p>
      </div>

      {/* Pricing Cards */}
      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Creator Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-10 h-full shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-3">
                    Creator
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    For problem creators and educators
                  </p>
                  <div className="mb-8">
                    <div className="text-5xl font-bold text-purple-400 mb-3">
                      Pay Per Playlist
                    </div>
                    <div className="text-gray-400 text-lg">
                      Unlimited playlists • Revenue sharing
                    </div>
                  </div>
                </div>
                <ul className="space-y-5 mb-10">
                  {[
                    "Create unlimited problem playlists",
                    "AI-powered problem generation",
                    "Custom test case creation",
                    "Advanced analytics dashboard",
                    "Priority creator support",
                    "Custom branding options",
                    "Advanced monetization tools",
                    "Creator community access",
                    "Monthly performance reports",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-300 text-lg"
                    >
                      <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <a
                    href="mailto:karankumar8239@gmail.com?subject=Creator%20Plan%20Inquiry%20-%20DSASnippets&body=Hi%20DSASnippets%20Team%2C%0A%0AI'm%20interested%20in%20the%20Creator%20plan%20and%20would%20like%20to%20learn%20more%20about%3A%0A%0A-%20Pricing%20structure%20for%20playlists%0A-%20Revenue%20sharing%20details%0A-%20Onboarding%20process%0A-%20Platform%20features%20for%20creators%0A%0APlease%20provide%20more%20information%20and%20let%20me%20know%20the%20next%20steps.%0A%0AThank%20you%21%0A%0ABest%20regards%2C%0A[Your%20Name]"
                    className="group inline-flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 mb-4"
                  >
                    <Mail className="h-6 w-6 text-white mr-3" />
                    <span className="text-white font-bold text-xl">
                      Contact Us
                    </span>
                    <ArrowRight className="h-6 w-6 text-white ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Snippet Learner Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-10 h-full shadow-2xl">
                {/* Popular Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full text-sm font-bold shadow-lg">
                    🔥 MOST POPULAR
                  </div>
                </div>
                <div className="text-center mb-8 mt-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-6">
                    <Code2 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-3">
                    Snippet Learner
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    For students and coding enthusiasts
                  </p>
                  <div className="mb-8">
                    <div className="text-6xl font-bold text-cyan-400 mb-3">
                      ₹5,000
                    </div>
                    <div className="text-gray-400 text-lg">
                      One-time payment • Lifetime access
                    </div>
                  </div>
                </div>
                <ul className="space-y-5 mb-10">
                  {[
                    "Access to all premium playlists",
                    "Discussion forums for each problem",
                    "Progress tracking and analytics",
                    "Multiple programming languages",
                    "Real-time code execution",
                    "24/7 community support",
                    "Regular content updates",
                    "Certificate of completion",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-300 text-lg"
                    >
                      <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <a
                    href="mailto:karankumar8239@gmail.com?subject=Creator%20Plan%20Inquiry%20-%20DSASnippets&body=Hi%20DSASnippets%20Team%2C%0A%0AI'm%20interested%20in%20the%20Creator%20plan%20and%20would%20like%20to%20learn%20more%20about%3A%0A%0A-%20Pricing%20structure%20for%20playlists%0A-%20Revenue%20sharing%20details%0A-%20Onboarding%20process%0A-%20Platform%20features%20for%20creators%0A%0APlease%20provide%20more%20information%20and%20let%20me%20know%20the%20next%20steps.%0A%0AThank%20you%21%0A%0ABest%20regards%2C%0A[Your%20Name]"
                    className="group inline-flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 mb-4"
                  >
                    <Play className="h-6 w-6 text-white mr-3" />
                    <span className="text-white font-bold text-xl">
                      Contact Us
                    </span>
                    <ArrowRight className="h-6 w-6 text-white ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about our pricing plans
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How does the Creator plan pricing work?",
                answer:
                  "Creators are charged per playlist they create and publish. The exact pricing depends on the complexity and features of your playlists.",
              },
              {
                question: "Is the ₹5,000 payment really one-time?",
                answer:
                  "Yes! The Snippet Learner plan is a one-time payment of ₹5,000 that gives you lifetime access to all premium playlists, features, and future updates.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets. International payments are also supported.",
              },
              {
                question: "Is there any free trial available?",
                answer:
                  "We offer a limited free tier with access to basic problems. However, premium features require a paid plan. Contact us to discuss trial options for creators.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Need Help?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about our plans or need a custom solution? We're
              here to help!
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Get in Touch
                  </h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Whether you're interested in becoming a creator or have
                    questions about the Snippet Learner plan, we'd love to hear
                    from you.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold text-lg">
                          Email Us
                        </div>
                        <div className="text-gray-400">
                          karankumar8239@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Code2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold text-lg">
                          Response Time
                        </div>
                        <div className="text-gray-400">Within 24 hours</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Quick Actions */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-white mb-6 text-center md:text-left">
                    Quick Actions
                  </h3>
                  <a
                    href="mailto:karankumar8239@gmail.com?subject=Creator%20Plan%20Inquiry%20-%20DSASnippets&body=Hi%2C%0A%0AI'm%20interested%20in%20becoming%20a%20creator%20on%20DSASnippets.%20Please%20provide%20details%20about%3A%0A%0A-%20Pricing%20structure%0A-%20Revenue%20sharing%0A-%20Onboarding%20process%0A%0AThank%20you%21"
                    className="group flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-purple-500/30 rounded-xl hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300"
                  >
                    <Brain className="h-6 w-6 text-white mr-3" />
                    <span className="text-white font-semibold text-lg">
                      Ask About Creator Plan
                    </span>
                    <ArrowRight className="h-5 w-5 text-white ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a
                    href="mailto:karankumar8239@gmail.com?subject=Snippet%20Learner%20Plan%20Question&body=Hi%2C%0A%0AI%20have%20questions%20about%20the%20Snippet%20Learner%20plan%3A%0A%0A-%20Payment%20process%0A-%20Access%20details%0A-%20Available%20features%0A%0AThank%20you%21"
                    className="group flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl hover:from-cyan-600/50 hover:to-blue-600/50 transition-all duration-300"
                  >
                    <Code2 className="h-6 w-6 text-white mr-3" />
                    <span className="text-white font-semibold text-lg">
                      Ask About Student Plan
                    </span>
                    <ArrowRight className="h-5 w-5 text-white ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a
                    href="mailto:karankumar8239@gmail.com?subject=General%20Inquiry%20-%20DSASnippets&body=Hi%2C%0A%0AI%20have%20a%20general%20question%20about%20DSASnippets%3A%0A%0A[Your%20question%20here]%0A%0AThank%20you%21"
                    className="group flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-gray-600/30 to-gray-600/30 backdrop-blur-sm border border-gray-500/30 rounded-xl hover:from-gray-600/50 hover:to-gray-600/50 transition-all duration-300"
                  >
                    <Mail className="h-6 w-6 text-white mr-3" />
                    <span className="text-white font-semibold text-lg">
                      General Questions
                    </span>
                    <ArrowRight className="h-5 w-5 text-white ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
