import { useState } from 'react';
import { Car, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { Step1CarSpecs } from './steps/Step1CarSpecs';
import { Step2CarCondition } from './steps/Step2CarCondition';
import { Step3Exchange } from './steps/Step3Exchange';
import { CarSpecifications, CarCondition, CarData } from '../types/car';
import logo from '../assets/logo.png';

const steps = [
  { id: 1, title: 'مشخصات خودرو', subtitle: 'اطلاعات پایه' },
  { id: 2, title: 'وضعیت خودرو', subtitle: 'بررسی کیفیت' },
  { id: 3, title: 'تخمین و معاوضه', subtitle: 'انتخاب خودرو' }
];

export const CarExchangePlatform = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [carData, setCarData] = useState<Partial<CarData>>({});

  const handleStep1Complete = (specs: CarSpecifications) => {
    setCarData(prev => ({ ...prev, specifications: specs }));
    setCurrentStep(2);
  };

  const handleStep2Complete = (condition: CarCondition) => {
    setCarData(prev => ({ ...prev, condition }));
    setCurrentStep(3);
  };

  const handleEditSpecs = () => {
    setCurrentStep(1);
  };

  const handleEditCondition = () => {
    setCurrentStep(2);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1CarSpecs
            onComplete={handleStep1Complete}
            initialData={carData.specifications}
          />
        );
      case 2:
        return (
          <Step2CarCondition
            carSpecs={carData.specifications!}
            onComplete={handleStep2Complete}
            onEditSpecs={handleEditSpecs}
            initialData={carData.condition}
          />
        );
      case 3:
        return (
          <Step3Exchange
            carData={carData as CarData}
            onEditSpecs={handleEditSpecs}
            onEditCondition={handleEditCondition}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background rtl">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="خودرو۴۵" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">خودرو۴۵</h1>
                <p className="text-sm text-muted-foreground">پلتفرم معاوضه خودرو</p>
              </div>
            </div>
            
            {/* Navigation arrows for mobile */}
            <div className="flex items-center gap-2 md:hidden">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
              {currentStep < 3 && carData.specifications && (currentStep !== 2 || carData.condition) && (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} steps={steps} />

        {/* Step Content */}
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© ۱۴۰۳ خودرو۴۵ - تمامی حقوق محفوظ است</p>
            <p className="mt-2">
              پلتفرم معتبر معاوضه خودرو با گارانتی قانونی و نظارت کارشناسی
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};