import { useState } from 'react';
import { CarData } from '../../types/car';
import { PriceEstimation } from './step3/PriceEstimation';
import { ReplacementCarsList } from './step3/ReplacementCarsList';
import { CarDetails } from './step3/CarDetails';
import { PaymentMethod } from './step3/PaymentMethod';
import { FinalOffer } from './step3/FinalOffer';
import { InspectionSchedule } from './step3/InspectionSchedule';
import { InspectionResult } from './step3/InspectionResult';

interface Step3ExchangeProps {
  carData: CarData;
  onEditSpecs: () => void;
  onEditCondition: () => void;
}

export type Step3Page = 
  | 'estimation' 
  | 'replacement-list' 
  | 'car-details' 
  | 'payment-method' 
  | 'final-offer' 
  | 'inspection-schedule' 
  | 'inspection-result';

export const Step3Exchange = ({ carData, onEditSpecs, onEditCondition }: Step3ExchangeProps) => {
  const [currentPage, setCurrentPage] = useState<Step3Page>('estimation');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'installment' | null>(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'estimation':
        return (
          <PriceEstimation
            carData={carData}
            onEditSpecs={onEditSpecs}
            onEditCondition={onEditCondition}
            onRequestExchange={() => setCurrentPage('replacement-list')}
          />
        );
      
      case 'replacement-list':
        return (
          <ReplacementCarsList
            userCar={carData}
            onEditInfo={onEditSpecs}
            onCarSelect={(carId) => {
              setSelectedCarId(carId);
              setCurrentPage('car-details');
            }}
          />
        );
      
      case 'car-details':
        return (
          <CarDetails
            carId={selectedCarId!}
            onBack={() => setCurrentPage('replacement-list')}
            onRequestPurchase={() => setCurrentPage('payment-method')}
          />
        );
      
      case 'payment-method':
        return (
          <PaymentMethod
            onMethodSelect={(method) => {
              setSelectedPaymentMethod(method);
              setCurrentPage('final-offer');
            }}
            onBack={() => setCurrentPage('car-details')}
          />
        );
      
      case 'final-offer':
        return (
          <FinalOffer
            carData={carData}
            selectedCarId={selectedCarId!}
            paymentMethod={selectedPaymentMethod!}
            onConfirm={() => setCurrentPage('inspection-schedule')}
            onBack={() => setCurrentPage('payment-method')}
          />
        );
      
      case 'inspection-schedule':
        return (
          <InspectionSchedule
            onScheduleComplete={() => setCurrentPage('inspection-result')}
            onBack={() => setCurrentPage('final-offer')}
          />
        );
      
      case 'inspection-result':
        return (
          <InspectionResult
            onApproved={() => {
              // Handle contract signing flow
              console.log('Contract approved');
            }}
            onRejected={() => setCurrentPage('final-offer')}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {renderCurrentPage()}
    </div>
  );
};