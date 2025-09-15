import { ArrowRight, MapPin, Building, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

interface InspectionScheduleProps {
  onScheduleComplete: () => void;
  onBack: () => void;
}

const cities = ['تهران', 'اصفهان', 'شیراز', 'مشهد', 'کرج', 'اهواز'];

const branches = {
  'تهران': ['شعبه مرکزی (ولیعصر)', 'شعبه شرق (تهرانپارس)', 'شعبه غرب (اکباتان)', 'شعبه شمال (ولنجک)'],
  'اصفهان': ['شعبه مرکزی (چهارباغ)', 'شعبه شرق (خیابان کاوه)'],
  'شیراز': ['شعبه مرکزی (زند)', 'شعبه شمال (دستغیب)'],
  'مشهد': ['شعبه مرکزی (احمدآباد)', 'شعبه شرق (سعدآباد)'],
  'کرج': ['شعبه مرکزی (فردیس)'],
  'اهواز': ['شعبه مرکزی (کیانپارس)']
};

const availableDates = [
  '۱۴۰۳/۰۶/۲۱', '۱۴۰۳/۰۶/۲۲', '۱۴۰۳/۰۶/۲۳', '۱۴۰۳/۰۶/۲۴', '۱۴۰۳/۰۶/۲۵'
];

const timeSlots = [
  '۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۳:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰'
];

export const InspectionSchedule = ({ onScheduleComplete, onBack }: InspectionScheduleProps) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableBranches = selectedCity ? branches[selectedCity as keyof typeof branches] || [] : [];
  const isComplete = selectedCity && selectedBranch && selectedDate && selectedTime;

  const handleSubmit = () => {
    if (isComplete) {
      onScheduleComplete();
    }
  };

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
        <h2 className="text-2xl font-bold text-foreground">نوبت‌گیری کارشناسی</h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Instructions */}
        <div className="car-card bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">مراحل کارشناسی</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• بازدید دقیق خودروی شما توسط کارشناس معتمد</li>
                <li>• تایید یا اعلام تغییرات احتمالی در قیمت</li>
                <li>• امضای قرارداد نهایی در صورت توافق</li>
                <li>• فعال‌سازی سیستم Escrow برای حفاظت از منافع طرفین</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scheduling Form */}
        <div className="car-card">
          <h3 className="text-xl font-bold text-foreground mb-6">انتخاب زمان و مکان</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="w-4 h-4" />
                انتخاب شهر
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedBranch('');
                }}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">انتخاب شهر</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Branch Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Building className="w-4 h-4" />
                انتخاب شعبه
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                disabled={!selectedCity}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed"
              >
                <option value="">انتخاب شعبه</option>
                {availableBranches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Selection */}
          {selectedBranch && (
            <div className="mt-6 space-y-3 animate-fade-in">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="w-4 h-4" />
                انتخاب تاریخ
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg border transition-all persian-numbers ${
                      selectedDate === date
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Time Selection */}
          {selectedDate && (
            <div className="mt-6 space-y-3 animate-fade-in">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="w-4 h-4" />
                انتخاب ساعت
              </label>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-all persian-numbers ${
                      selectedTime === time
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Appointment Summary */}
        {isComplete && (
          <div className="car-card bg-success/5 border-success/20 animate-fade-in">
            <h3 className="font-bold text-foreground mb-4">خلاصه نوبت انتخابی</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">شهر:</span>
                <div className="font-medium">{selectedCity}</div>
              </div>
              <div>
                <span className="text-muted-foreground">شعبه:</span>
                <div className="font-medium">{selectedBranch}</div>
              </div>
              <div>
                <span className="text-muted-foreground">تاریخ:</span>
                <div className="font-medium persian-numbers">{selectedDate}</div>
              </div>
              <div>
                <span className="text-muted-foreground">ساعت:</span>
                <div className="font-medium persian-numbers">{selectedTime}</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="btn-outline flex-1"
          >
            بازگشت
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تایید نوبت
          </button>
        </div>

        {/* Important Notes */}
        <div className="car-card bg-accent/50">
          <h4 className="font-medium text-foreground mb-3">نکات مهم:</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• لطفاً کلیه مدارک خودرو (کارت ماشین، بیمه‌نامه) را همراه داشته باشید</li>
            <li>• فرآیند کارشناسی حدود ۴۵ دقیقه زمان می‌برد</li>
            <li>• امکان تغییر نوبت تا ۲۴ ساعت قبل از موعد وجود دارد</li>
          </ul>
        </div>
      </div>
    </div>
  );
};