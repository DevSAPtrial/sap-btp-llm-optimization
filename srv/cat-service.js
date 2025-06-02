const cds = require('@sap/cds');
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // cache for 5 mins

module.exports = cds.service.impl(async function () {
  const { PromptResponse } = this.entities;

  this.on('getGPTResponse', async (req) => {
    const prompt = req.data.prompt;
    if (!prompt) {
      req.error(400, 'Prompt is required');
    }

    const cacheKey = `gpt_${prompt}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const token = process.env.AICORE_TOKEN;
    if (!token) {
      req.error(500, 'Missing AI Core token in environment variables');
    }

    try {
      const response = await axios.post(
        'https://api.sap.com/ai-core/openai/gpt-4o', // Update to your real endpoint
        {
          model: 'gpt-4o',
          prompt: prompt,
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const gptResponse = response.data.choices[0].text.trim();

      await INSERT.into(PromptResponse).entries({
        ID: cds.utils.uuid(),
        prompt: prompt,
        response: gptResponse,
        createdAt: new Date()
      });

      cache.set(cacheKey, gptResponse);
      return gptResponse;

    } catch (err) {
      req.error(500, 'Failed to fetch GPT response: ' + err.message);
    }
  });
});
