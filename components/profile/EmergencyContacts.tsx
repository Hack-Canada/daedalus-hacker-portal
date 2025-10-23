import { AlertCircle } from "lucide-react";

interface EmergencyContactsProps {
  contact: {
    name: string;
    phone: string;
    relation: string;
  };
}

export function EmergencyContacts({ contact }: EmergencyContactsProps) {
  // Format phone number for better readability
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <section
      className="group relative overflow-hidden rounded-lg border-2 border-primary/20 bg-white/50 p-8 transition-all duration-500"
      aria-labelledby="emergency-contact-heading"
    >
      {/* Layered background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-info/30 to-primaryLight/30 opacity-50 transition-all duration-700 group-hover:opacity-100" />

      {/* Header with Organizer Badge */}
      <div className="mb-6 space-y-2">
        <div
          className="flex gap-2 max-sm:flex-col-reverse sm:items-center sm:justify-between"
          role="heading"
          aria-level={2}
        >
          <div className="flex items-center gap-2">
            <AlertCircle
              strokeWidth={3}
              className="size-4 text-primary transition-transform group-hover:scale-110 group-hover:text-primary/80"
              aria-hidden="true"
            />
            <h2
              id="emergency-contact-heading"
              className="text-xl font-semibold tracking-wide text-textPrimary"
            >
              Emergency Contact
            </h2>
          </div>

          <div className="flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <AlertCircle className="size-3 max-sm:hidden" />
            Organizer View
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div
        className="relative overflow-hidden rounded-lg bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:bg-white/80 group-hover:shadow-md"
        role="region"
        aria-label="Emergency contact details"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-info/5 to-primaryLight/5 opacity-0 transition-all duration-700 group-hover:opacity-100" />
        <dl className="flex flex-col gap-3">
          <div>
            <dt className="mb-1 text-sm font-medium text-textSecondary">
              Name
            </dt>
            <dd className="font-medium text-textPrimary transition-all duration-500">
              {contact.name}
            </dd>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm md:gap-6">
            <div>
              <dt className="mb-1 text-sm font-medium text-textSecondary">
                Relationship
              </dt>
              <dd className="w-fit rounded-full bg-primary/10 px-3 py-1 text-textSecondary transition-all">
                {contact.relation}
              </dd>
            </div>
            <div className="h-10 w-0.5 bg-black/10" />
            <div>
              <dt className="mb-1 text-sm font-medium text-textSecondary">
                Phone Number
              </dt>
              <dd className="rounded-full bg-primary/10 px-3 py-1 text-textSecondary transition-all">
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:underline"
                  aria-label={`Call emergency contact at ${formatPhoneNumber(
                    contact.phone,
                  )}`}
                >
                  {formatPhoneNumber(contact.phone)}
                </a>
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}
