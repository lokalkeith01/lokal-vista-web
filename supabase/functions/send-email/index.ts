import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, name, email, company, message, source }: EmailRequest = await req.json();

    let subject = "";
    let htmlContent = "";

    switch (type) {
      case 'contact':
        subject = "New Contact Form Submission";
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `;
        break;
      case 'consultation':
        subject = "New Consultation Request";
        htmlContent = `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p>Someone has requested a consultation from the contact page.</p>
        `;
        break;
      case 'demo':
        subject = "New Demo Request";
        htmlContent = `
          <h2>New Demo Request</h2>
          <p>Someone has requested a demo from the ${source || 'website'}.</p>
        `;
        break;
      case 'partnership':
        subject = "New Partnership Interest";
        htmlContent = `
          <h2>New Partnership Interest</h2>
          <p>Someone is interested in partnering with Lokal from the ${source || 'website'}.</p>
        `;
        break;
      case 'interest':
        subject = "New Interest Signup";
        htmlContent = `
          <h2>New Interest Signup</h2>
          <p>Someone has shown interest in Lokal from the ${source || 'website'}.</p>
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
      to: ["keith@sharelokal.com"],
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);