import styles from './layout.module.css';
import Starfield from './components/Starfield';
import { Metadata } from "next";
import Header from './components/Header';

export const metadata: Metadata = {
  title: 'Dragon Ball Characters',
  description: 'Explore Dragon Ball characters — profiles, powers, and stories for Goku, Vegeta, and more.',
};

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en">
        <body className={styles.appRoot}>
          <Header/>
          <Starfield />
          {children}
        </body>
    </html>
    );
}