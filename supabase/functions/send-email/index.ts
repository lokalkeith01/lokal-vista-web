import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'contact' | 'consultation' | 'demo' | 'partnership' | 'interest';
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  source?: string;
}

// HTML-escape user input to prevent XSS
function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validate and truncate string input
function validateString(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input.slice(0, maxLength).trim();
}

// Simple email format check
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

const VALID_TYPES = ['contact', 'consultation', 'demo', 'partnership', 'interest'];

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate type
    const type = validateString(body.type, 20);
    if (!VALID_TYPES.includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid email type" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate and sanitize inputs
    const name = validateString(body.name, 100);
    const email = validateString(body.email, 254);
    const company = validateString(body.company, 200);
    const message = validateString(body.message, 5000);
    const source = validateString(body.source, 100);

    // Validate email format if provided
    if (email && !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // For contact type, require name, email, and message
    if (type === 'contact') {
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: "Name, email, and message are required for contact submissions" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Escape all user inputs for HTML embedding
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeMessage = escapeHtml(message);
    const safeSource = escapeHtml(source);

    let subject = "";
    let htmlContent = "";

    switch (type) {
      case 'contact':
        subject = "New Contact Form Submission";
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `;
        break;
      case 'consultation':
        subject = "New Consultation Request";
        htmlContent = `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${safeName || 'Not provided'}</p>
          <p><strong>Email:</strong> ${safeEmail || 'Not provided'}</p>
          <p><strong>Company:</strong> ${safeCompany || 'Not provided'}</p>
          <p>Someone has requested a consultation from the contact page.</p>
        `;
        break;
      case 'demo':
        subject = "New Demo Request";
        htmlContent = `
          <h2>New Demo Request</h2>
          <p>Someone has requested a demo from the ${safeSource || 'website'}.</p>
        `;
        break;
      case 'partnership':
        subject = "New Partnership Interest";
        htmlContent = `
          <h2>New Partnership Interest</h2>
          <p>Someone is interested in partnering with Lokal from the ${safeSource || 'website'}.</p>
        `;
        break;
      case 'interest':
        subject = "New Interest Signup";
        htmlContent = `
          <h2>New Interest Signup</h2>
          <p><strong>Email:</strong> ${safeEmail || 'Not provided'}</p>
          <p><strong>Source:</strong> ${safeSource || 'website'}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `;
        break;
      default:
        subject = "New Website Inquiry";
        htmlContent = `
          <h2>New Website Inquiry</h2>
          <p>Someone has reached out from the website.</p>
        `;
    }

    const emailResponse = await resend.emails.send({
      from: "Lokal Website <onboarding@resend.dev>",
      to: ["info@sharelokal.com"],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
