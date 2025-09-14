import { useState } from 'react';
import { Edit3, Heart, BarChart3, Star, X } from 'lucide-react';
import { CarData, ReplacementCar } from '../../../types/car';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import car1 from '../../../assets/car1.jpg';
import car2 from '../../../assets/car2.jpg';
import car3 from '../../../assets/car3.jpg';

interface ReplacementCarsListProps {
  userCar: CarData;
  onEditInfo: () => void;
  onCarSelect: (carId: string) => void;
}

const sampleCars: ReplacementCar[] = [
  {
    id: '1',
    brand: 'پژو',
    model: 'پژو ۲۰۸',
    year: 1402,
    price: 950000000,
    mileage: 45000,
    image: car1,
    difference: 30000000,
    hasOffer: true
  },
  {
    id: '2',
    brand: 'رنو',
    model: 'رنو ساندرو',
    year: 1401,
    price: 880000000,
    mileage: 52000,
    image: car2,
    difference: -40000000
  },
  {
    id: '3',
    brand: 'هیوندای',
    model: 'هیوندای i20',
    year: 1402,
    price: 1020000000,
    mileage: 38000,
    image: car3,
    difference: 100000000
  }
];

export const ReplacementCarsList = ({ userCar, onEditInfo, onCarSelect }: ReplacementCarsListProps) => {
  const [priceRange, setPriceRange] = useState([800000000, 1200000000]);
  const [selectedBrand, setSelectedBrand] = useState('');
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
            <h3 className="text-lg font-bold text-foreground">خودروی شما</h3>
            <button
              onClick={onEditInfo}
              className="btn-outline text-sm"
            >
              ویرایش اطلاعات
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center">
              <Star className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <div className="font-medium">{userCar.specifications.brand} {userCar.specifications.model}</div>
              <div className="text-sm text-muted-foreground persian-numbers">{userCar.specifications.year} • {formatMileage(userCar.specifications.mileage)} کیلومتر</div>
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
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">بازه قیمتی</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="500000000"
                    max="2000000000"
                    step="10000000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground persian-numbers">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">انتخاب برند</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">همه برندها</option>
                  <option value="پژو">پژو</option>
                  <option value="رنو">رنو</option>
                  <option value="هیوندای">هیوندای</option>
                  <option value="کیا">کیا</option>
                </select>
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