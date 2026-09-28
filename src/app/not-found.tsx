import Container from "@/components/Container";
import Button from "@/components/Button";
import ShieldBackdrop from "@/components/ShieldBackdrop";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-grid py-28 text-center">
      <ShieldBackdrop />
      <Container className="relative">
        <div className="font-display text-6xl font-extrabold text-brand-100">404</div>
        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          This page ran off to automate something else.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist, or has moved.
        </p>
        <Button href="/" className="mt-8">
          Back to home <ArrowRightIcon />
        </Button>
      </Container>
    </section>
  );
}
