"use client";

import { useState, useEffect } from 'react';
import { sendPrayerRequest } from '@/app/actions';

export function PrayerRequestForm() {
  // initialize state for form inputs
  const [name, setName] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  // initialize state for form statuses
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // reset form inputs when form is submitted
  useEffect(() => {
    if (!isSubmitted) {
      setName('');
      setPrayerRequest('');
    }
  }, [isSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setName(formData.get('name'));
    setPrayerRequest(formData.get('prayerRequest'));

    if (!name || !prayerRequest) {
      setShowWarning(true);
      return;
    }
  
    sendPrayerRequest(formData);
    setIsSubmitted(true);
    setShowWarning(false);
    setIsGreen(true);
    setTimeout(() => {setIsGreen(false); setIsSubmitted(false);}, 3000); // reset form after 3 seconds
  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 md:w-1/2 md:mx-auto'>
      <label htmlFor="name" className='font-bold md:text-lg text-md'>For:</label>
      <input type="text" id="name" name="name" className="border-slate-300 border-2 rounded-lg p-2" value={name} onChange={e => setName(e.target.value)} />
      <label htmlFor="prayerRequest" className='font-bold md:text-lg text-md'>Prayer Request:</label>
      <textarea id="prayerRequest" name="prayerRequest" className="border-slate-300 border-2 rounded-lg p-2" value={prayerRequest} onChange={e => setPrayerRequest(e.target.value)}></textarea>
      <p className={`${showWarning ? 'text-red-500 visible md:text-md text-sm' : 'hidden'}`}>Please fill out all fields before submitting.</p>
      <button className={`transition-colors md:hover:bg-slate-500 hover:text-slate-50 ease-out text-slate-200 font-bold py-2 px-4 rounded-lg ${isGreen ? 'bg-green-500 hover:bg-green-500' : 'bg-slate-700'}`} type="submit">
        { isSubmitted ? 'Sent!'  : 'Send'}
      </button>
    </form>
  );
};