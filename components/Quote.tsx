import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { QuoteFormData, ServiceType, PricingDetails, PriceRange } from '../types';
import { QUOTE_DATA, ADDONS_DATA } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const { ref, animationClasses } = useScrollAnimation<HTMLHeadingElement>();
    return (
        <h2 ref={ref} className={`text-[clamp(2.5rem,5vw,4rem)] font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#8b34c2] to-white transition-all duration-700 ${animationClasses} ${className}`}>
            {children}
        </h2>
    );
};

const StepIndicator: React.FC<{ step: number; label: string; currentStep: number; maxAccessibleStep: number; goToStep: (step: number) => void; }> = ({ step, label, currentStep, maxAccessibleStep, goToStep }) => {
    const isActive = step === currentStep;
    const isCompleted = step < currentStep;
    const isAccessible = step <= maxAccessibleStep;

    const baseClasses = "flex items-center gap-2 py-3 px-6 rounded-full text-sm font-semibold transition-all duration-300 ease-out border";
    const stateClasses = isActive
        ? "bg-gradient-to-r from-[#3f0071] to-[#610094] text-white border-[#610094]/80 shadow-lg shadow-[#610094]/30"
        : isCompleted
        ? "bg-[#610094]/40 text-white border-[#610094]/60"
        : "bg-[#3f0071]/30 text-white/60 border-[#610094]/30";
    const accessibilityClasses = isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-50";

    return (
        <div
            className={`${baseClasses} ${stateClasses} ${accessibilityClasses}`}
            onClick={() => isAccessible && goToStep(step)}
        >
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${isActive || isCompleted ? 'bg-white/30' : 'bg-white/20'}`}>
                {step}
            </div>
            <span>{label}</span>
        </div>
    );
};

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
    <div className="relative group">
        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 text-xs font-bold cursor-help">?</div>
        <div className="absolute bottom-full mb-2 w-64 p-3 bg-[#150050] border border-[#610094]/50 rounded-lg text-xs text-white/90 font-sans font-normal text-left z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {text}
        </div>
    </div>
);


const FormField: React.FC<React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> & { label: string; as?: 'input' | 'select' | 'textarea'; error?: boolean; tooltip?: string; children?: React.ReactNode }> = ({ label, id, as = 'input', error, tooltip, children, ...props }) => {
    const Component = as;
    const errorClasses = error ? 'border-red-500/70 animate-shake' : 'border-[#610094]/40';
    const commonClasses = `w-full p-4 bg-[#3f0071]/30 border rounded-lg text-white font-sans transition-all duration-300 focus:outline-none focus:border-[#610094]/80 focus:ring-2 focus:ring-[#610094]/50 disabled:opacity-50 ${errorClasses}`;
    
    return (
        <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
                <label htmlFor={id} className="font-bold text-white text-sm">{label}</label>
                {tooltip && <Tooltip text={tooltip} />}
            </div>
            <Component id={id} className={commonClasses} {...props}>
                {children}
            </Component>
        </div>
    );
};


const sendQuoteByEmail = (formData: QuoteFormData, pricing: PricingDetails) => {
    const subject = `🎬 NEW QUOTE REQUEST - ${formData.clientName || 'Client'} - ${formData.serviceSubtype || 'Service'}`;
    const today = new Date().toLocaleDateString();
    const quoteNumber = `WRH-${Date.now().toString().slice(-6)}`;
    
    let emailBody = `🎯 NEW QUOTE REQUEST FROM WHITE RABBIT HOLE WEBSITE\n`;
    emailBody += `═══════════════════════════════════════════════════\n\n`;
    emailBody += `📅 Date: ${today}\n`;
    emailBody += `🔢 Quote #: ${quoteNumber}\n\n`;
    
    emailBody += `👤 CLIENT INFORMATION:\n`;
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    emailBody += `📛 Name: ${formData.clientName || 'N/A'}\n`;
    emailBody += `📧 Email: ${formData.clientEmail || 'N/A'}\n`;
    emailBody += `📱 Phone: ${formData.clientPhone || 'N/A'}\n`;
    if (formData.company) emailBody += `🏢 Company: ${formData.company}\n`;
    emailBody += `\n`;
    
    emailBody += `🎬 PROJECT DETAILS:\n`;
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    emailBody += `🎯 Service Type: ${formData.serviceType ? formData.serviceType.charAt(0).toUpperCase() + formData.serviceType.slice(1) : 'N/A'}\n`;
    emailBody += `📋 Service Category: ${formData.serviceSubtype || 'N/A'}\n`;
    emailBody += `⏱️ Package/Duration: ${formData.duration || 'N/A'}\n`;
    emailBody += `📅 Event Date: ${formData.eventDate ? new Date(formData.eventDate).toLocaleDateString() : 'N/A'}\n`;
    emailBody += `📍 Location: ${formData.location ? formData.location.charAt(0).toUpperCase() + formData.location.slice(1).replace('-', ' ') : 'N/A'}\n`;
    emailBody += `🎨 Preferred Style: ${formData.style ? formData.style.charAt(0).toUpperCase() + formData.style.slice(1) : 'N/A'}\n`;
    emailBody += `🚀 Delivery Timeline: ${formData.deliveryTime ? formData.deliveryTime.charAt(0).toUpperCase() + formData.deliveryTime.slice(1) : 'Standard'}\n`;
    emailBody += `\n`;
    
    if (formData.selectedAddons && formData.selectedAddons.length > 0) {
        emailBody += `✨ SELECTED ADD-ONS:\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        formData.selectedAddons.forEach(addon => {
            if (addon === 'Additional Hours' && formData.additionalHoursCount) {
                emailBody += `• ${addon}: ${formData.additionalHoursCount} hours\n`;
            } else {
                emailBody += `• ${addon}\n`;
            }
        });
        emailBody += `\n`;
    }
    
    emailBody += `💵 PRICING BREAKDOWN:\n`;
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    emailBody += `🎯 Base Service: AED ${pricing.base.min.toLocaleString()} - ${pricing.base.max.toLocaleString()}\n`;
    if (pricing.addons.min > 0) {
        emailBody += `✨ Add-ons Total: AED ${pricing.addons.min.toLocaleString()} - ${pricing.addons.max.toLocaleString()}\n`;
    }
    if (pricing.rush) {
        emailBody += `🚀 Rush Delivery Fee: AED ${pricing.rush.min.toLocaleString()} - ${pricing.rush.max.toLocaleString()}\n`;
    }
    emailBody += `\n💰 ESTIMATED TOTAL: AED ${pricing.total.min.toLocaleString()} - ${pricing.total.max.toLocaleString()}\n`;
    emailBody += `\n`;

    if (formData.additionalNotes) {
        emailBody += `📝 ADDITIONAL NOTES:\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `${formData.additionalNotes}\n\n`;
    }
    
    const mailtoLink = `mailto:qarajeen@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;

    setTimeout(() => {
        alert("Your quote details are being prepared for sending. Please check your email client.");
    }, 500);
};

const Quote: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<QuoteFormData>({
        selectedAddons: [],
        additionalHoursCount: 1,
    });
    const [quoteResult, setQuoteResult] = useState<PricingDetails | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const prevStepRef = useRef(currentStep);

    useEffect(() => {
        prevStepRef.current = currentStep;
    }, [currentStep]);
    const transitionDirection = currentStep > prevStepRef.current ? 'forward' : 'backward';


    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors.includes(id)) {
            setErrors(prevErrors => prevErrors.filter(err => err !== id));
        }
    }, [errors]);

    const handleCheckboxChange = useCallback((addon: string, isSelected: boolean) => {
        setFormData(prev => {
            const selectedAddons = prev.selectedAddons ? [...prev.selectedAddons] : [];
            if (isSelected) {
                if (!selectedAddons.includes(addon)) {
                    selectedAddons.push(addon);
                }
            } else {
                const index = selectedAddons.indexOf(addon);
                if (index > -1) {
                    selectedAddons.splice(index, 1);
                }
            }
            return { ...prev, selectedAddons };
        });
    }, []);

    const handleAdditionalHoursChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, additionalHoursCount: parseInt(e.target.value) || 1 }));
    }, []);

    const validateStep = (step: number): string[] => {
        const stepErrors: string[] = [];
        switch (step) {
            case 1:
                if (!formData.serviceType) stepErrors.push('serviceType');
                if (!formData.serviceSubtype) stepErrors.push('serviceSubtype');
                if (!formData.duration) stepErrors.push('duration');
                break;
            case 2:
                if (!formData.location) stepErrors.push('location');
                if (!formData.venue) stepErrors.push('venue');
                break;
            case 3:
                break; // Optional step
            case 4:
                if (!formData.clientName) stepErrors.push('clientName');
                if (!formData.clientEmail) stepErrors.push('clientEmail');
                if (!formData.clientPhone) stepErrors.push('clientPhone');
                break;
        }
        return stepErrors;
    };
    
    const maxAccessibleStep = useMemo(() => {
        if (validateStep(1).length > 0) return 1;
        if (validateStep(2).length > 0) return 2;
        if (validateStep(3).length > 0) return 3;
        return 4;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const goToStep = (step: number) => {
        if (step <= maxAccessibleStep) {
            setErrors([]);
            setCurrentStep(step);
            setQuoteResult(null);
        }
    };

    const handleNext = () => {
        const currentErrors = validateStep(currentStep);
        setErrors(currentErrors);
        if (currentErrors.length === 0 && currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setErrors([]);
            setCurrentStep(prev => prev - 1);
        }
    };

    const calculatePricing = (): PricingDetails | null => {
        const { serviceType, serviceSubtype, duration, style, selectedAddons, additionalHoursCount, deliveryTime } = formData;
        if (!serviceType || !serviceSubtype || !duration) return null;

        const serviceData = (QUOTE_DATA as any)[serviceType]?.[serviceSubtype]?.[duration];
        if (!serviceData) return null;

        let basePrice: PriceRange = { ...serviceData };
        
        let styleMultiplier = 1;
        if (style === 'artistic' || style === 'cinematic' || style === 'luxury') styleMultiplier = 1.5;
        basePrice = { min: basePrice.min * styleMultiplier, max: basePrice.max * styleMultiplier };

        let addonTotal: PriceRange = { min: 0, max: 0 };
        const serviceAddons = (ADDONS_DATA as any)[serviceType] || {};
        selectedAddons?.forEach(addon => {
            if (serviceAddons[addon]) {
                const addonPrice = serviceAddons[addon];
                const multiplier = addon === 'Additional Hours' ? additionalHoursCount || 1 : 1;
                addonTotal.min += addonPrice.min * multiplier;
                addonTotal.max += addonPrice.max * multiplier;
            }
        });

        let rushMultiplier = 1;
        if (deliveryTime === 'rush') rushMultiplier = 1.25;
        else if (deliveryTime === 'express') rushMultiplier = 1.5;
        else if (deliveryTime === 'same-day') rushMultiplier = 2.0;
        
        const rushCharge: PriceRange | null = rushMultiplier > 1 ? {
            min: basePrice.min * (rushMultiplier - 1),
            max: basePrice.max * (rushMultiplier - 1)
        } : null;

        const total: PriceRange = {
            min: (basePrice.min * rushMultiplier) + addonTotal.min,
            max: (basePrice.max * rushMultiplier) + addonTotal.max
        };

        return { base: basePrice, addons: addonTotal, rush: rushCharge, total };
    };

    const generateQuote = () => {
        const currentErrors = validateStep(4);
        setErrors(currentErrors);
        if (currentErrors.length > 0) {
            alert("Please fill in all required fields in the final step.");
            return;
        }
        const pricing = calculatePricing();
        if (pricing) {
            setQuoteResult(pricing);
            sendQuoteByEmail(formData, pricing);
        }
    };

    const downloadQuotePDF = useCallback(() => {
        if (!quoteResult || !formData) return;
    
        // @ts-ignore
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            alert('PDF library is not loaded.');
            return;
        }
        const doc = new jsPDF();
    
        const primaryColor: [number, number, number] = [97, 0, 148];
        const textColor: [number, number, number] = [0, 0, 0];
        let yPos = 0;
    
        // Header
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 30, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('WHITE RABBIT HOLE', 14, 20);
        
        doc.setFontSize(14);
        doc.text('Quote Estimation', 140, 20);
    
        yPos = 45;
        // Client Info
        doc.setTextColor(...textColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Prepared for:', 14, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        yPos += 6;
        doc.text(formData.clientName || 'N/A', 14, yPos);
        yPos += 5;
        doc.text(formData.clientEmail || 'N/A', 14, yPos);
        yPos += 5;
        doc.text(formData.clientPhone || 'N/A', 14, yPos);
        if (formData.company) {
            yPos += 5;
            doc.text(formData.company, 14, yPos);
        }
        
        const today = new Date().toLocaleDateString();
        doc.text(`Date: ${today}`, 140, 45);
        doc.text(`Quote #: WRH-${Date.now().toString().slice(-6)}`, 140, 51);
    
        yPos += 15;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Project Summary', 14, yPos);
        doc.setLineWidth(0.5);
        doc.line(14, yPos + 2, 200, yPos + 2);
        yPos += 10;
        
        const projectDetails = [
            ['Service:', `${formData.serviceSubtype || 'N/A'} (${formData.duration || 'N/A'})`],
            ['Date:', formData.eventDate ? new Date(formData.eventDate).toLocaleDateString() : 'N/A'],
            ['Location:', formData.location?.charAt(0).toUpperCase() + formData.location?.slice(1) || 'N/A'],
            ['Style:', formData.style?.charAt(0).toUpperCase() + formData.style?.slice(1) || 'N/A'],
            ['Delivery:', formData.deliveryTime?.charAt(0).toUpperCase() + formData.deliveryTime?.slice(1) || 'Standard'],
        ];
    
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        projectDetails.forEach(([label, value]) => {
            doc.setFont('helvetica', 'bold');
            doc.text(label, 14, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(value, 50, yPos);
            yPos += 6;
        });
    
        yPos = Math.max(yPos, 100);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Estimated Pricing (AED)', 14, yPos);
        doc.line(14, yPos + 2, 200, yPos + 2);
        yPos += 10;
    
        // Base Service
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Base Service:', 14, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(`AED ${quoteResult.base.min.toLocaleString()} - ${quoteResult.base.max.toLocaleString()}`, 200, yPos, { align: 'right' });
        yPos += 8;

        // Detailed Add-ons
        if (formData.selectedAddons && formData.selectedAddons.length > 0 && formData.serviceType) {
            yPos += 4;
            doc.setFont('helvetica', 'bold');
            doc.text('Add-ons:', 14, yPos);
            yPos += 8;
            doc.setFont('helvetica', 'normal');

            const serviceAddons = (ADDONS_DATA as any)[formData.serviceType] || {};
            formData.selectedAddons.forEach(addon => {
                if (serviceAddons[addon]) {
                    const addonPrice = serviceAddons[addon];
                    let label = addon;
                    let price: PriceRange = addonPrice;

                    if (addon === 'Additional Hours' && formData.additionalHoursCount) {
                        const count = formData.additionalHoursCount;
                        label = `${addon} (x${count})`;
                        price = {
                            min: addonPrice.min * count,
                            max: addonPrice.max * count,
                        };
                    }
                    
                    doc.text(`• ${label}`, 18, yPos);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`AED ${price.min.toLocaleString()} - ${price.max.toLocaleString()}`, 200, yPos, { align: 'right' });
                    doc.setFont('helvetica', 'normal');
                    yPos += 7;
                }
            });
        }

        // Rush Delivery
        if (quoteResult.rush) {
            yPos += 4;
            doc.setFont('helvetica', 'normal');
            doc.text('Rush Delivery Fee:', 14, yPos);
            doc.setFont('helvetica', 'bold');
            doc.text(`AED ${quoteResult.rush.min.toLocaleString()} - ${quoteResult.rush.max.toLocaleString()}`, 200, yPos, { align: 'right' });
            yPos += 8;
        }
    
        doc.setLineWidth(0.2);
        doc.line(14, yPos, 200, yPos);
        yPos += 8;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Estimated Total:', 14, yPos);
        doc.text(`AED ${quoteResult.total.min.toLocaleString()} - ${quoteResult.total.max.toLocaleString()}`, 200, yPos, { align: 'right' });
    
        const pageHeight = doc.internal.pageSize.height;
        yPos = pageHeight - 40;
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('Terms & Conditions:', 14, yPos);
        yPos += 5;
        const terms = [
            'This is an estimated quote. Final pricing may vary based on specific requirements and consultation.',
            'Quote is valid for 30 days from the date of issue.',
            'A 50% deposit is required to secure the booking.',
        ];
        terms.forEach(term => {
            doc.text(`• ${term}`, 14, yPos);
            yPos += 4;
        });
        
        doc.setFillColor(...primaryColor);
        doc.rect(0, pageHeight - 20, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Thank you for your interest in White Rabbit Hole!', 14, pageHeight - 8);
        doc.text('hi@wrh.ae', 180, pageHeight - 8);
    
        const fileName = `Quote_WRH_${formData.clientName?.replace(/\s/g, '_') || 'Estimate'}.pdf`;
        doc.save(fileName);
    }, [formData, quoteResult]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('eventDate') as HTMLInputElement;
        if (dateInput) dateInput.min = today;
    }, []);
    
    useEffect(() => {
        if (quoteResult) {
            const resultElement = document.getElementById('quoteResult');
            resultElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [quoteResult]);
    
    // Reset dependent fields on service type change
    useEffect(() => {
      setFormData(f => ({...f, serviceSubtype: '', duration: ''}));
      setErrors([]);
    }, [formData.serviceType]);
    
    useEffect(() => {
      setFormData(f => ({...f, duration: ''}));
      setErrors([]);
    }, [formData.serviceSubtype]);


    const serviceSubtypes = formData.serviceType ? Object.keys((QUOTE_DATA as any)[formData.serviceType] || {}) : [];
    const durations = formData.serviceType && formData.serviceSubtype ? Object.keys((QUOTE_DATA as any)[formData.serviceType][formData.serviceSubtype] || {}) : [];
    const addons = formData.serviceType ? Object.keys((ADDONS_DATA as any)[formData.serviceType] || {}) : [];
    const animationClass = transitionDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left';

    return (
    <section id="quote" className="py-32 px-8 bg-black/30">
        <div className="max-w-5xl mx-auto text-center">
            <SectionTitle>Get Your Quote</SectionTitle>
            <div ref={ref} className={`bg-[#150050]/20 p-6 md:p-12 rounded-2xl border border-[#610094]/30 mt-3 transition-all duration-700 ${animationClasses}`}>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                   {['Service', 'Details', 'Preferences', 'Contact'].map((label, i) => (
                       <StepIndicator key={i} step={i + 1} label={label} currentStep={currentStep} maxAccessibleStep={maxAccessibleStep} goToStep={goToStep} />
                   ))}
                </div>
                
                <form>
                    <div key={currentStep} className={animationClass}>
                        {currentStep === 1 && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Service Type" id="serviceType" as="select" value={formData.serviceType || ''} onChange={handleInputChange} error={errors.includes('serviceType')}>
                                    <option value="">Select Service</option>
                                    <option value="photography">Photography</option>
                                    <option value="videography">Videography</option>
                                    <option value="360tours">360 Virtual Tours</option>
                                    <option value="timelapse">Time-Lapse & Hyperlapse</option>
                                    <option value="postproduction">Post-Production</option>
                                </FormField>
                                <FormField label="Service Category" id="serviceSubtype" as="select" value={formData.serviceSubtype || ''} onChange={handleInputChange} disabled={!formData.serviceType} error={errors.includes('serviceSubtype')} tooltip="The specific type of service you require. Options change based on the main Service Type.">
                                    <option value="">Select Category</option>
                                    {serviceSubtypes.map(s => <option key={s} value={s}>{s}</option>)}
                                </FormField>
                                <FormField label="Package/Duration" id="duration" as="select" value={formData.duration || ''} onChange={handleInputChange} disabled={!formData.serviceSubtype} error={errors.includes('duration')}>
                                    <option value="">Select Package</option>
                                    {durations.map(d => <option key={d} value={d}>{d}</option>)}
                                </FormField>
                                <FormField label="Event/Project Date" id="eventDate" type="date" value={formData.eventDate || ''} onChange={handleInputChange} />
                            </div>
                        )}
                        {currentStep === 2 && (
                           <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Location" id="location" as="select" value={formData.location || ''} onChange={handleInputChange} error={errors.includes('location')}>
                                    <option value="">Select Location</option>
                                    <option value="dubai">Dubai</option>
                                    <option value="abu-dhabi">Abu Dhabi</option>
                                    <option value="sharjah">Sharjah</option>
                                    <option value="other">Other</option>
                                </FormField>
                                <FormField label="Venue Type" id="venue" as="select" value={formData.venue || ''} onChange={handleInputChange} error={errors.includes('venue')}>
                                    <option value="">Select Venue Type</option>
                                    <option value="indoor">Indoor</option>
                                    <option value="outdoor">Outdoor</option>
                                    <option value="studio">Studio</option>
                                    <option value="office">Office/Corporate</option>
                                    <option value="ballroom">Ballroom</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="exhibition-center">Exhibition Center</option>
                                </FormField>
                           </div>
                        )}
                         {currentStep === 3 && (
                            <div className="space-y-8">
                                <div className="text-left">
                                    <label className="block mb-4 font-bold text-white text-sm">Additional Services</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {addons.map(addon => {
                                        const isSelected = formData.selectedAddons?.includes(addon) ?? false;
                                        return (
                                            <div 
                                                key={addon} 
                                                onClick={() => handleCheckboxChange(addon, !isSelected)} 
                                                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-[#610094]/30 border-[#610094]/80 shadow-lg shadow-[#610094]/10' : 'bg-[#3f0071]/30 border-[#610094]/40 hover:bg-[#3f0071]/50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-gradient-to-r from-[#3f0071] to-[#610094] border-[#8b34c2]' : 'border-[#610094]/50'}`}>
                                                        {isSelected && <span className="text-white text-sm font-bold animate-fade-in">✓</span>}
                                                    </div>
                                                    <span className={`flex-1 font-semibold transition-colors duration-300 ${isSelected ? 'text-white' : 'text-white/80'}`}>{addon}</span>
                                                </div>
                                                {addon === "Additional Hours" && isSelected && (
                                                    <div className="mt-3 pl-8 animate-fade-in-down" onClick={e => e.stopPropagation()}>
                                                        <label htmlFor={`additional-hours-input-${addon}`} className="text-xs font-semibold mb-1 block text-white/90">Number of Hours:</label>
                                                        <input 
                                                          id={`additional-hours-input-${addon}`}
                                                          type="number" 
                                                          value={formData.additionalHoursCount} 
                                                          onChange={handleAdditionalHoursChange} 
                                                          min="1" max="12" 
                                                          className="w-full bg-[#150050]/50 border border-[#610094]/50 rounded-md p-1 text-center outline-none focus:ring-2 focus:ring-[#8b34c2] focus:border-[#8b34c2]" 
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField label="Delivery Timeline" id="deliveryTime" as="select" value={formData.deliveryTime || 'standard'} onChange={handleInputChange} tooltip="Faster delivery times incur additional rush fees on the base service price.">
                                        <option value="standard">Standard (7-14 days)</option>
                                        <option value="rush">Rush (3-7 days) - +25%</option>
                                        <option value="express">Express (1-3 days) - +50%</option>
                                        <option value="same-day">Same Day - +100%</option>
                                    </FormField>
                                    <FormField label="Preferred Style" id="style" as="select" value={formData.style || ''} onChange={handleInputChange} tooltip="Premium styles like Cinematic or Artistic may involve more complex production and post-production, affecting the final price.">
                                        <option value="">Select Style</option>
                                        <option value="modern">Modern & Clean</option>
                                        <option value="cinematic">Cinematic</option>
                                        <option value="artistic">Artistic & Creative</option>
                                        <option value="luxury">Luxury & Elegant</option>
                                    </FormField>
                                    <FormField
                                        label="Budget Range (AED)"
                                        id="budget"
                                        as="select"
                                        value={formData.budget || ''}
                                        onChange={handleInputChange}
                                        tooltip="Selecting a budget helps us tailor service recommendations. The provided ranges are indicative and used to understand the project scope."
                                    >
                                        <option value="">Select Budget Range</option>
                                        <option value="under-2000">Under 2,000</option>
                                        <option value="2000-5000">2,000 - 5,000</option>
                                        <option value="5000-10000">5,000 - 10,000</option>
                                        <option value="10000-25000">10,000 - 25,000</option>
                                        <option value="25000-50000">25,000 - 50,000</option>
                                        <option value="over-50000">Over 50,000</option>
                                    </FormField>
                                </div>
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Full Name *" id="clientName" placeholder="Your full name" required value={formData.clientName || ''} onChange={handleInputChange} error={errors.includes('clientName')} />
                                <FormField label="Email Address *" id="clientEmail" type="email" placeholder="your.email@example.com" required value={formData.clientEmail || ''} onChange={handleInputChange} error={errors.includes('clientEmail')} />
                                <FormField label="Phone Number *" id="clientPhone" type="tel" placeholder="+971 50 123 4567" required value={formData.clientPhone || ''} onChange={handleInputChange} error={errors.includes('clientPhone')} />
                                <FormField label="Company Name" id="company" placeholder="(Optional)" value={formData.company || ''} onChange={handleInputChange} />
                                 <div className="md:col-span-2">
                                    <FormField label="Additional Notes" id="additionalNotes" as="textarea" placeholder="Any additional information..." value={formData.additionalNotes || ''} onChange={handleInputChange} />
                                 </div>
                            </div>
                        )}
                    </div>
                </form>

                 <div className="flex justify-between items-center mt-8">
                    <button type="button" onClick={handlePrev} className={`py-3 px-6 rounded-full font-bold transition-all duration-300 bg-[#3f0071]/30 border border-[#610094]/40 hover:bg-[#3f0071]/50 ${currentStep === 1 ? 'invisible' : 'visible'}`}>
                        ← Previous
                    </button>
                    {currentStep < 4 ? (
                        <button type="button" onClick={handleNext} className="py-3 px-8 rounded-full font-bold transition-all duration-300 bg-gradient-to-r from-[#3f0071] to-[#610094] hover:shadow-lg hover:shadow-[#610094]/30 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next →
                        </button>
                    ) : (
                        <button type="button" onClick={generateQuote} className="py-4 px-10 rounded-full font-bold text-lg transition-all duration-300 bg-gradient-to-r from-[#610094] to-[#3f0071] hover:shadow-xl hover:shadow-[#610094]/40 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse hover:animate-none">
                            💰 Generate Quote
                        </button>
                    )}
                </div>

                 {quoteResult && (
                    <div id="quoteResult" className="mt-12 text-left animate-fade-in">
                        <div className="bg-[#610094]/10 p-6 md:p-10 rounded-2xl border border-[#610094]/30">
                            <h3 className="text-2xl font-bold mb-8 text-center">Your Personalized Quote</h3>
                             <div className="space-y-4 max-w-lg mx-auto">
                                <div className="flex justify-between items-center py-3 border-b border-white/10"><span className="font-semibold text-white/70">Base Service:</span> <span className="font-bold">AED {quoteResult.base.min.toLocaleString()} - {quoteResult.base.max.toLocaleString()}</span></div>
                                {quoteResult.addons.min > 0 && <div className="flex justify-between items-center py-3 border-b border-white/10"><span className="font-semibold text-white/70">Add-ons & Extras:</span> <span className="font-bold">AED {quoteResult.addons.min.toLocaleString()} - {quoteResult.addons.max.toLocaleString()}</span></div>}
                                {quoteResult.rush && <div className="flex justify-between items-center py-3 border-b border-white/10"><span className="font-semibold text-white/70">Rush Delivery:</span> <span className="font-bold">AED {quoteResult.rush.min.toLocaleString()} - {quoteResult.rush.max.toLocaleString()}</span></div>}
                                <div className="flex justify-between items-center pt-4 text-xl bg-white/10 -mx-4 px-4 py-3 rounded-lg"><span className="font-bold">Estimated Total:</span> <span className="font-extrabold text-[#bf88e0]">AED {quoteResult.total.min.toLocaleString()} - {quoteResult.total.max.toLocaleString()}</span></div>
                             </div>

                             <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={downloadQuotePDF}
                                    className="py-3 px-8 rounded-full font-bold transition-all duration-300 bg-[#3f0071]/50 border border-[#610094]/60 hover:bg-[#3f0071]/80 flex items-center gap-2"
                                >
                                    <span>📄</span>
                                    <span>Download PDF</span>
                                </button>
                            </div>

                            <p className="mt-6 text-xs text-center text-white/60 italic">*This is an estimated quote. Final pricing may vary based on specific requirements. Valid for 30 days.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </section>
    );
};

export default Quote;