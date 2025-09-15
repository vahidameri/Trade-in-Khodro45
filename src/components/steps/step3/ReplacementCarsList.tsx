import { useState } from 'react';
import { Heart, BarChart3, Edit3, Car, FilterX, Star, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Slider } from '../../ui/slider';
import { CarData, ReplacementCar } from '../../../types/car';
import { formatPersianPrice, formatPersianMileage } from '../../../lib/persianUtils';
import iranianCar1 from '../../../assets/iranian-car1.jpg';

interface ReplacementCarsListProps {
  userCar: CarData;
  onEditInfo: () => void;
  onCarSelect: (carId: string) => void;
}

const sampleCars: ReplacementCar[] = Array.from({ length: 15 }, (_, index) => ({
  id: `car-${index + 1}`,
  brand: ['پژو', 'سایپا', 'ایران خودرو', 'چری', 'کیا'][index % 5],
  model: [`مدل ${index + 1}`, 'دنا', '206', 'تیگو', 'سراتو'][index % 5],
  year: 1400 + (index % 4),
  price: 850000000 + (index * 100000000),
  mileage: 20000 + (index * 15000),
  image: `/src/assets/car${(index % 3) + 1}.jpg`,
  difference: 30000000 + (index * 10000000),
  isFavorite: false,
  isComparing: false,
  hasOffer: index % 4 === 0
}));

