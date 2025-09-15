import { useState } from 'react';
import { Heart, BarChart3, Edit3, Car, FilterX, Star, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Slider } from '../../ui/slider';
import { CarData, ReplacementCar } from '../../../types/car';
import { formatPersianPrice, formatPersianMileage } from '../../../lib/persianUtils';
import carNew1 from '../../../assets/car-new-1.jpg';
import carNew2 from '../../../assets/car-new-2.jpg';
import carNew3 from '../../../assets/car-new-3.jpg';
import carNew4 from '../../../assets/car-new-4.jpg';

interface ReplacementCarsListProps {
  userCar: CarData;
  onEditInfo: () => void;
  onCarSelect: (carId: string) => void;
}

const carImages = [carNew1, carNew2, carNew3, carNew4];

const sampleCars: ReplacementCar[] = Array.from({ length: 15 }, (_, index) => ({
  id: `car-${index + 1}`,
  brand: ['پژو', 'سایپا', 'ایران خودرو', 'چری', 'کیا'][index % 5],
  model: [`مدل ${index + 1}`, 'دنا', '206', 'تیگو', 'سراتو'][index % 5],
  year: 1400 + (index % 4),
  price: 850000000 + (index * 100000000),
  mileage: 20000 + (index * 15000),
  image: carImages[index % 4],
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
  // Initialize with cars that have higher value than user's car (minimum 10 cars)
  const [filteredCars, setFilteredCars] = useState(sampleCars.filter(car => car.difference > 0));
  const [hasFiltersChanged, setHasFiltersChanged] = useState(false);

  const formatPrice = (price: number) => formatPersianPrice(price);
  const formatMileage = (mileage: number) => formatPersianMileage(mileage);

  // Brand to model mapping
  const brandModelMap = {
    'پژو': ['206', '207', 'پارس', '405'],
    'سایپا': ['پراید', 'تیبا', 'ساینا', 'کوئیک'],
    'ایران خودرو': ['دنا', 'سمند', 'رانا', 'تارا'],
    'چری': ['تیگو', 'آریزو', 'تیگو 7', 'تیگو 8'],
    'کیا': ['سراتو', 'اپتیما', 'سورنتو', 'اسپورتیج']
  };

  const getAvailableModels = () => {
    if (!selectedBrand) return [];
    return brandModelMap[selectedBrand as keyof typeof brandModelMap] || [];
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel(''); // Reset model when brand changes
    handleFilterChange();
  };

  const handleFilterChange = () => {
    setHasFiltersChanged(true);
  };

  const applyFilters = () => {
    let filtered = [...sampleCars];
    
    // Filter by price range
    filtered = filtered.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);
    
    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(car => car.brand === selectedBrand);
    }
    
    // Filter by model  
    if (selectedModel) {
      filtered = filtered.filter(car => car.model === selectedModel);
    }
    
    // Show only cars with higher price than user's car (as requested)
    filtered = filtered.filter(car => car.difference > 0);
    
    setFilteredCars(filtered);
    setHasFiltersChanged(false);
  };

  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedColor('');
    setSelectedCity('');
    setPriceRange([userCarEstimatedPrice + 50000000, 5000000000]);
    setFilteredCars(sampleCars.filter(car => car.difference > 0));
    setHasFiltersChanged(false);
  };

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
              src={carNew1} 
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
              {/* Price Range Filter - Proper RTL Implementation */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">محدوده قیمت</label>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="persian-numbers">حداقل: {formatPersianPrice(priceRange[0])}</span>
                    <span className="persian-numbers">حداکثر: {formatPersianPrice(priceRange[1])}</span>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => {
                        setPriceRange(value);
                        handleFilterChange();
                      }}
                      min={userCarEstimatedPrice + 50000000}
                      max={5000000000}
                      step={50000000}
                      className="w-full [&>span:first-child]:!flex-row-reverse"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">برند</label>
                <Select value={selectedBrand} onValueChange={handleBrandChange}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب برند" />
                  </SelectTrigger>
                  <SelectContent className="dropdown-content">
                    <SelectItem value="پژو" className="dropdown-item">پژو</SelectItem>
                    <SelectItem value="سایپا" className="dropdown-item">سایپا</SelectItem>
                    <SelectItem value="ایران خودرو" className="dropdown-item">ایران خودرو</SelectItem>
                    <SelectItem value="چری" className="dropdown-item">چری</SelectItem>
                    <SelectItem value="کیا" className="dropdown-item">کیا</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Model Filter - Dependent on Brand */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">مدل</label>
                <Select 
                  value={selectedModel} 
                  onValueChange={(value) => {
                    setSelectedModel(value);
                    handleFilterChange();
                  }}
                  disabled={!selectedBrand}
                >
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder={selectedBrand ? "انتخاب مدل" : "ابتدا برند را انتخاب کنید"} />
                  </SelectTrigger>
                  <SelectContent className="dropdown-content">
                    {getAvailableModels().map(model => (
                      <SelectItem key={model} value={model} className="dropdown-item">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">رنگ</label>
                <Select value={selectedColor} onValueChange={(value) => {
                  setSelectedColor(value);
                  handleFilterChange();
                }}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب رنگ" />
                  </SelectTrigger>
                  <SelectContent className="dropdown-content">
                    <SelectItem value="سفید" className="dropdown-item">سفید</SelectItem>
                    <SelectItem value="مشکی" className="dropdown-item">مشکی</SelectItem>
                    <SelectItem value="نقره‌ای" className="dropdown-item">نقره‌ای</SelectItem>
                    <SelectItem value="قرمز" className="dropdown-item">قرمز</SelectItem>
                    <SelectItem value="آبی" className="dropdown-item">آبی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-right">شهر</label>
                <Select value={selectedCity} onValueChange={(value) => {
                  setSelectedCity(value);
                  handleFilterChange();
                }}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب شهر" />
                  </SelectTrigger>
                  <SelectContent className="dropdown-content">
                    <SelectItem value="تهران" className="dropdown-item">تهران</SelectItem>
                    <SelectItem value="اصفهان" className="dropdown-item">اصفهان</SelectItem>
                    <SelectItem value="مشهد" className="dropdown-item">مشهد</SelectItem>
                    <SelectItem value="شیراز" className="dropdown-item">شیراز</SelectItem>
                    <SelectItem value="تبریز" className="dropdown-item">تبریز</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Apply Filters Button */}
              {hasFiltersChanged && (
                <div className="pt-4 space-y-2">
                  <button
                    onClick={applyFilters}
                    className="w-full btn-primary"
                  >
                    اعمال فیلتر
                  </button>
                  <button
                    onClick={resetFilters}
                    className="w-full btn-outline text-sm"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredCars.length} خودرو یافت شد
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCars.map(car => (
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
                <span className="text-sm font-medium persian-numbers">
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