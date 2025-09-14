import { CheckCircle, XCircle, FileText, Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface InspectionResultProps {
  onApproved: () => void;
  onRejected: () => void;
}

export const InspectionResult = ({ onApproved, onRejected }: InspectionResultProps) => {
  const [inspectionStatus] = useState<'approved' | 'rejected' | 'pending'>('approved');
  const [showDetails, setShowDetails] = useState(false);

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

  const inspectionDetails = {
    originalOffer: 950000000,
    revisedOffer: 920000000,
    reason: 'تشخیص رنگ جزئی در درب جلو راننده',
    difference: 30000000
  };

  const renderApprovedResult = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">تایید کارشناسی</h3>
        <p className="text-muted-foreground">
          خودروی شما با موفقیت تایید شد و آماده انجام معامله است
        </p>
      </div>

      <div className="car-card bg-success/5 border-success/20">
        <h4 className="font-bold text-foreground mb-4">مراحل بعدی:</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold">
              ۱
            </div>
            <div>
              <div className="font-medium">امضای قرارداد</div>
              <div className="text-sm text-muted-foreground">امضای قرارداد رسمی معاوضه</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold">
              ۲
            </div>
            <div>
              <div className="font-medium">فعال‌سازی Escrow</div>
              <div className="text-sm text-muted-foreground">حفاظت از منافع طرفین تا تکمیل معامله</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold">
              ۳
            </div>
            <div>
              <div className="font-medium">انتقال سند</div>
              <div className="text-sm text-muted-foreground">انجام فرآیندهای قانونی انتقال</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold">
              ۴
            </div>
            <div>
              <div className="font-medium">تحویل خودرو جدید</div>
              <div className="text-sm text-muted-foreground">دریافت خودروی جایگزین</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onApproved}
        className="w-full btn-primary"
      >
        ادامه فرآیند معامله
      </button>
    </div>
  );

  const renderRejectedResult = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-4">
          <XCircle className="w-12 h-12 text-destructive" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">تغییر در پیشنهاد</h3>
        <p className="text-muted-foreground">
          بر اساس کارشناسی، پیشنهاد جدیدی ارائه شده است
        </p>
      </div>

      <div className="car-card border-destructive/20">
        <h4 className="font-bold text-foreground mb-4">جزئیات کارشناسی:</h4>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">پیشنهاد اولیه:</span>
            <span className="font-medium persian-numbers">{formatPrice(inspectionDetails.originalOffer)} تومان</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">پیشنهاد تجدیدنظر شده:</span>
            <span className="font-bold text-destructive persian-numbers">{formatPrice(inspectionDetails.revisedOffer)} تومان</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">تفاوت:</span>
            <span className="font-bold text-destructive persian-numbers">-{formatPrice(inspectionDetails.difference)} تومان</span>
          </div>
        </div>

        <div className="p-4 bg-destructive/5 rounded-lg mb-6">
          <h5 className="font-medium text-foreground mb-2">دلیل تغییر:</h5>
          <p className="text-sm text-muted-foreground">{inspectionDetails.reason}</p>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm">مشاهده گزارش کامل کارشناسی</span>
        </button>

        {showDetails && (
          <div className="mt-4 p-4 bg-accent rounded-lg animate-fade-in">
            <div className="text-sm space-y-2">
              <div><strong>کارشناس:</strong> احمد محمدی</div>
              <div><strong>تاریخ:</strong> ۱۴۰۳/۰۶/۲۱</div>
              <div><strong>نتیجه:</strong> خودرو در وضعیت قابل قبول با آسیب جزئی</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onApproved}
          className="btn-primary"
        >
          پذیرش پیشنهاد جدید
        </button>
        <button
          onClick={onRejected}
          className="btn-outline"
        >
          عدم پذیرش و انصراف
        </button>
      </div>

      <div className="car-card bg-accent/50">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-foreground mb-1">در صورت عدم پذیرش:</div>
            <ul className="text-muted-foreground space-y-1">
              <li>• رزرو خودروی انتخابی آزاد خواهد شد</li>
              <li>• خودروی شما وارد سیستم مزایده می‌شود</li>
              <li>• امکان انتخاب خودروی جایگزین جدید وجود دارد</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">کارشناسی و اعلام نتیجه</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        {inspectionStatus === 'approved' && renderApprovedResult()}
        {inspectionStatus === 'rejected' && renderRejectedResult()}
      </div>
    </div>
  );
};