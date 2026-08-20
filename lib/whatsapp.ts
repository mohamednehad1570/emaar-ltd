export const WHATSAPP_NUMBER = '971500000000'; // client will replace

export type WhatsAppContext = {
  page:
    | 'home'
    | 'products'
    | 'product-detail'
| 'projects'
    | 'project-detail'
    | 'technical'
    | 'contact'
    | 'why-choose-us';
  productName?: string;
  projectName?: string;
};

type MessageFactory = string | ((ctx: WhatsAppContext) => string);

const MESSAGES: Record<WhatsAppContext['page'], MessageFactory> = {
  'home':                  "Hi, I'd like to learn more about your windows and doors. Can you help?",
  'products':              "Hi, I'm browsing your product range and would like a quote.",
  'product-detail':        (ctx) => `Hi, I'm interested in the ${ctx.productName ?? 'your product'}. Can I get more details and a quote?`,
'projects':              "Hi, I saw your project portfolio and I'm interested in a similar installation.",
  'project-detail':        (ctx) => `Hi, I saw the ${ctx.projectName ?? 'your project'} on your website. I'm interested in something similar.`,
  'technical':             "Hi, I'm reviewing your technical specifications. I'd like to discuss a project.",
  'contact':               "Hi, I'd like to get in touch with Emaar International.",
  'why-choose-us':         "Hi, I've been reading about Emaar International and I'd like to get a quote.",
};

// Optional override lets server-fetched CMS number replace the constant
export function getWhatsAppURL(context: WhatsAppContext, whatsappNumber?: string): string {
  const number = whatsappNumber ?? WHATSAPP_NUMBER;
  const factory = MESSAGES[context.page];
  const message = typeof factory === 'function' ? factory(context) : factory;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
