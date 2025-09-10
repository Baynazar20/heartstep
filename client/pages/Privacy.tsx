import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div>
      <Header />
      <main className="container py-12">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          This is a placeholder for the Privacy Policy. Provide your policy details here.
        </p>
      </main>
      <Footer />
    </div>
  );
}
