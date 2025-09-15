import { useState } from 'react';
import { Edit3, Car } from 'lucide-react';
import { CarSpecifications, CarCondition } from '../../types/car';
import { formatPersianMileage } from '../../lib/persianUtils';

interface Step2CarConditionProps {
  carSpecs: CarSpecifications;
  onComplete: (condition: CarCondition) => void;
  onEditSpecs: () => void;
  initialData?: CarCondition;
}

const bodyParts = [
  'گلگیر جلو راننده', 'گلگیر جلو شاگرد', 'گلگیر عقب راننده', 'گلگیر عقب شاگرد',
  'درب جلو راننده', 'درب جلو شاگرد', 'درب عقب راننده', 'درب عقب شاگرد',
  'کاپوت', 'صندوق', 'سقف'
];

const chassisParts = [
  'شاسی جلو راننده', 'شاسی جلو شاگرد', 'شاسی عقب راننده', 'شاسی عقب شاگرد'
];

const upperChassisParts = [
  'سرشاسی جلو راننده', 'سرشاسی جلو شاگرد', 'سرشاسی عقب راننده', 'سرشاسی عقب شاگرد'
];

const bodyPartOptions = ['رنگ', 'جزئی‌رنگ', 'تعویض', 'پاشش‌رنگ'];
const chassisOptions = ['آسیب', 'جزئی‌رنگ', 'تعویض', 'پاشش رنگ'];
const upperChassisOptions = ['آسیب', 'جزئی‌رنگ', 'تعویض'];
const apronOptions = ['رنگ', 'جزئی‌رنگ', 'تعویض'];
const plateApronOptions = ['رنگ', 'جزئی', 'پاشش رنگ', 'تعویض'];

export const Step2CarCondition = ({ carSpecs, onComplete, onEditSpecs, initialData }: Step2CarConditionProps) => {
  const [condition, setCondition] = useState<CarCondition>({
    bodyParts: initialData?.bodyParts || {},
    chassisParts: initialData?.chassisParts || {},
    upperChassis: initialData?.upperChassis || {},
    otherParts: initialData?.otherParts || {}
  });

  const handlePartCondition = (category: keyof CarCondition, part: string, value: string) => {
    if (category === 'otherParts') {
      setCondition(prev => ({
        ...prev,
        otherParts: { ...prev.otherParts, [part]: value }
      }));
    } else {
      setCondition(prev => ({
        ...prev,
        [category]: { ...prev[category], [part]: value }
      }));
    }
  };

  const handleAuctionToggle = (checked: boolean) => {
    setCondition(prev => ({
      ...prev,
      otherParts: { ...prev.otherParts, isAuction: checked }
    }));
  };

  const handleSubmit = () => {
    onComplete(condition);
  };


  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car Specs Card */}
        <div className="lg:col-span-1">
          <div className="car-card sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">مشخصات خودرو شما</h3>
              <button
                onClick={onEditSpecs}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center mb-6 p-8 bg-accent rounded-xl">
              <Car className="w-16 h-16 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">برند و مدل:</span>
                <span className="font-medium">{carSpecs.brand} {carSpecs.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تریم:</span>
                <span className="font-medium">{carSpecs.trim}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">سال ساخت:</span>
                <span className="font-medium">{carSpecs.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">رنگ:</span>
                <span className="font-medium">{carSpecs.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">کارکرد:</span>
                <span className="font-medium">{formatPersianMileage(carSpecs.mileage)} کیلومتر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Condition Form */}
        <div className="lg:col-span-2">
          <div className="car-card">
            <h2 className="text-2xl font-bold text-foreground mb-6">وضعیت خودرو</h2>
            <p className="text-muted-foreground mb-8">
              در صورت سالم بودن قطعات، آن‌ها را خالی رها کنید
            </p>

            <div className="space-y-8">
              {/* Body Parts */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">قطعات بدنه</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bodyParts.map(part => (
                    <div key={part} className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">{part}</label>
                      <select
                        value={condition.bodyParts[part] || ''}
                        onChange={(e) => handlePartCondition('bodyParts', part, e.target.value)}
                        className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">سالم</option>
                        {bodyPartOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chassis Parts */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">قطعات شاسی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chassisParts.map(part => (
                    <div key={part} className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">{part}</label>
                      <select
                        value={condition.chassisParts[part] || ''}
                        onChange={(e) => handlePartCondition('chassisParts', part, e.target.value)}
                        className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">سالم</option>
                        {chassisOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upper Chassis */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">سرشاسی‌ها</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upperChassisParts.map(part => (
                    <div key={part} className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">{part}</label>
                      <select
                        value={condition.upperChassis[part] || ''}
                        onChange={(e) => handlePartCondition('upperChassis', part, e.target.value)}
                        className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">سالم</option>
                        {upperChassisOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Parts */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">سایر قطعات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">پالونی جلو</label>
                    <select
                      value={condition.otherParts.frontApron || ''}
                      onChange={(e) => handlePartCondition('otherParts', 'frontApron', e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">سالم</option>
                      {apronOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">پالونی عقب</label>
                    <select
                      value={condition.otherParts.rearApron || ''}
                      onChange={(e) => handlePartCondition('otherParts', 'rearApron', e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">سالم</option>
                      {apronOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">سینی و پالونی</label>
                    <select
                      value={condition.otherParts.plateAndApron || ''}
                      onChange={(e) => handlePartCondition('otherParts', 'plateAndApron', e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">سالم</option>
                      {plateApronOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full btn-primary"
                >
                  تخمین قیمت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
