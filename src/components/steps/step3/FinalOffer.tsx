import { ArrowRight, Clock, AlertTriangle, Check } from 'lucide-react';
import { CarData } from '../../../types/car';
import { formatPersianPrice, formatPersianMileage } from '../../../lib/persianUtils';

interface FinalOfferProps {
  carData: CarData;
  selectedCarId: string;
  paymentMethod: 'cash' | 'installment';
  onConfirm: () => void;
  onBack: () => void;
}

export const FinalOffer = ({ carData, selectedCarId, paymentMethod, onConfirm, onBack }: FinalOfferProps) => {
  const formatPrice = (price: number) => formatPersianPrice(price);

  const currentCarValue = 880000000;
  const replacementCarPrice = 950000000;
  const difference = replacementCarPrice - currentCarValue;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-foreground">پیشنهاد نهایی</h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Price Summary */}
        <div className="car-card">
          <h3 className="text-xl font-bold text-foreground mb-6">خلاصه قیمت‌ها</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
              <span className="font-medium">ارزش خودروی فعلی شما:</span>
              <span className="font-bold text-success">{formatPrice(currentCarValue)} تومان</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
              <span className="font-medium">قیمت خودروی جایگزین:</span>
              <span className="font-bold text-foreground">{formatPrice(replacementCarPrice)} تومان</span>
            </div>
            
            <div className="h-px bg-border"></div>
            
            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
              <span className="font-bold text-lg">مابه‌التفاوت قابل پرداخت:</span>
              <span className="font-bold text-xl text-primary">
                {formatPrice(difference)} تومان
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="car-card">
          <h3 className="text-xl font-bold text-foreground mb-4">روش پرداخت انتخابی</h3>
          
          <div className="p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="font-medium">
                {paymentMethod === 'cash' ? 'پرداخت نقدی' : 'پرداخت اقساطی'}
              </span>
            </div>
            
            {paymentMethod === 'installment' && (
              <div className="mt-3 text-sm text-muted-foreground">
                قسط ماهیانه: <span>{formatPrice(1050000)} تومان</span> به مدت ۳۶ ماه
              </div>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="car-card border-l-4 border-l-primary">
          <h3 className="text-xl font-bold text-foreground mb-4">شرایط پیشنهاد</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">اعتبار پیشنهاد: ۷۲ ساعت</div>
                <div className="text-sm text-muted-foreground mt-1">
                  این پیشنهاد تا تاریخ ۱۴۰۳/۰۶/۲۰ ساعت ۱۸:۰۰ معتبر است
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <div className="font-medium text-foreground">قابلیت تغییر: ±۱۰٪</div>
                <div className="text-sm text-muted-foreground mt-1">
                  بر اساس کارشناسی نهایی، امکان تغییر قیمت تا ۱۰ درصد وجود دارد
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Car Comparison Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="car-card">
            <h4 className="font-bold text-foreground mb-3">خودروی فعلی</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>برند و مدل:</span>
                <span>{carData.specifications.brand} {carData.specifications.model}</span>
              </div>
              <div className="flex justify-between">
                <span>سال:</span>
                <span>{carData.specifications.year}</span>
              </div>
              <div className="flex justify-between">
                <span>کارکرد:</span>
                <span>{formatPersianMileage(carData.specifications.mileage)} کیلومتر</span>
              </div>
            </div>
          </div>

          <div className="car-card">
            <h4 className="font-bold text-foreground mb-3">خودروی جایگزین</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>برند و مدل:</span>
                <span>پژو ۲۰۸</span>
              </div>
              <div className="flex justify-between">
                <span>سال:</span>
                <span>۱۴۰۲</span>
              </div>
              <div className="flex justify-between">
                <span>کارکرد:</span>
                <span>{formatPersianMileage(45000)} کیلومتر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="btn-outline flex-1"
          >
            بازگشت
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary flex-1"
          >
            تایید و رزرو
          </button>
        </div>

        {/* Legal Notice */}
        <div className="car-card bg-accent/50">
          <p className="text-sm text-muted-foreground">
            با تایید این پیشنهاد، خودروی انتخابی شما به مدت ۷۲ ساعت رزرو خواهد شد. 
            برای تکمیل فرآیند، نیاز به حضور در مرکز کارشناسی جهت بازدید نهایی و امضای قرارداد دارید.
          </p>
        </div>
      </div>
    </div>
  );
};