import { ArrowRight, Star, Shield, Calendar } from 'lucide-react';

interface CarDetailsProps {
  carId: string;
  onBack: () => void;
  onRequestPurchase: () => void;
}

const inspectionCategories = [
  {
    name: 'بدنه و لاستیک',
    items: [
      { name: 'وضعیت بدنه', status: 'تایید', rating: 5 },
      { name: 'لاستیک‌ها', status: 'تایید', rating: 4 },
      { name: 'شیشه‌ها', status: 'تایید', rating: 5 }
    ]
  },
  {
    name: 'برقی و داخلی',
    items: [
      { name: 'سیستم برق', status: 'تایید', rating: 4 },
      { name: 'تجهیزات داخلی', status: 'تایید', rating: 5 },
      { name: 'روشنایی', status: 'تایید', rating: 4 }
    ]
  }
];

export const CarDetails = ({ carId, onBack, onRequestPurchase }: CarDetailsProps) => {
  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

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
        <h2 className="text-2xl font-bold text-foreground">جزئیات خودرو</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car Gallery and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="car-card">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                  <Star className="w-8 h-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* General Specifications */}
          <div className="car-card">
            <h3 className="text-lg font-bold text-foreground mb-4">مشخصات کلی</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">برند:</span>
                <span className="font-medium">پژو</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">مدل:</span>
                <span className="font-medium">پژو ۲۰۸</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">سال:</span>
                <span className="font-medium persian-numbers">۱۴۰۲</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">کارکرد:</span>
                <span className="font-medium persian-numbers">۴۵,۰۰۰ کیلومتر</span>
              </div>
            </div>
          </div>

          {/* Health Inspection Report */}
          <div className="car-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">برگه کارشناسی سلامت</h3>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-success font-medium">تایید شده</span>
              </div>
            </div>

            <div className="space-y-6">
              {inspectionCategories.map((category, index) => (
                <div key={index}>
                  <h4 className="font-medium text-foreground mb-3">{category.name}</h4>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <span className="text-sm">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`w-4 h-4 ${
                                  starIndex < item.rating ? 'text-yellow-500 fill-current' : 'text-border'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.status === 'تایید' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-success/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">نمره کارشناسی کلی</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>تاریخ کارشناسی: ۱۴۰۳/۰۶/۱۵</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-success persian-numbers">۴.۵/۵</div>
              </div>
            </div>
          </div>

          {/* Body Blueprint */}
          <div className="car-card">
            <h3 className="text-lg font-bold text-foreground mb-4">بلوپرینت بدنه</h3>
            <div className="bg-accent rounded-xl p-6">
              <div className="w-full h-48 bg-background rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center">
                  <Star className="w-12 h-12 text-success mx-auto mb-2" />
                  <div className="text-success font-medium">بدنه در وضعیت عالی</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="lg:col-span-1">
          <div className="car-card sticky top-6">
            <h3 className="text-lg font-bold text-foreground mb-4">وضعیت خودرو</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">قیمت:</span>
                <span className="font-bold text-foreground persian-numbers">{formatPrice(950000000)} تومان</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">مابه‌التفاوت:</span>
                <span className="font-bold text-destructive persian-numbers">+{formatPrice(30000000)} تومان</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">وضعیت:</span>
                <span className="text-success font-medium">آماده تحویل</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-success" />
                <span>گارانتی ۶ ماهه</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span>بازدید رایگان</span>
              </div>
            </div>

            <button
              onClick={onRequestPurchase}
              className="w-full btn-primary"
            >
              درخواست خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};