import { ArrowRight, CreditCard, Banknote, Calendar, Check } from 'lucide-react';

interface PaymentMethodProps {
  onMethodSelect: (method: 'cash' | 'installment') => void;
  onBack: () => void;
}

const installmentPlans = [
  { months: 12, monthlyPayment: 2500000, totalInterest: 5000000 },
  { months: 24, monthlyPayment: 1400000, totalInterest: 12000000 },
  { months: 36, monthlyPayment: 1050000, totalInterest: 20000000 }
];

export const PaymentMethod = ({ onMethodSelect, onBack }: PaymentMethodProps) => {
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
        <h2 className="text-2xl font-bold text-foreground">انتخاب روش پرداخت</h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cash Payment */}
        <div className="car-card border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer group"
             onClick={() => onMethodSelect('cash')}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-success/10 rounded-xl">
              <Banknote className="w-8 h-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">پرداخت نقدی</h3>
              <p className="text-muted-foreground">تسویه کامل و سریع</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm">سریع‌ترین روش پرداخت</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm">بدون هزینه اضافی</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm">تحویل فوری خودرو</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm">تخفیف ویژه نقدی</span>
            </div>
          </div>

          <div className="p-4 bg-success/5 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1 persian-numbers">
                {formatPrice(920000000)}
              </div>
              <div className="text-sm text-muted-foreground">تومان (نقدی)</div>
            </div>
          </div>

          <button className="w-full mt-6 btn-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            انتخاب پرداخت نقدی
          </button>
        </div>

        {/* Installment Payment */}
        <div className="car-card border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer group"
             onClick={() => onMethodSelect('installment')}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">پرداخت اقساطی</h3>
              <p className="text-muted-foreground">تسهیلات بازپرداخت</p>
            </div>
          </div>

          {/* Installment Plans */}
          <div className="space-y-3 mb-6">
            {installmentPlans.map((plan, index) => (
              <div key={index} className="p-3 bg-accent rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium persian-numbers">{plan.months} ماه</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold persian-numbers">{formatPrice(plan.monthlyPayment)}</div>
                    <div className="text-xs text-muted-foreground">ماهیانه</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-sm">بدون ضامن</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-sm">تایید سریع وام</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-sm">امکان پیش‌پرداخت</span>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-primary mb-1">
                از <span className="persian-numbers">{formatPrice(installmentPlans[2].monthlyPayment)}</span>
              </div>
              <div className="text-sm text-muted-foreground">ماهیانه</div>
            </div>
          </div>

          <button className="w-full mt-6 btn-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            انتخاب پرداخت اقساطی
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="max-w-4xl mx-auto car-card bg-accent/50">
        <h4 className="font-medium text-foreground mb-3">شرایط و ضوابط:</h4>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• تمامی قیمت‌ها شامل مالیات بر ارزش افزوده می‌باشد</li>
          <li>• امکان تغییر روش پرداخت تا قبل از امضای قرارداد وجود دارد</li>
          <li>• پرداخت اقساطی نیاز به بررسی اعتباری دارد</li>
          <li>• گارانتی شرکت بر روی تمامی خودروها اعمال می‌شود</li>
        </ul>
      </div>
    </div>
  );
};