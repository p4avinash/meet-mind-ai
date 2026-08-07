import { HiInformationCircle } from "react-icons/hi2";

const DemoModeBanner = () => {
  return (
    <section className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
      <div className="flex items-start gap-3">
        <HiInformationCircle className="mt-0.5 text-2xl text-amber-400" />

        <div>
          <h3 className="font-semibold text-amber-300">Demo Mode Active</h3>

          <p className="mt-1 text-sm leading-6 text-zinc-300">
            Email delivery is running in demo mode due to the free-tier
            limitations of the email provider. Meeting summaries are generated
            normally, but emails are delivered to the developer inbox instead of
            the entered recipient.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoModeBanner;
