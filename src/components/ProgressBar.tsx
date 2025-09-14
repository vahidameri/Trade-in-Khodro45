import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  steps: { id: number; title: string; subtitle?: string }[];
}

export const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 right-5 left-5 h-0.5 bg-border">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div className={`
                progress-step
                ${isActive ? 'active' : ''}
                ${isCompleted ? 'completed' : ''}
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              
              <div className="mt-3 text-center max-w-[120px]">
                <div className={`text-sm font-medium ${
                  isActive ? 'text-primary' : 
                  isCompleted ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
                {step.subtitle && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {step.subtitle}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};