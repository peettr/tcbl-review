export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'POST only' }), {
        status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();
      const systemPrompt = body.system || 'You are a helpful assistant.';
      const userMessages = body.messages || [];

      const messages = [
        { role: 'system', content: systemPrompt },
        ...userMessages
      ];

      if (!env.AI) {
        return new Response(JSON.stringify({ reply: 'Error: AI binding not found', debug: Object.keys(env) }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const result = await env.AI.run('@cf/qwen/qwen3-30b-a3b-fp8', {
        messages,
        max_tokens: 800,
      });

      let reply = '';
      if (typeof result === 'string') {
        reply = result;
      } else if (result && result.response) {
        reply = result.response;
      } else if (result && result.choices && result.choices[0]) {
        reply = result.choices[0].message.content || '';
      } else {
        reply = '喵...出了点小问题 🐱';
      }
      
      reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      return new Response(JSON.stringify({ reply }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ reply: 'Error: ' + e.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
