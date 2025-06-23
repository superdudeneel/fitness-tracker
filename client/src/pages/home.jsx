import React, { useState } from 'react';
import { Activity, Target, TrendingUp, Calendar, User, Settings, Menu, X, Play, Award, Zap, Heart, Clock, BarChart3, Users, Shield, Smartphone } from 'lucide-react';
import {Link} from 'react-router-dom'
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Workout Analytics",
      description: "Track your workouts, measure performance improvements, and get personalized exercise recommendations.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal Setting & Progress",
      description: "Set realistic fitness goals and track your progress with detailed insights and milestone celebrations.",
      color: "from-orange-500 to-amber-600"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Monitoring",
      description: "Monitor vital health metrics including heart rate, sleep quality, and stress levels for holistic wellness.",
      color: "from-red-500 to-rose-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Connect with like-minded individuals, join challenges, and stay motivated with our supportive community.",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Cross-Platform Sync",
      description: "Seamlessly sync your data across all devices and integrate with popular fitness apps and wearables.",
      color: "from-teal-500 to-green-600"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with basic tracking",
      features: [
        "Basic calorie tracking",
        "Simple workout logging",
        "Weekly progress reports",
        "Community access",
        "Mobile app access"
      ],
      color: "from-slate-600 to-slate-700",
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Advanced features for serious fitness enthusiasts",
      features: [
        "Everything in Free",
        "AI meal planning",
        "Advanced analytics",
        "Custom workout plans",
        "Nutritionist chat",
        "Premium content library",
        "Priority support"
      ],
      color: "from-emerald-500 to-teal-600",
      buttonText: "Start 14-Day Trial",
      popular: true
    },
    {
      name: "Elite",
      price: "$29",
      period: "per month",
      description: "Complete wellness solution with personal coaching",
      features: [
        "Everything in Pro",
        "1-on-1 personal coaching",
        "Custom supplement recommendations",
        "Advanced health insights",
        "Unlimited expert consultations",
        "Custom meal delivery integration",
        "White-glove onboarding"
      ],
      color: "from-blue-500 to-cyan-600",
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const stats = [
    { number: "2.5M+", label: "Active Users" },
    { number: "50M+", label: "Meals Tracked" },
    { number: "98%", label: "User Satisfaction" },
    { number: "15lbs", label: "Average Weight Loss" }
  ];

  const NavBar = () => (
    <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/10 border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              FitTrack
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Pricing
            </a>
            <Link to = '/login' className="cursor-pointer text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Sign in
            </Link>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
              <Link to = '/signup'>Get Started</Link>
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section className="pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Health Journey
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                FitTrack combines intelligent calorie tracking and real-time health monitoring to help you achieve your fitness goals faster than ever.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span><Link to = '/signup'>Start Free Trial</Link></span>
              </button>
              
            </div>

            <div className="grid grid-cols-4 gap-8 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-100 rounded-full opacity-40"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Today's Progress</h3>
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Calories</span>
                      <span className="font-medium text-gray-900">1,847 / 2,200</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Minutes</span>
                      <span className="font-medium text-gray-900">45 / 60</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Water Intake</span>
                      <span className="font-medium text-gray-900">6 / 8 glasses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and insights you need to transform your health and achieve lasting results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const HowItWorksSection = () => (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            How FitTrack Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes and begin your transformation journey with our simple, three-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">1. Create Your Profile</h3>
              <p className="text-gray-600">
                Tell us about your current fitness level, goals, and preferences. Our AI creates a personalized plan just for you.
              </p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">2. Track Your Journey</h3>
              <p className="text-gray-600">
                Log meals with photo recognition, track workouts, and monitor your daily activities effortlessly.
              </p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">3. See Results</h3>
              <p className="text-gray-600">
                Get detailed insights, celebrate milestones, and watch as you achieve your fitness goals faster than ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const PricingSection = () => (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-emerald-500 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg'
                    : 'border-2 border-gray-200 hover:border-emerald-500 text-gray-700 hover:text-emerald-600'
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">All plans include a 14-day free trial • No credit card required</p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl p-6">
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <nav className="space-y-6">
              <a href="#features" className="block text-gray-700 hover:text-emerald-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-emerald-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                How it Works
              </a>
              <a href="#pricing" className="block text-gray-700 hover:text-emerald-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </a>
              <button className="block w-full text-left text-gray-700 hover:text-emerald-600 font-medium">
                Sign In
              </button>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;