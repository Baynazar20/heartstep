import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div>
      <Header />
      <main className="container py-12">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          This is a placeholder for the Terms of Service. Provide your terms here.
        </p>
      </main>
      <Footer />
    </div>
  );
}
