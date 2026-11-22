export default {
  async fetch(request, env, ctx) {
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
        { status: "ok", service: "WebTech Services API" },
        { headers: corsHeaders }
      );
    }

    if (url.pathname === "/api/callback" && request.method === "POST") {
      try {
        const body = await request.json();
        const { company, phone, email, service } = body || {};

        if (!company || !phone) {
          return Response.json(
            { ok: false, error: "Company name and phone are required." },
            { status: 400, headers: corsHeaders }
          );
        }

        // Agar D1 database bound hai toh yahan insert kar sakte hain:
        // if (env.LEADS_DB) {
        //   await env.LEADS_DB.prepare(
        //     "INSERT INTO callbacks (company, phone, email, service) VALUES (?, ?, ?, ?)"
        //   ).bind(company, phone, email || "", service || "").run();
        // }

        return Response.json(
          {
            ok: true,
            message: "Callback request received by WebTech Services.",
            data: { company, phone, email, service },
          },
          { status: 201, headers: corsHeaders }
        );
      } catch (err) {
        return Response.json(
          { ok: false, error: "Invalid JSON payload." },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    return Response.json(
      { ok: false, error: "Route not found" },
      { status: 404, headers: corsHeaders }
    );
  },
};