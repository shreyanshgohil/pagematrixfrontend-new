import React from "react";
import Layout from "@/components/layout";
import ModernImageSlider from "@/components/common/ModernImageSlider";

const SliderDemo = () => {
  // Sample property data for demo
  const sampleProperty = {
    name: "Modern City View Apartments",
    city: "Bangalore",
    stateName: "Karnataka",
    listingType: "RENT",
    priceMin: 45000,
    priceMax: 50000,
    images: [
      {
        url: "/images/temp/1.jpg",
        caption: "Living room with city view",
      },
      {
        url: "/images/temp/2.jpg",
        caption: "Modern kitchen design",
      },
      {
        url: "/images/temp/3.jpg",
        caption: "Master bedroom",
      },
    ],
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-gray-300 via-white to-brand-gray-300">
        <div className="container--boxed py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-blue-700 mb-4">
              Modern Image Slider Demo
            </h1>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto">
              A modern, responsive image slider designed specifically for real
              estate properties. Features smooth animations, touch support and
              your brand theme colors.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-brand-blue-700 mb-6">
                Property Image Gallery
              </h2>
              <ModernImageSlider
                images={sampleProperty.images}
                property={sampleProperty}
                showControls={true}
                showThumbnails={true}
                autoPlay={true}
                autoPlayInterval={4000}
                className="modern-image-slider"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-brand-blue-700 mb-4">
                  Features
                </h3>
                <ul className="space-y-3 text-brand-gray">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
                    <span>Responsive design for all screen sizes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
                    <span>Touch/swipe support for mobile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
                    <span>Auto-play with pause/play controls</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
                    <span>Thumbnail navigation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
                    <span>Fullscreen mode</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
                    <span>Property info overlay</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
                    <span>Modern animations and transitions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-brand-blue-700 mb-4">
                  Theme Integration
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-theme rounded-lg"></div>
                    <div>
                      <p className="font-medium text-brand-blue-700">
                        Primary Theme
                      </p>
                      <p className="text-sm text-brand-gray">#008080 (Teal)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-blue-700 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-brand-blue-700">
                        Secondary Theme
                      </p>
                      <p className="text-sm text-brand-gray">
                        #07234a (Dark Blue)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-gray-300 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-brand-blue-700">
                        Background
                      </p>
                      <p className="text-sm text-brand-gray">
                        #F6F2F2 (Light Gray)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-brand-theme to-brand-theme-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Usage</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <pre className="text-sm overflow-x-auto">
                  {`<ModernImageSlider
  images={property.images}
  property={property}
  showControls={true}
  showThumbnails={true}
  autoPlay={false}
  autoPlayInterval={5000}
  className="modern-image-slider"
/>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SliderDemo;
