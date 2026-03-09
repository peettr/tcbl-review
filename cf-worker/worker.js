// Cloudflare Worker — 菲菲 TCBL Chat Proxy (DashScope Bailian API)

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

      const apiResp = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + env.DASHSCOPE_KEY,
        },
        body: JSON.stringify({
          model: 'qwen-max',
          messages,
          max_tokens: 1000,
        }),
      });

      const data = await apiResp.json();
      let reply = '';

      if (data.choices && data.choices[0]) {
        reply = data.choices[0].message.content || '';
        reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      } else {
        reply = '喵...出了点小问题 🐱';
      }

      return new Response(JSON.stringify({ reply }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ reply: '网络好像不太通 🐱', error: e.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
