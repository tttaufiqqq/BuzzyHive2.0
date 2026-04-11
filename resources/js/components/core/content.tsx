import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion = ({ title, children, defaultOpen = false, className }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn('border border-yellow-100 rounded-2xl overflow-hidden bg-white', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-yellow-50/50 transition-colors"
      >
        <span className="font-bold text-amber-900">{title}</span>
        <ChevronDown className={cn('w-4 h-4 text-amber-900/40 transition-transform', isOpen && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-4 pt-0 text-sm text-amber-900/70 border-t border-yellow-50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const HiveChart = ({ data }: { data: any[] }) => (
  <div className="h-[300px] w-full mt-4">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FEF3C7" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#78350F', fontSize: 10, fontWeight: 600 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#78350F', fontSize: 10, fontWeight: 600 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FEF3C7',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#78350F'
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#F59E0B"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const DataTable = ({ headers, rows }: { headers: string[]; rows: any[][] }) => (
  <div className="w-full overflow-x-auto rounded-2xl border border-yellow-100 bg-white">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-yellow-50/50 border-b border-yellow-100">
          {headers.map((h, i) => (
            <th key={i} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-amber-900/50">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-yellow-50 last:border-0 hover:bg-yellow-50/20 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="px-6 py-4 text-sm font-medium text-amber-900">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
