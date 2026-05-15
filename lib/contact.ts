export const CONTACT_EMAIL = "jakubpopiolek20@gmail.com" as const;

const MAILTO_SUBJECT = "Opportunity / project inquiry";
const MAILTO_BODY = `Hi Jakub,

I'm interested in working with you and would love to discuss a potential opportunity/project.

Here are some more details about the role/project:

Project overview:
Timeline:
Responsibilities/scope of work:
Technologies/tools involved:
Budget/rate:
Additional details:

Please let me know if you're interested, and I'd be happy to discuss everything further.

Best regards,`;

/** Opens the visitor's mail client with subject and body prefilled. */
export function contactMailtoHref(): string {
  // encodeURIComponent uses %20 for spaces; URLSearchParams uses + which Outlook shows literally.
  const subject = encodeURIComponent(MAILTO_SUBJECT);
  const body = encodeURIComponent(MAILTO_BODY);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
