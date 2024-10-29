import { Metadata } from 'next';
import Dashboard from '@/components/dashboard/dashboard';

export const metadata: Metadata = {
  title: 'Marketing Platform',
  description: 'High-performance visual marketing platform',
};

export default function Home() {
  return <Dashboard />;
}