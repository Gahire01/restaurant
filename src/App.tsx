/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Star, 
  Menu as MenuIcon, 
  X, 
  Calendar,
  Users,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FEATURED_DISHES = [
  {
    id: 1,
    name: "Truffle Tagliatelle",
    description: "Handmade pasta tossed in a creamy black truffle sauce with aged parmesan.",
    price: "$28",
    image: "https://picsum.photos/seed/pasta/600/400"
  },
  {
    id: 2,
    name: "Seared Scallops",
    description: "Jumbo scallops with cauliflower purée, crispy pancetta, and herb oil.",
    price: "$32",
    image: "https://picsum.photos/seed/scallops/600/400"
  },
  {
    id: 3,
    name: "Herb-Crusted Lamb",
    description: "Rack of lamb with a pistachio crust, served with roasted root vegetables.",
    price: "$42",
    image: "https://picsum.photos/seed/lamb/600/400"
  },
  {
    id: 4,
    name: "Miso Glazed Salmon",
    description: "Wild-caught salmon with ginger-soy glaze and charred bok choy.",
    price: "$30",
    image: "https://picsum.photos/seed/salmon/600/400"
  }
];

const SPECIALS = [
  {
    day: "Monday",
    dish: "Lobster Risotto",
    price: "$35"
  },
  {
    day: "Tuesday",
    dish: "Wagyu Beef Sliders",
    price: "$24"
  },
  {
    day: "Wednesday",
    dish: "Wild Mushroom Tart",
    price: "$18"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reservation Submitted:', reservationData);
      setIsSubmitting(false);
      setSubmitted(true);
      setReservationData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        notes: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-orange-200">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-white/90 py-3 shadow-md backdrop-blur-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div 
            className="flex cursor-pointer items-center gap-2"
            onClick={() => scrollToSection('hero')}
          >
            <Utensils className={`h-8 w-8 ${scrolled ? 'text-orange-600' : 'text-white'}`} />
            <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-stone-900' : 'text-white'}`}>
              LUMIÈRE
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {['Menu', 'Specials', 'Story', 'Location'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  scrolled ? 'text-stone-600' : 'text-white/90'
                }`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('reservation')}
              className="rounded-full bg-orange-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-700 hover:shadow-lg active:scale-95"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-stone-900' : 'text-white'}`} />
            ) : (
              <MenuIcon className={`h-6 w-6 ${scrolled ? 'text-stone-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 top-full w-full bg-white p-6 shadow-xl md:hidden"
            >
              <div className="flex flex-col gap-4">
                {['Menu', 'Specials', 'Story', 'Location', 'Reservation'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-lg font-medium text-stone-700 hover:text-orange-600"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/restaurant-hero/1920/1080" 
            alt="Restaurant Interior"
            className="h-full w-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-400"
          >
            Exquisite Culinary Experience
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl lg:text-8xl"
          >
            Where Every Flavor <br /> 
            <span className="text-orange-500">Tells a Story</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button 
              onClick={() => scrollToSection('reservation')}
              className="group flex items-center gap-2 rounded-full bg-orange-600 px-8 py-4 text-lg font-bold transition-all hover:bg-orange-700 hover:shadow-2xl active:scale-95"
            >
              Reserve Your Table
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View Menu
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <div className="h-12 w-6 rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-full rounded-full bg-white/50"></div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section id="menu" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">Signature Creations</h2>
            <p className="mx-auto max-w-2xl text-stone-600">
              Our chef selects only the finest seasonal ingredients to create dishes that are as beautiful as they are delicious.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_DISHES.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-600 backdrop-blur-sm">
                    {dish.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-stone-900">{dish.name}</h3>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {dish.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Specials Section */}
      <section id="specials" className="bg-stone-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-orange-600/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-orange-500">
                Limited Time
              </span>
              <h2 className="mb-8 text-4xl font-bold md:text-5xl">Weekly Specials</h2>
              <div className="space-y-8">
                {SPECIALS.map((special, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between border-b border-white/10 pb-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-stone-400">{special.day}</p>
                      <h4 className="text-xl font-bold">{special.dish}</h4>
                    </div>
                    <span className="text-2xl font-light text-orange-500">{special.price}</span>
                  </motion.div>
                ))}
              </div>
              <button className="mt-12 rounded-full border border-white/20 px-8 py-3 font-semibold transition-colors hover:bg-white hover:text-stone-900">
                View Full Menu
              </button>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl">
                <img 
                  src="https://picsum.photos/seed/special-dish/800/800" 
                  alt="Special Dish"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-orange-600 p-8 shadow-2xl">
                <p className="text-4xl font-black">Chef's Choice</p>
                <p className="text-orange-200">Recommended for tonight</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Story */}
      <section id="story" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/chef/800/1000" 
                  alt="Chef at work"
                  className="rounded-3xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -right-8 -top-8 hidden h-48 w-48 rounded-full bg-orange-100 lg:block"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="mb-6 text-4xl font-bold text-stone-900 md:text-5xl">The Heart Behind <br /> The Kitchen</h2>
              <div className="space-y-6 text-lg leading-relaxed text-stone-600">
                <p>
                  Chef Julian Lumière began his journey in the small coastal towns of France, where he learned that the secret to great food is respect for the ingredients.
                </p>
                <p>
                  After years of training in Michelin-starred kitchens across Europe, he brought his vision to life here—a place where traditional techniques meet modern innovation.
                </p>
                <p className="italic text-stone-900 font-medium">
                  "Cooking is not just about feeding people; it's about creating a moment that stays with them long after the meal is over."
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-orange-500">
                  <img src="https://picsum.photos/seed/chef-portrait/100/100" alt="Chef Portrait" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Julian Lumière</p>
                  <p className="text-sm text-stone-500">Executive Chef & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section id="reservation" className="bg-orange-50 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold text-stone-900">Reserve a Table</h2>
              <p className="text-stone-600">Join us for an unforgettable dining experience.</p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Calendar className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-stone-900">Reservation Requested!</h3>
                <p className="text-stone-600">We've received your request and will confirm via email shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-bold text-orange-600 hover:underline"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    value={reservationData.name}
                    onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    value={reservationData.email}
                    onChange={(e) => setReservationData({...reservationData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                    <input 
                      required
                      type="date" 
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-12 pr-4 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      value={reservationData.date}
                      onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                    <select 
                      required
                      className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 py-3 pl-12 pr-4 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      value={reservationData.time}
                      onChange={(e) => setReservationData({...reservationData, time: e.target.value})}
                    >
                      <option value="">Select time</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                    <select 
                      className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 py-3 pl-12 pr-4 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      value={reservationData.guests}
                      onChange={(e) => setReservationData({...reservationData, guests: e.target.value})}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-stone-700">Special Requests (Optional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-stone-400" />
                    <textarea 
                      rows={3}
                      placeholder="Allergies, birthday celebration, etc."
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-12 pr-4 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      value={reservationData.notes}
                      onChange={(e) => setReservationData({...reservationData, notes: e.target.value})}
                    ></textarea>
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full rounded-xl bg-orange-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-orange-200 disabled:opacity-70 md:col-span-2"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Info Section (Hours & Map) */}
      <section id="location" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-8 text-4xl font-bold text-stone-900">Visit Us</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Location</h4>
                    <p className="text-stone-600">123 Culinary Avenue, Food District<br />New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Opening Hours</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-stone-600">
                      <span>Mon - Thu</span>
                      <span>5:00 PM - 10:00 PM</span>
                      <span>Fri - Sat</span>
                      <span>5:00 PM - 11:30 PM</span>
                      <span>Sunday</span>
                      <span>4:00 PM - 9:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Contact</h4>
                    <p className="text-stone-600">+1 (555) 123-4567<br />hello@lumieredining.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] overflow-hidden rounded-3xl shadow-lg lg:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1645564756836!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Restaurant Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 border-b border-white/10 pb-12 md:flex-row">
            <div className="flex items-center gap-2">
              <Utensils className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold tracking-tight">LUMIÈRE</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-stone-400">
              <button onClick={() => scrollToSection('menu')} className="hover:text-white">Menu</button>
              <button onClick={() => scrollToSection('reservation')} className="hover:text-white">Reservations</button>
              <button onClick={() => scrollToSection('location')} className="hover:text-white">Contact</button>
              <button className="hover:text-white">Privacy Policy</button>
            </div>
            <div className="flex gap-4">
              {/* Social icons could go here */}
              <div className="h-8 w-8 rounded-full bg-white/5"></div>
              <div className="h-8 w-8 rounded-full bg-white/5"></div>
              <div className="h-8 w-8 rounded-full bg-white/5"></div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-stone-500">
            <p>© 2026 Lumière Dining Group. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a 
        href="tel:+15551234567"
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white shadow-2xl transition-all hover:scale-110 hover:bg-orange-700 active:scale-95"
      >
        <Phone className="h-6 w-6" />
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">1</span>
      </a>
    </div>
  );
}
