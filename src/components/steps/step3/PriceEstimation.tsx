import { Edit3, Car, Shield, Clock, CheckCircle } from 'lucide-react';
import { CarData } from '../../../types/car';
import { formatPersianPrice, formatPersianMileage } from '../../../lib/persianUtils';

interface PriceEstimationProps {
  carData: CarData;
  onEditSpecs: () => void;
  onEditCondition: () => void;
  onRequestExchange: () => void;
}

export const PriceEstimation = ({ carData, onEditSpecs, onEditCondition, onRequestExchange }: PriceEstimationProps) => {

  const getDamageColor = (damageType: string) => {
    switch (damageType) {
      case 'جزئی‌رنگ': return 'damage-minor';
      case 'رنگ': return 'damage-paint';
      case 'تعویض': return 'damage-replace';
      default: return 'damage-healthy';
    }
  };

  const getDamageList = () => {
    const damages: { part: string; type: string }[] = [];
    
    Object.entries(carData.condition.bodyParts).forEach(([part, type]) => {
      if (type) damages.push({ part, type });
    });
    
    Object.entries(carData.condition.chassisParts).forEach(([part, type]) => {
      if (type) damages.push({ part, type });
    });
    
    Object.entries(carData.condition.upperChassis).forEach(([part, type]) => {
      if (type) damages.push({ part, type });
    });

    return damages;
  };

  const damageList = getDamageList();
  const estimatedPrice = { min: 850000000, max: 920000000 }; // Sample prices

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">تخمین قیمت خودرو</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car Specifications Card */}
        <div className="car-card">
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
              <span className="font-medium">{carData.specifications.brand} {carData.specifications.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">تریم:</span>
              <span className="font-medium">{carData.specifications.trim}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">سال ساخت:</span>
              <span className="font-medium">{carData.specifications.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">رنگ:</span>
              <span className="font-medium">{carData.specifications.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">کارکرد:</span>
              <span className="font-medium">{formatPersianMileage(carData.specifications.mileage)} کیلومتر</span>
            </div>
          </div>
        </div>

        {/* Car Condition Card */}
        <div className="car-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">وضعیت خودرو</h3>
            <button
              onClick={onEditCondition}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Car Condition Image */}
          <div className="bg-accent rounded-xl p-6 mb-4">
            <img 
              src="user-uploads://images.png" 
              alt="وضعیت خودرو"
              className="w-full h-32 object-contain rounded-lg"
            />
          </div>

          {/* Damage Legend */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded damage-minor"></div>
              <span>جزئی‌رنگ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded damage-paint"></div>
              <span>رنگ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded damage-replace"></div>
              <span>تعویض</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded damage-healthy"></div>
              <span>سالم</span>
            </div>
          </div>

          {/* Damage List */}
          {damageList.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">آسیب‌های ثبت شده:</h4>
              <ul className="space-y-1 text-sm">
                {damageList.map((damage, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{damage.part}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getDamageColor(damage.type)}`}>
                      {damage.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center text-success font-medium">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              خودرو در وضعیت عالی
            </div>
          )}
        </div>

        {/* Car45 Offer Card */}
        <div className="car-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <h3 className="text-lg font-bold text-foreground mb-4">قیمت تخمینی خودروی شما</h3>
          
          {/* Price Range Bar */}
          <div className="mb-6">
            <div className="relative h-16 bg-border rounded-xl overflow-hidden">
              {/* Min Price (Right side in RTL) */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-foreground">
                <div>{formatPersianPrice(estimatedPrice.min)}</div>
                <div className="text-xs">حداقل</div>
              </div>
              
              {/* Max Price (Left side in RTL) */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-foreground">
                <div>{formatPersianPrice(estimatedPrice.max)}</div>
                <div className="text-xs">حداکثر</div>
              </div>
              
              {/* Center Orange Section */}
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 mx-20 h-10 bg-primary rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-xs font-medium">قیمت تخمینی خودروی شما</div>
                  <div className="text-sm font-bold">
                    {formatPersianPrice(Math.round((estimatedPrice.min + estimatedPrice.max) / 2))} تومان
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-foreground">واریز وجه کامل</div>
                <div className="text-muted-foreground">حداکثر ۴۸ ساعت بعد از امضا</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-foreground">نظارت حقوقی</div>
                <div className="text-muted-foreground">تمامی مراحل تحت نظارت کارشناس حقوقی</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-foreground">مراجعه یکباره</div>
                <div className="text-muted-foreground">تنها یک مرتبه مراجعه حضوری</div>
              </div>
            </div>
          </div>

          <button
            onClick={onRequestExchange}
            className="w-full btn-primary"
          >
            درخواست معاوضه خودرو
          </button>
        </div>
      </div>
    </div>
  );
};