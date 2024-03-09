import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar/Navbar';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitnessFreak',
  description: 'Fitness Tracking',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div>
          {children}
        </div>
        <ToastContainer />
        <Footer/>
      </body>
    </html>
  );
}

