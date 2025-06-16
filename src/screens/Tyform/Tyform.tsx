import React, { useState, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { CheckCircle, Sparkles, Users, Mail } from "lucide-react";
import { addToWaitlist } from "../../services/notion";

type FlowStep = 'landing' | 'loading' | 'success';

export const Tyform = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('landing');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [error, setError] = useState<string>('');

  // Staggered animation effect
  useEffect(() => {
    // Reset animation stage when step changes
    setAnimationStage(0);
    
    const stages = currentStep === 'success' ? [
      { delay: 200, stage: 1 }, // Logo
      { delay: 400, stage: 2 }, // Success Icon
      { delay: 600, stage: 3 }, // Headline
      { delay: 800, stage: 4 }, // Subtitle
      { delay: 1000, stage: 5 }, // What happens next
      { delay: 1200, stage: 6 }, // Referral Section
    ] : [
      { delay: 200, stage: 1 }, // Logo
      { delay: 400, stage: 2 }, // Badge or Loading content
      { delay: 600, stage: 3 }, // Headline
      { delay: 800, stage: 4 }, // Description
      { delay: 1000, stage: 5 }, // Form
    ];

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => {
        setAnimationStage(prev => Math.max(prev, stage));
      }, delay);
    });
  }, [currentStep]);

  const handleJoinWaitlist = async () => {
    if (!email || !name) return;
    
    setIsLoading(true);
    setCurrentStep('loading');
    setError('');
    
    try {
      const success = await addToWaitlist({ name, email });
      
      if (success) {
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep('success');
        }, 2000);
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setError(error instanceof Error ? error.message : 'Failed to join waitlist');
      
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('landing');
      }, 2000);
    }
  };

  const resetFlow = () => {
    setCurrentStep('landing');
    setEmail('');
    setName('');
    setIsLoading(false);
    setError('');
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://tyform.com/ref/abc123');
  };

  if (currentStep === 'loading') {
    return (
      <main className="bg-white flex flex-row justify-center w-full min-h-screen">
        <div className="bg-white w-full max-w-[1440px] relative flex flex-col justify-center min-h-screen py-6 px-4 sm:py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className={`flex items-center justify-center gap-1 mb-8 transition-all duration-700 ease-out ${
              animationStage >= 1 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
            }`}>
              <div className="relative w-[20px] h-[21px] sm:w-[24.1px] sm:h-[25.57px] bg-[url(/clip-path-group.png)] bg-contain bg-no-repeat bg-center">
              </div>
              <div className="[font-family:'Manrope',Helvetica] font-bold text-black text-[20px] sm:text-[24px] lg:text-[28.8px] tracking-[-0.4px] sm:tracking-[-0.58px]">
                tyform
              </div>
            </div>

            {/* Loading Animation */}
            <div className={`flex flex-col items-center space-y-6 transition-all duration-700 ease-out delay-200 ${
              animationStage >= 2 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
            }`}>
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-black"></div>
                <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black" />
              </div>
              
              <div className="text-center">
                <h2 className="[font-family:'Manrope',Helvetica] font-bold text-black text-2xl sm:text-3xl mb-2">
                  Adding you to the waitlist...
                </h2>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#4c4c4c] text-lg">
                  This will just take a moment
                </p>
                {error && (
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-red-500 text-sm mt-2">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (currentStep === 'success') {
    return (
      <main className="bg-white flex flex-row justify-center w-full min-h-screen">
        <div className="bg-white w-full max-w-[1440px] relative flex flex-col justify-center min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className={`flex items-center justify-center gap-1 mb-8 sm:mb-10 transition-all duration-700 ease-out ${
              animationStage >= 1 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
            }`}>
              <div className="relative w-[20px] h-[21px] sm:w-[24.1px] sm:h-[25.57px] bg-[url(/clip-path-group.png)] bg-contain bg-no-repeat bg-center">
              </div>
              <div className="[font-family:'Manrope',Helvetica] font-bold text-black text-[20px] sm:text-[24px] lg:text-[28.8px] tracking-[-0.4px] sm:tracking-[-0.58px]">
                tyform
              </div>
            </div>

            {/* Success Content */}
            <div className="max-w-[520px] w-full text-center px-4">
              {/* Success Icon */}
              <div className={`mb-8 sm:mb-10 transition-all duration-700 ease-out ${
                animationStage >= 2 ? 'opacity-100 blur-0 translate-y-0 scale-100' : 'opacity-0 blur-sm translate-y-4 scale-95'
              }`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
              </div>
              
              {/* Main Headline */}
              <h1 className={`[font-family:'Manrope',Helvetica] font-bold text-black text-[28px] sm:text-[36px] lg:text-[42px] tracking-[-0.7px] sm:tracking-[-0.9px] leading-[32px] sm:leading-[40px] lg:leading-[46px] mb-4 sm:mb-6 transition-all duration-700 ease-out ${
                animationStage >= 3 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
              }`}>
                You're on the list{name ? `, ${name}` : ''}!
              </h1>
              
              {/* Subtitle */}
              <p className={`[font-family:'Manrope',Helvetica] font-normal text-[#666666] text-base sm:text-lg leading-[24px] sm:leading-[28px] mb-10 sm:mb-12 transition-all duration-700 ease-out ${
                animationStage >= 4 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
              }`}>
                Welcome to the future of form building. We'll send updates to <span className="text-black font-medium">{email}</span>
              </p>

              {/* What happens next section */}
              <div className={`text-left mb-10 sm:mb-12 transition-all duration-700 ease-out ${
                animationStage >= 5 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="[font-family:'Manrope',Helvetica] font-semibold text-black text-lg sm:text-xl">
                    What happens next?
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#666666] text-sm sm:text-base leading-[20px] sm:leading-[24px]">
                      We'll send you exclusive updates about tyform's development
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#666666] text-sm sm:text-base leading-[20px] sm:leading-[24px]">
                      Get early access to beta features before anyone else
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#666666] text-sm sm:text-base leading-[20px] sm:leading-[24px]">
                      Receive your personal invitation when it's your turn
                    </p>
                  </div>
                </div>
              </div>

              {/* Referral Section */}
              <div className={`text-center transition-all duration-700 ease-out ${
                animationStage >= 6 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
              }`}>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#888888] text-sm sm:text-base mb-6">
                  Know someone who'd love tyform? Share the love!
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={copyLink}
                    className="w-full px-6 py-3 h-auto [font-family:'Manrope',Helvetica] font-medium text-[#666666] text-sm sm:text-base rounded-[12px] bg-[#f8f8f8] hover:bg-[#f0f0f0] border border-[#e5e5e5] shadow-none transition-all duration-200"
                  >
                    Copy Link
                  </Button>
                  
                  <Button 
                    onClick={resetFlow}
                    className="w-full px-6 py-3 h-auto [font-family:'Manrope',Helvetica] font-medium text-[#4285f4] text-sm sm:text-base rounded-[12px] bg-transparent hover:bg-[#f0f4ff] border border-[#e0e8ff] transition-all duration-200"
                  >
                    Add Another Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Landing Page (default)
  return (
    <main className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1440px] relative flex items-center justify-center min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full max-w-[800px] mx-auto">
          {/* Logo */}
          <div className={`flex items-center justify-center gap-1 mb-8 sm:mb-10 lg:mb-12 transition-all duration-700 ease-out ${
            animationStage >= 1 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
          }`}>
            <div className="relative w-[20px] h-[21px] sm:w-[24.1px] sm:h-[25.57px] bg-[url(/clip-path-group.png)] bg-contain bg-no-repeat bg-center">
            </div>
            <div className="[font-family:'Manrope',Helvetica] font-bold text-black text-[20px] sm:text-[24px] lg:text-[28.8px] tracking-[-0.4px] sm:tracking-[-0.58px]">
              tyform
            </div>
          </div>

          {/* Notification Badge */}
          <Badge className={`flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:px-4 sm:py-1.5 mb-10 sm:mb-12 lg:mb-16 bg-[#f8f8f8] text-black rounded-[65px] border border-solid border-[#c7c7c7] shadow-none hover:bg-[#f8f8f8] max-w-fit transition-all duration-700 ease-out ${
            animationStage >= 2 ? 'opacity-100 blur-0 translate-y-0 scale-100' : 'opacity-0 blur-sm translate-y-4 scale-95'
          }`}>
            <div className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] bg-[#00000045] rounded-[9px] sm:rounded-[11px] flex items-center justify-center">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-[5px] sm:rounded-[6.11px]" />
            </div>
            <span className="[font-family:'Manrope',Helvetica] font-bold text-sm sm:text-base lg:text-lg">
              Join waitlist now!
            </span>
          </Badge>

          {/* Main Content */}
          <div className="w-full text-center">
            {/* Headline */}
            <h1 className={`mb-8 sm:mb-10 lg:mb-12 px-2 transition-all duration-700 ease-out ${
              animationStage >= 3 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
            }`}>
              <span className="[font-family:'Manrope',Helvetica] font-bold text-black text-[32px] sm:text-[48px] lg:text-[64px] xl:text-[72px] tracking-[-1px] sm:tracking-[-1.5px] lg:tracking-[-2.05px] xl:tracking-[-2.3px] leading-[36px] sm:leading-[52px] lg:leading-[70.4px] xl:leading-[79.2px]">
                The{" "}
              </span>
              <span 
                className="[font-family:'Instrument_Serif',Helvetica] italic text-[36px] sm:text-[56px] lg:text-[75px] xl:text-[84px] tracking-[-1.2px] sm:tracking-[-2px] lg:tracking-[-2.81px] xl:tracking-[-3.15px] leading-[40px] sm:leading-[60px] lg:leading-[82.5px] xl:leading-[92.4px] relative cursor-pointer group"
                style={{
                  background: 'linear-gradient(120deg, rgba(100, 100, 100, 0.3) 0%, rgba(100, 100, 100, 1) 25%, rgba(100, 100, 100, 1) 50%, rgba(100, 100, 100, 0.3) 75%, rgba(100, 100, 100, 1) 100%) 0% 0% / 400% 100% text',
                  WebkitTextFillColor: 'transparent',
                  animation: '3s ease-in-out 0s infinite normal none running aurora-shimmer'
                }}
              >
                smartest
              </span>
              <span className="[font-family:'Manrope',Helvetica] font-bold text-black text-[32px] sm:text-[48px] lg:text-[64px] xl:text-[72px] tracking-[-1px] sm:tracking-[-1.5px] lg:tracking-[-2.05px] xl:tracking-[-2.3px] leading-[36px] sm:leading-[52px] lg:leading-[70.4px] xl:leading-[79.2px]">
                {" "}
                way <br />
                to create forms
              </span>
            </h1>

            {/* Description */}
            <p className={`[font-family:'Manrope',Helvetica] font-normal text-[#4c4c4c] text-base sm:text-lg lg:text-xl xl:text-[22px] text-center max-w-[618px] mx-auto mb-8 sm:mb-10 lg:mb-12 leading-[24px] sm:leading-[28px] lg:leading-[33px] xl:leading-[36px] px-4 sm:px-0 transition-all duration-700 ease-out ${
              animationStage >= 4 ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'
            }`}>
              Say goodbye to boring forms. Meet tyform — the AI-powered,
              intuitive form builder that creates intelligent forms for you.
            </p>

            {/* Form */}
            <div className={`flex flex-col items-center justify-center gap-3 sm:gap-4 max-w-[500px] mx-auto px-4 sm:px-0 transition-all duration-700 ease-out ${
              animationStage >= 5 ? 'opacity-100 blur-0 translate-y-0 scale-100' : 'opacity-0 blur-sm translate-y-4 scale-95'
            }`}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full sm:flex-1 px-[20px] sm:px-[30px] py-[12px] sm:py-[15px] h-auto [font-family:'Manrope',Helvetica] font-semibold text-[#353535] text-base sm:text-lg rounded-[14px] border-[#e5e5e5] focus:border-[#c7c7c7] focus:ring-0"
                  placeholder="Enter your name"
                  type="text"
                />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-[20px] sm:px-[30px] py-[12px] sm:py-[15px] h-auto [font-family:'Manrope',Helvetica] font-semibold text-[#353535] text-base sm:text-lg rounded-[14px] border-[#e5e5e5] focus:border-[#c7c7c7] focus:ring-0"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <button 
                onClick={handleJoinWaitlist}
                disabled={!email || !name || isLoading}
                className="download-button w-full px-[20px] sm:px-[30px] py-[12px] sm:py-[15px] h-auto [font-family:'Manrope',Helvetica] font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                <span>Join waitlist</span>
              </button>
              {error && (
                <p className="[font-family:'Manrope',Helvetica] font-normal text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};