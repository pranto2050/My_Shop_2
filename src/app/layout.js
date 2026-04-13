import { Rozha_One, Noto_Sans_Bengali, Bebas_Neue, Fira_Code } from 'next/font/google';
import './globals.css';
import RootClientLayout from './RootClientLayout';

const rozhaOne = Rozha_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rozha',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '700'],
  variable: '--font-noto',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fira',
});

export const metadata = {
  title: 'মা ফার্নিচার — কুষ্টিয়ার সেরা আসবাবপত্র',
  description: 'কুষ্টিয়া দৌলতপুরের প্রিমিয়াম হস্তনির্মিত আসবাবপত্র। সেগুন, মেহগনি ও গামারি কাঠের চমৎকার সব ডিজাইন।',
};

export const viewport = {
  themeColor: '#7C4B2A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${rozhaOne.variable} ${notoBengali.variable} ${bebasNeue.variable} ${firaCode.variable}`}>
      <body className="wood-grain">
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
