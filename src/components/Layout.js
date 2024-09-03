import Head from 'next/head';

export default function Layout({ children, title }) {
  console.log('Title:', title);
  
  return (
    <div>
      
      <Head>
        <title>{title}</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}
