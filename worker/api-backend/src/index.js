export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/api/health" && request.method === "GET") {
      return Response.json(
        { status: "ok", service: "WebTech Services API", hasDB: Boolean(env.LEADS_DB) },
        { headers: corsHeaders }
      );
    }

    if (url.pathname === "/api/callback" && request.method === "POST") {
      try {
        const body = await request.json();
        const company = (body?.company || "").trim();
        const phone = (body?.phone || "").trim();
        const email = (body?.email || "").trim();
        const service = (body?.service || "").trim();

        if (!company || !phone) {
          return Response.json(
            { ok: false, error: "Company name and phone are required." },
            { status: 400, headers: corsHeaders }
          );
        }

        // 1. Save in Cloudflare D1 Database
        if (env.LEADS_DB) {
          await env.LEADS_DB.prepare(
            "INSERT INTO callbacks (company, phone, email, service) VALUES (?, ?, ?, ?)"
          )
            .bind(company, phone, email, service)
            .run();
        }

        // 2. Send Instant Email Alert via Resend
        if (env.RESEND_API_KEY) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "WebTech Leads <onboarding@resend.dev>",
              to: ["YOUR_RESEND_EMAIL@gmail.com"],
              subject: `New Enquiry: ${company} (${service || "General"})`,
              html: `
                <h2>New Callback Enquiry - WebTech Services</h2>
                <p><strong>Name / Company:</strong> ${company}</p>
                <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                <p><strong>Email:</strong> ${email || "N/A"}</p>
                <p><strong>Service Needed:</strong> ${service || "N/A"}</p>
              `,
            }),
          });
        }

        return Response.json(
          {
            ok: true,
            message: "Callback request saved successfully.",
            data: { company, phone, email, service },
          },
          { status: 201, headers: corsHeaders }
        );
      } catch (err) {
        return Response.json(
          { ok: false, error: err?.message || "Failed to save callback." },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    if (url.pathname === "/api/leads" && request.method === "GET") {
      if (!env.LEADS_DB) {
        return Response.json(
          { ok: false, error: "D1 database not bound." },
          { status: 500, headers: corsHeaders }
        );
      }

      const { results } = await env.LEADS_DB.prepare(
        "SELECT id, company, phone, email, service, created_at FROM callbacks ORDER BY id DESC LIMIT 50"
      ).all();

      return Response.json({ ok: true, leads: results }, { headers: corsHeaders });
    }

    return Response.json(
      { ok: false, error: "Route not found" },
      { status: 404, headers: corsHeaders }
    );
  },
};