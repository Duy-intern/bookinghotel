  import type { Metadata } from "next";
  import { ReactNode } from "react";
  import { AuthProvider } from "@/components/hooks/useContext";


  export const metadata: Metadata = {
    title: "BOOKING HOTEL",
    description: "Generated by create next app",
  };

  interface RootLayoutProps {
    children: ReactNode;  
  }
  export default function RootLayout({ children }: RootLayoutProps) {
    return (
      <html lang="en" >
        <body>
          <AuthProvider> 
            
            {children}  
            </AuthProvider>
        </body>
      </html>
    );
  }

