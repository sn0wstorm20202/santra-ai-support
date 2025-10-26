import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import {
  Play,
  MessageSquare,
  Zap,
  BarChart3,
  Mic,
  Shield,
  Users,
  ArrowRight,
  Star,
  Check,
  Menu,
  X,
  Bot,
  Clock,
  Globe,
  Headphones,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import { Background3D } from '@/components/Background3D';
import { ChatWidget } from '@/components/ChatWidget';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
            // Add visible class to all fade-in-up elements within this section
            const fadeElements = entry.target.querySelectorAll('.fade-in-up');
            fadeElements.forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Responses with RAG",
      description: "Advanced AI that understands your product and provides contextual responses using retrieval-augmented generation."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Smart Escalation to Human Agents",
      description: "Seamlessly transfer complex issues to human agents with full context and conversation history."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Dashboard",
      description: "Monitor conversations, track performance metrics, and gain insights into customer satisfaction."
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Voice Agent Support",
      description: "Handle voice calls with AI agents that can speak naturally and understand complex queries."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "White-label Ready",
      description: "Completely customize the interface to match your brand identity and user experience."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Multi-tenant Architecture",
      description: "Enterprise-grade security and data isolation for multiple organizations."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Your Knowledge Base",
      description: "Upload your documentation, FAQs, and product information to create a comprehensive knowledge foundation."
    },
    {
      number: "02",
      title: "AI Learns Your Product",
      description: "Our advanced AI processes and understands your content, ready to provide accurate, context-aware responses."
    },
    {
      number: "03",
      title: "Instant 24/7 Support Goes Live",
      description: "Deploy your AI-powered support system and start helping customers around the clock."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Information Officer",
      company: "Mayo Clinic",
      avatar: "SC",
      rating: 5,
      quote: "SanTra reduced our patient inquiry response time by 70% and our patients love the instant, accurate responses. It's like having our best support specialist available 24/7."
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Patient Experience",
      company: "Johns Hopkins Hospital",
      avatar: "MR",
      rating: 5,
      quote: "The seamless handoff between AI and human staff is incredible. Our team can focus on complex medical inquiries while AI handles routine appointment scheduling perfectly."
    },
    {
      name: "Dr. Emma Thompson",
      role: "Director of Digital Health",
      company: "Cleveland Clinic",
      avatar: "ET",
      rating: 5,
      quote: "Implementation was smooth and the white-label capabilities mean it feels like our own patient portal. Patient satisfaction scores have never been higher."
    }
  ];

  const stats = [
    { number: "10M+", label: "Conversations Handled" },
    { number: "99.9%", label: "Uptime Guaranteed" },
    { number: "< 2s", label: "Average Response Time" },
    { number: "45%", label: "Cost Reduction" }
  ];

  const faqs = [
    {
      question: "How quickly can I get started with SanTra?",
      answer: "You can be up and running in under 10 minutes. Simply upload your knowledge base, configure your preferences, and deploy your AI agent."
    },
    {
      question: "What integrations do you support?",
      answer: "SanTra integrates with popular tools like Slack, Zendesk, Salesforce, HubSpot, and many more. We also offer a robust API for custom integrations."
    },
    {
      question: "How does the AI know when to escalate to a human?",
      answer: "Our smart escalation system uses confidence scoring and sentiment analysis to determine when human intervention is needed, ensuring seamless handoffs."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We're SOC 2 compliant with enterprise-grade encryption, data isolation, and regular security audits to protect your information."
    },
    {
      question: "Can I customize the chat widget?",
      answer: "Yes! SanTra is completely white-label ready. Customize colors, fonts, messaging, and positioning to match your brand perfectly."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for small teams getting started",
      popular: false,
      features: [
        "Human chat only",
        "1 team member",
        "Basic analytics",
        "Email support",
        "Standard integrations"
      ]
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "Ideal for growing businesses",
      popular: true,
      features: [
        "AI-powered responses",
        "Up to 5 team members",
        "Voice agent support",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "White-label options"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with specific needs",
      popular: false,
      features: [
        "Unlimited everything",
        "Dedicated success manager",
        "Custom AI training",
        "SLA guarantees",
        "Advanced security",
        "Multi-tenant architecture",
        "24/7 phone support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-x-hidden">
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb absolute top-20 left-10 w-64 h-64 opacity-30"></div>
        <div className="floating-orb absolute top-1/3 right-20 w-48 h-48 opacity-20"></div>
        <div className="floating-orb absolute bottom-1/4 left-1/3 w-56 h-56 opacity-25"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-navbar shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="#hero"
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="bg-gradient-primary w-8 h-8 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-primary">SanTra</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground-secondary hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-foreground-secondary hover:text-foreground transition-colors">How it Works</a>
              <a href="#pricing" className="text-foreground-secondary hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-foreground-secondary hover:text-foreground transition-colors">Testimonials</a>
              <Button variant="outline" size="sm" asChild>
                <a href="https://san-tra-ai-widget.vercel.app/" target="_blank" rel="noopener noreferrer">Sign In</a>
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90 text-white" size="sm" asChild>
                <a href="https://san-tra-ai-widget.vercel.app/" target="_blank" rel="noopener noreferrer">Start Free Trial</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass-navbar border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-foreground-secondary">Features</a>
              <a href="#how-it-works" className="block text-foreground-secondary">How it Works</a>
              <a href="#pricing" className="block text-foreground-secondary">Pricing</a>
              <a href="#testimonials" className="block text-foreground-secondary">Testimonials</a>
              <div className="pt-3 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://san-tra-ai-widget.vercel.app/" target="_blank" rel="noopener noreferrer">Sign In</a>
                </Button>
                <Button className="w-full bg-gradient-primary text-white" asChild>
                  <a href="https://san-tra-ai-widget.vercel.app/" target="_blank" rel="noopener noreferrer">Start Free Trial</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 3D Background */}
      <Background3D />

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center lg:text-left lg:col-span-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="gradient-text-primary">AI-Powered Support</span>
                <br />
                That Never Sleeps
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-foreground-secondary max-w-3xl">
                Transform your customer support with intelligent AI agents that provide instant, accurate responses 24/7.
                Seamlessly escalate complex issues to human agents when needed.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="https://san-tra-ai-widget.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white animate-pulse-glow">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="hover-lift">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Badge variant="secondary" className="bg-white/10 backdrop-blur text-foreground">
                  <Shield className="mr-2 h-4 w-4" />
                  SOC 2 Compliant
                </Badge>
                <Badge variant="secondary" className="bg-white/10 backdrop-blur text-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  99.9% Uptime
                </Badge>
                <Badge variant="secondary" className="bg-white/10 backdrop-blur text-foreground">
                  <Headphones className="mr-2 h-4 w-4" />
                  24/7 Support
                </Badge>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="SanTra AI-powered customer support interface"
                  className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-secondary rounded-full opacity-20 animate-bounce-subtle"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-accent rounded-full opacity-30 animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-foreground-secondary mb-8">Trusted by 500+ leading healthcare institutions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              'Mayo Clinic',
              'Johns Hopkins',
              'Cleveland Clinic',
              'Mass General',
              'Kaiser Permanente',
              'Mount Sinai'
            ].map((hospital, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 w-28 h-12 mx-auto rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer hover-lift">
                  <span className="text-xs font-semibold text-foreground-secondary">{hospital}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gradient-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8" data-animate id="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className={`text-center fade-in-up stagger-${idx + 1}`}>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="features-header">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text-primary mb-4 fade-in-up">
              Powerful Features for Modern Support
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto fade-in-up stagger-1">
              Everything you need to deliver exceptional customer experiences with AI-powered efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate id="features-grid">
            {features.map((feature, idx) => (
              <Card key={idx} className={`hover-lift glass border-white/20 fade-in-up stagger-${idx + 1}`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground-secondary">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="how-it-works-header">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text-secondary mb-4 fade-in-up">
              How It Works
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto fade-in-up stagger-1">
              Get your AI-powered support system up and running in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" data-animate id="steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className={`text-center fade-in-up stagger-${idx + 1}`}>
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto animate-pulse-glow">
                    {step.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-32 h-0.5 bg-gradient-to-r from-accent to-transparent transform translate-x-full"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-foreground-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="testimonials-header">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text-primary mb-4 fade-in-up">
              What Our Customers Say
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto fade-in-up stagger-1">
              Join hundreds of companies transforming their customer support with SanTra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate id="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className={`hover-lift glass border-white/20 fade-in-up stagger-${idx + 1}`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-foreground-secondary">{testimonial.role}</div>
                      <div className="text-sm text-foreground-secondary">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground-secondary italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="pricing-header">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text-secondary mb-4 fade-in-up">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto fade-in-up stagger-1">
              Choose the plan that fits your needs. Start free and scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate id="pricing-grid">
            {pricingPlans.map((plan, idx) => (
              <Card key={idx} className={`hover-lift relative fade-in-up stagger-${idx + 1} ${plan.popular
                ? 'border-2 border-primary shadow-gradient glass'
                : 'glass border-white/20'
                }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold gradient-text-primary">{plan.price}</span>
                    <span className="text-foreground-secondary ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-foreground-secondary">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-foreground-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular
                      ? 'bg-gradient-primary text-white hover:opacity-90'
                      : 'variant-outline'
                      }`}
                  >
                    {plan.price === 'Free' ? 'Get Started' : plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="faq-header">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text-primary mb-4 fade-in-up">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-foreground-secondary fade-in-up stagger-1">
              Everything you need to know about SanTra.
            </p>
          </div>

          <div data-animate id="faq-list">
            <Accordion type="single" collapsible className="fade-in-up">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-white/20">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div data-animate id="cta-content">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 fade-in-up">
              Ready to Transform Your Customer Support?
            </h2>
            <p className="text-xl text-white/90 mb-8 fade-in-up stagger-1">
              Join thousands of companies providing better support with AI. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 fade-in-up stagger-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="max-w-md bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Free Trial
              </Button>
            </div>

            <p className="text-white/70 text-sm fade-in-up stagger-3">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-subtle"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/5 rounded-full animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-white/5 rounded-full animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-primary w-8 h-8 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">SanTra</span>
              </div>
              <p className="text-white/70 mb-4">
                AI-powered customer support that never sleeps. Transform your support experience today.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70">© 2024 SanTra. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-white/70 text-sm">Powered by</span>
              <div className="flex space-x-2">
                <Badge variant="outline" className="border-white/20 text-white/70">React</Badge>
                <Badge variant="outline" className="border-white/20 text-white/70">AI</Badge>
                <Badge variant="outline" className="border-white/20 text-white/70">Cloud</Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;