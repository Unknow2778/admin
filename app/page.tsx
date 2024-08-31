import Dashboard from './component/dashboard';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between '>
      <Dashboard />
    </main>
  );
}
