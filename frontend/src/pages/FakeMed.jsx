import React from 'react';
import FakeMed from '../components/FakeMed';

export default function FakeMedPage() {
  const handleResult = (res) => {
    console.log('FakeMed result:', res);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">FakeMed - Detect Fake Medicines</h1>
      <p className="text-gray-600 mb-6">Upload photo of a medicine bottle/pack or take a picture to let our detector analyze whether the medication appears authentic or suspicious.</p>
      <FakeMed onResult={handleResult} />
    </div>
  );
}
