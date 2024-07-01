import Image from "next/image";
import { NewsletterForm } from "./newsletter-form";

export default function Home() {
  return (
    <main>
      <div className="max-w-3xl mx-auto px-10 card card-bordered bg-base-300 mt-10">
        <div className="card-body">
          <h1 className="card-title">Subscribe to newsletter</h1>

          <NewsletterForm />
        </div>
      </div>
    </main>
  );
}
