"use client";

import { useState, useEffect } from "react";
import {
  Brain,
  DollarSign,
  Github,
  CheckCircle,
  Sparkles,
  Trophy,
  Target,
  Play,
  Code2,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [problemCount, setProblemCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Animated problem counter
    const interval = setInterval(() => {
      setProblemCount((prev) => (prev + 1) % 1000);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    "AI Problem Generation",
    "Manual Problem Creation",
    "Playlist Monetization",
    "Code Execution",
  ];

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => clearInterval(featureInterval);
  }, [features.length]);

  return (
    <div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Beautiful Navbar */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-8">
        <div
          className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-8 animate-pulse">
            <Code2 className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-semibold">DSASNIPPETS</span>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Code{" "}
            </span>

            <span className="text-white">Create </span>

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Earn
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            The next-generation coding platform where{" "}
            <span className="text-purple-400 font-semibold">
              creators build problems
            </span>{" "}
            and{" "}
            <span className="text-cyan-400 font-semibold">
              coders solve them
            </span>
            . Create questions manually or with AI, sell premium playlists, and
            execute code in real-time.
          </p>

          {/* Hero CTA Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/home"
              className="group relative inline-flex items-center justify-center px-7 py-5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:from-cyan-700 hover:to-blue-700 hover:scale-105 transform"
            >
              <Play className="h-6 w-6 mr-3" />
              Start Solving Problems
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <Link
              to="/add-problem"
              className="group relative inline-flex items-center justify-center px-8 py-5 text-xl font-bold text-white transition-all duration-300 bg-transparent border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:scale-105"
            >
              <Brain className="h-6 w-6 mr-3" />
              Create Problems
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="mb-12 max-w-xl mx-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Platform Features
                </h3>
                <p className="text-gray-300">See what powers DSASnippets</p>
              </div>

              {/* Animated Feature Display */}
              <div className="relative h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {features[activeFeature]}
                  </div>
                  <div className="flex justify-center space-x-2">
                    {features.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeFeature
                            ? "bg-purple-400"
                            : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Access Button */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <a
                  href="/home"
                  className="group inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 backdrop-blur-sm border border-purple-500/30 rounded-xl hover:from-purple-600/50 hover:to-cyan-600/50 transition-all duration-300"
                >
                  <Code2 className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-semibold">
                    Access Problem Library
                  </span>
                  <ArrowRight className="h-5 w-5 text-white ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Revenue Potential Showcase */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-lg text-gray-300 mb-1">
                Creator Earning Potential
              </div>
              <div className="text-3xl font-bold text-green-400">₹15,000+</div>
              <div className="text-sm text-gray-400">
                Monthly from premium playlists
              </div>
            </div>
          </div>
        </div>

        {/* Floating Code Snippets */}

        {/* Two Sum Problem Block */}
        <div className="hidden lg:block absolute bottom-105 left-0 opacity-30 animate-float z-0">
          <div className="bg-black/60 backdrop-blur-sm border border-purple-500/40 rounded-lg p-6 text-green-400 font-mono text-xs max-w-xs">
            <div className="text-purple-400 mb-2">// Two Sum Problem</div>
            <div className="text-cyan-400">
              function twoSum(nums, target) {"{"}
            </div>
            <div className="ml-4 text-gray-300">const map = new Map();</div>
            <div className="ml-4 text-gray-300">
              for (let i = 0; i {"<"} nums.length; i++) {"{"}
            </div>
            <div className="ml-8 text-yellow-400">
              const complement = target - nums[i];
            </div>
            <div className="ml-8 text-gray-300">
              if (map.has(complement)) {"{"}
            </div>
            <div className="ml-12 text-green-400">
              return [map.get(complement), i];
            </div>
            <div className="ml-8 text-gray-300">{"}"}</div>
            <div className="ml-8 text-gray-300">map.set(nums[i], i);</div>
            <div className="ml-4 text-gray-300">{"}"}</div>
            <div className="text-cyan-400">{"}"}</div>
          </div>
        </div>

        {/* Binary Search Block */}
        <div
          className="hidden lg:block absolute bottom-95 right-0 opacity-30 animate-float z-0"
          style={{ animationDelay: "1s" }}
        >
          <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/40 rounded-lg p-6 text-blue-400 font-mono text-xs max-w-xs">
            <div className="text-purple-400 mb-2">// Binary Search</div>
            <div className="text-cyan-400">
              function binarySearch(arr, target) {"{"}
            </div>
            <div className="ml-4 text-gray-300">
              let left = 0, right = arr.length - 1;
            </div>
            <div className="ml-4 text-gray-300">
              while (left {"<"}= right) {"{"}
            </div>
            <div className="ml-8 text-yellow-400">
              const mid = Math.floor((left + right) / 2);
            </div>
            <div className="ml-8 text-gray-300">
              if (arr[mid] === target) return mid;
            </div>
            <div className="ml-8 text-gray-300">
              else if (arr[mid] {"<"} target) left = mid + 1;
            </div>
            <div className="ml-8 text-gray-300">else right = mid - 1;</div>
            <div className="ml-4 text-gray-300">{"}"}</div>
            <div className="ml-4 text-green-400">return -1;</div>
            <div className="text-cyan-400">{"}"}</div>
          </div>
        </div>

        <div
          className="hidden lg:block absolute bottom-12 left-2 opacity-30 animate-float z-0"
          style={{ animationDelay: "2s" }}
        >
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/40 rounded-lg p-6 text-green-400 font-mono text-xs max-w-xs">
            <div className="text-purple-400 mb-2">// Merge Sort</div>
            <div className="text-cyan-400">function mergeSort(arr) {"{"}</div>
            <div className="ml-4 text-gray-300">
              if (arr.length {"<"}= 1) return arr;
            </div>
            <div className="ml-4 text-yellow-400">
              const mid = Math.floor(arr.length / 2);
            </div>
            <div className="ml-4 text-gray-300">
              const left = mergeSort(arr.slice(0, mid));
            </div>
            <div className="ml-4 text-gray-300">
              const right = mergeSort(arr.slice(mid));
            </div>
            <div className="ml-4 text-green-400">
              return merge(left, right);
            </div>
            <div className="text-cyan-400">{"}"}</div>
          </div>
        </div>

        <div
          className="hidden lg:block absolute bottom-20 right-2 opacity-30 animate-float z-0"
          style={{ animationDelay: "3s" }}
        >
          <div className="bg-black/60 backdrop-blur-sm border border-orange-500/40 rounded-lg p-6 text-orange-400 font-mono text-xs max-w-xs">
            <div className="text-purple-400 mb-2">// DFS Traversal</div>
            <div className="text-cyan-400">
              function dfs(node, visited = new Set()) {"{"}
            </div>
            <div className="ml-4 text-gray-300">
              if (!node || visited.has(node)) return;
            </div>
            <div className="ml-4 text-yellow-400">visited.add(node);</div>
            <div className="ml-4 text-green-400">console.log(node.value);</div>
            <div className="ml-4 text-gray-300">
              node.children.forEach(child {"=>"} {"{"}
            </div>
            <div className="ml-8 text-gray-300">dfs(child, visited);</div>
            <div className="ml-4 text-gray-300">{"}"});</div>
            <div className="text-cyan-400">{"}"}</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Core Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for a complete coding practice and
              monetization experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Play,
                title: "Code Execution Engine",
                description:
                  "Real-time code execution with multiple language support. Test solutions instantly with comprehensive test cases and performance metrics.",
                color: "from-purple-500 to-pink-500",
                delay: "0s",
                audience: "Core Platform",
              },
              {
                icon: FileText,
                title: "Manual Problem Creation",
                description:
                  "Create custom coding problems with your own test cases, constraints, and difficulty levels. Full control over problem design.",
                color: "from-cyan-500 to-blue-500",
                delay: "0.2s",
                audience: "Creators",
              },
              {
                icon: Brain,
                title: "AI Problem Generator",
                description:
                  "Generate unlimited coding problems using AI. Specify topics, difficulty, and constraints to create unique challenges instantly.",
                color: "from-orange-500 to-red-500",
                delay: "0.4s",
                audience: "Creators",
              },
              {
                icon: DollarSign,
                title: "Playlist Monetization",
                description:
                  "Sell premium problem playlists to coders worldwide. Set your own prices and earn from your expertise and problem-solving skills.",
                color: "from-green-500 to-emerald-500",
                delay: "0.6s",
                audience: "Creators",
              },
              {
                icon: Target,
                title: "Problem Solving",
                description:
                  "Access thousands of coding problems across different topics and difficulty levels. Track your progress and improve your skills.",
                color: "from-yellow-500 to-orange-500",
                delay: "0.8s",
                audience: "Solvers",
              },
              {
                icon: Trophy,
                title: "Progress Tracking",
                description:
                  "Monitor your coding journey with detailed analytics, solution history, and performance insights across different problem categories.",
                color: "from-purple-500 to-cyan-500",
                delay: "1s",
                audience: "Solvers",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 blur rounded-2xl"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full transition-all duration-500 group-hover:transform group-hover:scale-105">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="flex items-center justify-between w-full mb-4">
                        <span className="text-xs bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                          {feature.audience}
                        </span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed flex-grow">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section CTA */}
        </div>
      </section>

      {/* Creator vs Solver Section */}
      <section id="creators" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                For Creators & Solvers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're creating problems or solving them, DSASnippets has
              everything you need
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Creators */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    For Problem Creators
                  </h3>
                  <p className="text-gray-300">
                    Build, monetize, and share your coding expertise
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Create problems manually with custom test cases",
                    "Generate problems instantly using AI",
                    "Sell premium problem playlists",
                    "Set your own pricing and earn revenue",
                    "Track sales and performance analytics",
                    "Build your reputation as a problem setter",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <Link
                    to="/add-problem"
                    className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-purple-500/30 rounded-xl hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300"
                  >
                    <Brain className="h-5 w-5 text-white mr-2" />
                    <span className="text-white font-semibold">
                      Start Creating
                    </span>
                    <ArrowRight className="h-5 w-5 text-white ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* For Solvers */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4">
                    <Code2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    For Problem Solvers
                  </h3>
                  <p className="text-gray-300">
                    Practice, learn, and master coding skills
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Access thousands of coding problems",
                    "Real-time code execution and testing",
                    "Purchase premium problem playlists",
                    "Track your progress and improvements",
                    "Multiple programming language support",
                    "Detailed solution explanations",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <a
                    href="/home"
                    className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl hover:from-cyan-600/50 hover:to-blue-600/50 transition-all duration-300"
                  >
                    <Play className="h-5 w-5 text-white mr-2" />
                    <span className="text-white font-semibold">
                      Start Solving
                    </span>
                    <ArrowRight className="h-5 w-5 text-white ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monetization Focus Section */}
      <section id="monetization" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Monetize Your Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Turn your problem-setting skills into a sustainable income stream
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Create Problem Sets",
                description:
                  "Build collections of coding problems and sell them as premium playlists",
                revenue: "₹1000-3000/month",
                icon: FileText,
              },
              {
                title: "AI-Generated Content",
                description:
                  "Use AI to quickly generate unique problems and scale your content creation",
                revenue: "₹3000-8000/month",
                icon: Brain,
              },
              {
                title: "Premium Collections",
                description:
                  "Offer specialized problem sets for interview prep, contests, and specific topics",
                revenue: "₹8000-15000/month",
                icon: Trophy,
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-6">{item.description}</p>
                    <div className="text-2xl font-bold text-green-400">
                      {item.revenue}
                    </div>
                    <div className="text-sm text-gray-400">
                      Potential earnings
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monetization CTA */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className=" inset-0 bg-gradient-to-r from-purple-900/50 to-cyan-900/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Coding Practice?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join the next generation of coding platforms. Whether you're
              creating problems or solving them, DSASnippets is your gateway to
              a better coding experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/home"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:from-cyan-700 hover:to-blue-700 hover:scale-105 transform"
              >
                <Code2 className="h-6 w-6 mr-3" />
                Enter Platform
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://github.com/karan5772/leetLab"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-transparent border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6 mr-3" />
                Star on GitHub
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Footer */}
      <footer className="relative overflow-hidden">
        <div className=" inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            {/* Main Footer Content */}
            <div className="text-center mb-16">
              {/* Big DSASnippets Logo */}
              <div className="flex items-center justify-center space-x-4 mb-8 group">
                <div className="flex flex-col">
                  <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    DSASNIPPETS
                  </span>
                  <span className="text-lg text-gray-400 font-medium mt-2">
                    The Future of Coding Practice
                  </span>
                </div>
              </div>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Revolutionizing how developers practice coding, create problems,
                and monetize their expertise. Join the next generation of coding
                platforms.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    AI-Powered
                  </h4>
                  <p className="text-gray-400">
                    Generate unlimited problems with AI
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mb-4">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Real-time Execution
                  </h4>
                  <p className="text-gray-400">
                    Execute code instantly in the browser
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Monetization
                  </h4>
                  <p className="text-gray-400">
                    Earn from your coding expertise
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mb-12">
                <a
                  href="/home"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full hover:from-purple-700 hover:to-cyan-700 hover:scale-105 transform"
                >
                  <Code2 className="h-6 w-6 mr-3" />
                  Explore DSASNIPPETS
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-6 mb-12">
                <a
                  href="https://github.com/karan5772/leetLab"
                  className="group relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full hover:from-purple-600/40 hover:to-cyan-600/40 transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-6 w-6 text-white group-hover:text-purple-300 transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>

              {/* Coming Soon Notice */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-8 py-4 mb-8">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-semibold text-lg">
                  Stay Tuned!
                </span>
                <Sparkles className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
