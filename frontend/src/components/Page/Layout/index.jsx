import Head from 'next/head';
import { Banner, Navbar, Footer, HeaderTitle } from '..';
import { ClubIconSVG as ClubIconSVG } from '..';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
import { useRouter } from 'next/router';

export function Layout({ children, image, title }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <Head>
        <title>{title && `${title} -`} Club Agronomía Central</title>
      </Head>
      <Navbar />
      <main
        className={`w-full ${
          pathname === '/' ? 'p-0' : 'py-14'
        } min-h-screen duration-500 dark:!text-white dark:bg-[#171717]`}
      >
        {title && <HeaderTitle image={image} title={title} />}

        <div
          className={`w-full ${
            pathname === '/' ? '' : 'lg:max-w-5xl mx-auto'
          } `}
        >
          {children}
        </div>
        <WhatsAppWidget
          CompanyIcon={ClubIconSVG}
          phoneNumber="584149056161"
          companyName="Club Agronomía Central"
          replyTimeText="Usualmente responde en un día"
          message="¡Hola! ¿Cómo puedo ayudarte?"
          sendButtonText="Enviar"
          inputPlaceHolder="Escribí tu mensaje"
        />
      </main>
      <Footer />
    </>
  );
}
