import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown = ({ trigger, items, align = 'right', className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute z-[100] mt-2 w-56 rounded-2xl bg-white shadow-2xl ring-1 ring-yellow-100 focus:outline-none overflow-hidden',
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            <div className="py-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex items-center w-full px-4 py-3 text-sm font-bold transition-colors gap-3',
                    item.variant === 'danger'
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-amber-900 hover:bg-yellow-50'
                  )}
                >
                  {item.icon && <span className="opacity-60">{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
