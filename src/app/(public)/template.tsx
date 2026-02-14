"use client";

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 // Slight delay to ensure content is ready
            }}
            className="min-h-screen"
        >
            {children}
        </motion.main>
    );
}
