import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CarSpecifications } from '../../types/car';

interface Step1CarSpecsProps {
  onComplete: (specs: CarSpecifications) => void;
  initialData?: Partial<CarSpecifications>;
}

const carBrands = [
  'پژو', 'سمند', 'پراید', 'رنو', 'نیسان', 'هیوندای', 'کیا', 'چری', 'لیفان', 'MVM'
];

const carModels: Record<string, string[]> = {
  'پژو': ['پژو ۲۰۶', 'پژو ۲۰۷', 'پژو ۲۰۸', 'پژو ۳۰۱', 'پژو ۴۰۵', 'پژو ۴۰۶', 'پژو پارس'],
  'سمند': ['سمند LX', 'سمند EF7', 'سمند سورن'],
  'پراید': ['پراید ۱۱۱', 'پراید ۱۳۲', 'پراید صبا'],
  'رنو': ['رنو ساندرو', 'رنو تندر', 'رنو کپچر'],
  'نیسان': ['نیسان تیانا', 'نیسان ماکسیما'],
  'هیوندای': ['هیوندای النترا', 'هیوندای ورنا', 'هیوندای i20'],
  'کیا': ['کیا سراتو', 'کیا اپتیما', 'کیا ریو'],
  'چری': ['چری تیگو', 'چری آریزو'],
  'لیفان': ['لیفان X60', 'لیفان 620'],
  'MVM': ['MVM 315', 'MVM 550', 'MVM X33']
};

const carTrims: Record<string, string[]> = {
  'پژو ۲۰۶': ['تیپ ۲', 'تیپ ۳', 'تیپ ۵', 'SD'],
  'پژو ۲۰۷': ['دنده‌ای', 'اتوماتیک'],
  'سمند LX': ['دوگانه‌سوز', 'تک‌سوز'],
  'پراید ۱۳۲': ['SE', 'SL', 'SX']
};

const years = Array.from({ length: 20 }, (_, i) => (1403 - i).toString());
const colors = ['سفید', 'مشکی', 'نقره‌ای', 'قرمز', 'آبی', 'طوسی', 'سبز', 'کرم'];

export const Step1CarSpecs = ({ onComplete, initialData }: Step1CarSpecsProps) => {
  const [specs, setSpecs] = useState<Partial<CarSpecifications>>({
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    trim: initialData?.trim || '',
    year: initialData?.year || '',
    color: initialData?.color || '',
    mileage: initialData?.mileage || 0
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(
    !!(specs.brand && specs.model && specs.trim)
  );

  const availableModels = specs.brand ? carModels[specs.brand] || [] : [];
  const availableTrims = specs.model ? carTrims[specs.model] || ['استاندارد', 'فول'] : [];

  const handleFieldChange = (field: keyof CarSpecifications, value: string | number) => {
    const newSpecs = { ...specs, [field]: value };
    
    // Reset dependent fields
    if (field === 'brand') {
      newSpecs.model = '';
      newSpecs.trim = '';
    } else if (field === 'model') {
      newSpecs.trim = '';
    }
    
    setSpecs(newSpecs);

    // Show additional fields when first three are completed
    if (newSpecs.brand && newSpecs.model && newSpecs.trim && !showAdditionalFields) {
      setShowAdditionalFields(true);
    }
  };

  const handleSubmit = () => {
    if (specs.brand && specs.model && specs.trim && specs.year && specs.color && specs.mileage) {
      onComplete(specs as CarSpecifications);
    }
  };

  const isComplete = specs.brand && specs.model && specs.trim && specs.year && specs.color && specs.mileage;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="car-card">
        <h2 className="text-2xl font-bold text-foreground mb-6">مشخصات خودرو</h2>
        
        <div className="space-y-6">
          {/* Initial three fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">برند</label>
              <div className="relative">
                <select
                  value={specs.brand}
                  onChange={(e) => handleFieldChange('brand', e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                >
                  <option value="">انتخاب برند</option>
                  {carBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">مدل</label>
              <div className="relative">
                <select
                  value={specs.model}
                  onChange={(e) => handleFieldChange('model', e.target.value)}
                  disabled={!specs.brand}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent appearance-none disabled:bg-muted disabled:cursor-not-allowed"
                >
                  <option value="">انتخاب مدل</option>
                  {availableModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">تریم</label>
              <div className="relative">
                <select
                  value={specs.trim}
                  onChange={(e) => handleFieldChange('trim', e.target.value)}
                  disabled={!specs.model}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent appearance-none disabled:bg-muted disabled:cursor-not-allowed"
                >
                  <option value="">انتخاب تریم</option>
                  {availableTrims.map(trim => (
                    <option key={trim} value={trim}>{trim}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Additional fields that appear after first three are filled */}
          {showAdditionalFields && (
            <div className="space-y-4 animate-fade-in">
              <div className="h-px bg-border my-6"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">سال ساخت</label>
                  <div className="relative">
                    <select
                      value={specs.year}
                      onChange={(e) => handleFieldChange('year', e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent appearance-none persian-numbers"
                    >
                      <option value="">انتخاب سال</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">رنگ خودرو</label>
                  <div className="relative">
                    <select
                      value={specs.color}
                      onChange={(e) => handleFieldChange('color', e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      <option value="">انتخاب رنگ</option>
                      {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">کیلومتر کارکرد</label>
                  <input
                    type="number"
                    value={specs.mileage || ''}
                    onChange={(e) => handleFieldChange('mileage', parseInt(e.target.value) || 0)}
                    placeholder="به کیلومتر"
                    className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent persian-numbers"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          {showAdditionalFields && (
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${
                  isComplete ? 'hover:shadow-lg' : ''
                }`}
              >
                تکمیل اطلاعات
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};