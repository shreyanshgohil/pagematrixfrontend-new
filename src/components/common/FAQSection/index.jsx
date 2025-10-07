import { useState } from "react";
import AccordionWrapper from "../Accordion";

const FAQSection = ({ propertyName, propertyLocation, faqs = [] }) => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  // Default FAQ questions if no FAQs are provided from API
  const defaultFaqs = [
    {
      title: `What is ${propertyName} location?`,
      body: `${propertyName} is located in ${propertyLocation}. The project offers excellent connectivity to major landmarks, schools, hospitals and shopping centers in the area. The location provides easy access to transportation hubs and major roadways.`,
    },
    {
      title: `What type of property can I find in ${propertyName} Projects?`,
      body: `${propertyName} offers a variety of residential properties including 1BHK, 2BHK, 3BHK and 4BHK apartments. Each unit is designed with modern amenities and spacious layouts to provide comfortable living spaces for families of all sizes.`,
    },
    {
      title: `What is the size of 3BHK apartment in ${propertyName} Project?`,
      body: `The 3BHK apartments in ${propertyName} come in various sizes ranging from 1200 sq ft to 1800 sq ft, depending on the floor plan and configuration. Each 3BHK unit includes 3 bedrooms, 2-3 bathrooms, a living room, dining area and kitchen.`,
    },
    {
      title: `What is the possession timeline for ${propertyName} Project?`,
      body: `The possession timeline for ${propertyName} is expected within 18-24 months from the date of booking. The project is currently under construction with regular updates on progress. Early bird bookings may get priority possession.`,
    },
    {
      title: `What are the payment plans available for ${propertyName}?`,
      body: `${propertyName} offers flexible payment plans including construction-linked payment plans, down payment options and easy EMI facilities. We also provide special discounts for early bookings and various financing options through our banking partners.`,
    },
    {
      title: `What amenities are available in ${propertyName}?`,
      body: `${propertyName} features world-class amenities including a swimming pool, fitness center, children's play area, landscaped gardens, 24/7 security, power backup and dedicated parking spaces. The project also includes modern facilities for a comfortable lifestyle.`,
    },
  ];

  // Use API FAQs if available, otherwise use default FAQs
  const faqData = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <div className="bg-white sm:rounded-2xl sm:shadow-xl px-4 py-6 md:px-6 md:py-8 sm:border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-16 bg-gradient-to-b from-brand-theme to-brand-theme-600 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold text-brand-blue-700">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-gray mt-1">
            Get answers to common questions about {propertyName}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-brand-gray-300 to-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <AccordionWrapper
              title={faq.title || faq.question}
              index={index}
              isOpen={openAccordion === index}
              toggleAccordionHandler={toggleAccordion}
              isLast={index === faqData.length - 1}
            >
              <div className="p-4 sm:p-6">
                <div
                  className="prose prose-lg w-full max-w-none text-brand-gray leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.body || faq.answer }}
                />
              </div>
            </AccordionWrapper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
