import { motion } from 'motion/react';
import { Bug as Bee, ArrowRight, ShieldCheck, BarChart3, Users, Zap, Globe, Leaf } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from "react";
import { type SharedData } from '@/types';
import { ThesisModal } from '@/components/core/thesis-modal';

type Props = { thesisUrl?: string | null };

export default function LandingPage({ thesisUrl }: Props) {
  const { auth } = usePage<SharedData>().props;
  const dashboardHref = auth?.user?.role === 'admin' ? '/admin' : '/dashboard';
  const [showThesis, setShowThesis] = useState(false);

  return (
    <div className="bg-[#FFFBEB] overflow-x-hidden">
      {/* Section 1: Editorial Hero (Beekeeper Focus) */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400 -skew-x-12 translate-x-1/4 z-0 hidden lg:block" />

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                The Future of Meliponiculture
              </span>
            </div>
            <h1 className="text-[12vw] lg:text-[100px] leading-[0.85] font-black uppercase tracking-tighter text-amber-950 mb-8">
              Buzzy <br />
              <span className="text-yellow-500">Hive 2.0</span>
            </h1>
            <p className="text-xl md:text-2xl text-amber-900/70 max-w-xl mb-10 font-medium leading-tight">
                Optimizing kelulut farming through an IoT-integrated Business Intelligence platform that leverages multi-gas sensing and historical pattern analysis to predict honey harvest readiness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={dashboardHref}>
                <Button size="lg" className="group">
                  Launch Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => thesisUrl && setShowThesis(true)}
                disabled={!thesisUrl}
                title={!thesisUrl ? 'No thesis uploaded yet' : undefined}
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Bee Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 hidden lg:block"
        >
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-yellow-100 rotate-12">
            <Bee className="w-16 h-16 text-yellow-500" />
          </div>
        </motion.div>
      </section>

      {/* Section 2: Brutalist Grid (Admin/Management Focus) */}
      <section className="bg-amber-950 text-white py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                Apiary <br />
                <span className="text-yellow-400">Intelligence.</span>
              </h2>
              <p className="text-xl text-amber-100/60 mb-12 max-w-md">
                Centralized management for large-scale stingless bee operations. Monitor health, activity, and yields across thousands of hives.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-t border-amber-800 pt-6">
                  <span className="block text-4xl font-bold mb-2">98%</span>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Accuracy Rate</span>
                </div>
                <div className="border-t border-amber-800 pt-6">
                  <span className="block text-4xl font-bold mb-2">24/7</span>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Real-time Monitoring</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "Secure Data", desc: "Enterprise-grade security for your apiary records." },
                { icon: BarChart3, title: "Yield Analytics", desc: "Predict seasonal trends and optimize production." },
                { icon: Users, title: "Team Access", desc: "Collaborate with field technicians seamlessly." },
                { icon: Zap, title: "Fast Insights", desc: "AI processing in milliseconds for instant decisions." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-amber-900/50 p-8 rounded-[2rem] border border-amber-800"
                >
                  <item.icon className="w-10 h-10 text-yellow-400 mb-6" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-amber-100/40">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Clean Utility / Sustainability */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-8">
              <Leaf className="w-4 h-4" /> Sustainable Beekeeping
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-amber-950 tracking-tighter mb-8">
              Protecting the <br />
              <span className="text-emerald-600 italic font-serif">Meliponini</span> Legacy.
            </h2>
            <p className="text-lg text-amber-900/60 mb-12 leading-relaxed">
              We believe technology should serve nature. BuzzyHive helps prevent over-harvesting and ensures the long-term health of stingless bee colonies.
            </p>
            <div className="flex justify-center gap-12 flex-wrap">
              <div className="flex flex-col items-center">
                <Globe className="w-8 h-8 text-amber-900 mb-4" />
                <span className="text-sm font-bold uppercase tracking-widest">Global Reach</span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-8 h-8 text-amber-900 mb-4" />
                <span className="text-sm font-bold uppercase tracking-widest">Eco-Friendly</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-amber-900 mb-4" />
                <span className="text-sm font-bold uppercase tracking-widest">Community Driven</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Thesis PDF Modal */}
      {thesisUrl && (
        <ThesisModal
          isOpen={showThesis}
          onClose={() => setShowThesis(false)}
          thesisUrl={thesisUrl}
        />
      )}

      {/* Footer */}
      <footer className="bg-yellow-400 py-20 px-6 md:px-20 text-yellow-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Bee className="w-8 h-8" />
              <span className="text-2xl font-black tracking-tighter uppercase">BuzzyHive 2.0</span>
            </div>
            <p className="text-yellow-900/70 max-w-sm mb-8">
              IoT-integrated harvest readiness prediction for stingless bee farming.
            </p>
            <div className="flex gap-4">
              <Link href={dashboardHref}>
                <Button className="bg-yellow-950 text-yellow-400 hover:bg-black">Get Started</Button>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-50">Platform</h4>
            <ul className="space-y-4 font-bold">
              <li><a href="#" className="hover:underline">Dashboard</a></li>
              <li><a href="#" className="hover:underline">API Docs</a></li>
              <li><a href="#" className="hover:underline">Mobile App</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-50">Company</h4>
            <ul className="space-y-4 font-bold">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Sustainability</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-yellow-900/10 text-sm font-bold opacity-50">
          © 2026 BuzzyHive 2.0. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
