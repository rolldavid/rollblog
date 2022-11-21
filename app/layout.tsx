
import styles from "@/styles/Home.module.css"
import "@/styles/globals.css"
import NavContainer from "./nav/components/NavContainer";
import { ThemeContextProvider } from "./context/ThemeProvider";

export default async function RootLayout({ children }: {
    children: React.ReactNode;
  }) {
    const setInitialTheme = `
    function getUserPreference() {
      if(window.localStorage.getItem('theme')) {
        return window.localStorage.getItem('theme')
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
    }
    document.body.dataset.theme = getUserPreference();
    `;
 
    return (
      <html lang="en">
        <body>
            <main className={styles.container}>
                <section className={styles.nav}>
                    <ThemeContextProvider>
                      <NavContainer />
                    </ThemeContextProvider>
                </section>
                <section className={styles.content}>
                    {children}
                </section>
            </main>
            <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        </body>
      </html>
    );
  }