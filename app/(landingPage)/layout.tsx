
import LenisScroll from "@/components/LenisScroll";

// export const metadata = {
//     title: "Thumblify-AI Thumbnail Generator",
//     description: "Thumblify is a website for generating Thumbnail for your content creation.",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
         <LenisScroll />
            {children}
           
        </>
    );
}