export const ReplacementCarsList = ({ userCar, onEditInfo, onCarSelect }: ReplacementCarsListProps) => {
  const userCarEstimatedPrice = 900000000; // User's car estimated price
  const [priceRange, setPriceRange] = useState([userCarEstimatedPrice + 50000000, 5000000000]); // User price + 50M to 5B
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [comparing, setComparing] = useState<Set<string>>(new Set());
  const [showCompareModal, setShowCompareModal] = useState(false);

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');
  const formatMileage = (mileage: number) => mileage.toLocaleString('fa-IR');

  const toggleFavorite = (carId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
      } else {
        newFavorites.add(carId);
      }
      return newFavorites;
    });
  };

  const toggleCompare = (carId: string) => {
    setComparing(prev => {
      const newComparing = new Set(prev);
      if (newComparing.has(carId)) {
        newComparing.delete(carId);
      } else if (newComparing.size < 4) {
        newComparing.add(carId);
      }
      return newComparing;
    });
  };

  const getComparingCars = () => {
    return sampleCars.filter(car => comparing.has(car.id));
  };

  const clearComparison = () => {
    setComparing(new Set());
    setShowCompareModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header with User Car */}
      <div className="flex items-center justify-between">
        <div className="car-card flex-1 max-w-md">
          <div className="flex items-center justify-between mb-4">
            {/* Large Bold Header: Year, Brand, Model */}
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {userCar.specifications.year} {userCar.specifications.brand} {userCar.specifications.model}
              </h3>
            </div>
            <button
              onClick={onEditInfo}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          {/* Car Image */}
          <div className="mb-4">
            <img 
              src={iranianCar1} 
              alt="خودروی شما"
              className="w-full h-32 object-cover rounded-xl"
            />
          </div>
          
          {/* Card Body: Color and Mileage */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">رنگ:</span>
              <span className="font-medium text-foreground">{userCar.specifications.color}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">کارکرد:</span>
              <span className="font-medium text-foreground">{formatPersianMileage(userCar.specifications.mileage)} کیلومتر</span>
            </div>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">قیمت تخمینی</div>
                <div className="text-lg font-bold text-primary">{formatPersianPrice(userCarEstimatedPrice)} تومان</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="car-card sticky top-6">
            <h3 className="text-lg font-bold text-foreground mb-6">فیلترها</h3>
            
            <div className="space-y-6">
              {/* Price Range Filter - RTL Aligned */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">محدوده قیمت</label>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPersianPrice(priceRange[1])}</span>
                    <span>{formatPersianPrice(priceRange[0])}</span>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={userCarEstimatedPrice + 50000000}
                      max={5000000000}
                      step={50000000}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">برند</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب برند" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ایران‌خودرو">ایران‌خودرو</SelectItem>
                    <SelectItem value="سایپا">سایپا</SelectItem>
                    <SelectItem value="پارس‌خودرو">پارس‌خودرو</SelectItem>
                    <SelectItem value="مدیران‌خودرو">مدیران‌خودرو</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Model Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">مدل</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب مدل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="پژو ۲۰۶">پژو ۲۰۶</SelectItem>
                    <SelectItem value="پژو ۲۰۷">پژو ۲۰۷</SelectItem>
                    <SelectItem value="پژو پارس">پژو پارس</SelectItem>
                    <SelectItem value="سمند">سمند</SelectItem>
                    <SelectItem value="دنا">دنا</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">رنگ</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب رنگ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="سفید">سفید</SelectItem>
                    <SelectItem value="مشکی">مشکی</SelectItem>
                    <SelectItem value="نقره‌ای">نقره‌ای</SelectItem>
                    <SelectItem value="قرمز">قرمز</SelectItem>
                    <SelectItem value="آبی">آبی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">شهر</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب شهر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تهران">تهران</SelectItem>
                    <SelectItem value="اصفهان">اصفهان</SelectItem>
                    <SelectItem value="مشهد">مشهد</SelectItem>
                    <SelectItem value="شیراز">شیراز</SelectItem>
                    <SelectItem value="تبریز">تبریز</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sampleCars.map(car => (
              <div key={car.id} className="car-card group cursor-pointer" onClick={() => onCarSelect(car.id)}>
                {/* Car Image */}
                <div className="aspect-video bg-accent rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Car Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-foreground">{car.brand} {car.model}</h4>
                      <div className="text-sm text-muted-foreground persian-numbers">
                        {car.year} • {formatMileage(car.mileage)} کیلومتر
                      </div>
                    </div>
                    {car.hasOffer && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        پیشنهاد خودرو۴۵
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">قیمت:</span>
                      <span className="font-bold text-foreground persian-numbers">
                        {formatPrice(car.price)} تومان
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">مابه‌التفاوت:</span>
                      <span className={`font-bold persian-numbers ${
                        car.difference > 0 ? 'text-destructive' : 'text-success'
                      }`}>
                        {car.difference > 0 ? '+' : ''}{formatPrice(Math.abs(car.difference))} تومان
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(car.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        favorites.has(car.id) 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'hover:bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={favorites.has(car.id) ? 'currentColor' : 'none'} />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(car.id);
                      }}
                      disabled={!comparing.has(car.id) && comparing.size >= 4}
                      className={`p-2 rounded-lg transition-colors ${
                        comparing.has(car.id) 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-muted/50 text-muted-foreground disabled:opacity-50'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compare Bar */}
          {comparing.size > 0 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-xl shadow-lg p-4 z-50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {comparing.size} خودرو انتخاب شده برای مقایسه
                </span>
                <button 
                  onClick={() => setShowCompareModal(true)}
                  disabled={comparing.size < 2}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  مقایسه
                </button>
                <button
                  onClick={clearComparison}
                  className="text-sm text-muted-foreground hover:text-destructive"
                >
                  پاک کردن
                </button>
              </div>
            </div>
          )}

          {/* Compare Modal */}
          <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
            <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>مقایسه خودروها</DialogTitle>
                  <button
                    onClick={clearComparison}
                    className="text-sm text-destructive hover:text-destructive/80"
                  >
                    پاک کردن همه
                  </button>
                </div>
              </DialogHeader>
              
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">مشخصات</TableHead>
                      {getComparingCars().map(car => (
                        <TableHead key={car.id} className="text-center min-w-[200px]">
                          <div className="space-y-2">
                            <img 
                              src={car.image} 
                              alt={`${car.brand} ${car.model}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="text-sm font-medium">{car.brand} {car.model}</div>
                            <button
                              onClick={() => toggleCompare(car.id)}
                              className="text-xs text-destructive hover:text-destructive/80"
                            >
                              <X className="w-4 h-4 mx-auto" />
                            </button>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">قیمت</TableCell>
                      {getComparingCars().map(car => (
                        <TableCell key={car.id} className="text-center persian-numbers">
                          {formatPrice(car.price)} تومان
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">سال ساخت</TableCell>
                      {getComparingCars().map(car => (
                        <TableCell key={car.id} className="text-center persian-numbers">
                          {car.year}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">کارکرد</TableCell>
                      {getComparingCars().map(car => (
                        <TableCell key={car.id} className="text-center persian-numbers">
                          {formatMileage(car.mileage)} کیلومتر
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">مابه‌التفاوت</TableCell>
                      {getComparingCars().map(car => (
                        <TableCell key={car.id} className="text-center">
                          <span className={`font-bold persian-numbers ${
                            car.difference > 0 ? 'text-destructive' : 'text-success'
                          }`}>
                            {car.difference > 0 ? '+' : ''}{formatPrice(Math.abs(car.difference))} تومان
                          </span>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">عملیات</TableCell>
                      {getComparingCars().map(car => (
                        <TableCell key={car.id} className="text-center">
                          <button
                            onClick={() => onCarSelect(car.id)}
                            className="btn-primary text-sm px-3 py-2"
                          >
                            مشاهده جزئیات
                          </button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};