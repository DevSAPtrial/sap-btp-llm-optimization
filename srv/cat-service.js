const cds = require('@sap/cds');
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 });

module.exports = cds.service.impl(async function () {
  const { PromptResponse } = this.entities;

  this.on('getGPTResponse', async (req) => {
    const prompt = req.data.prompt;
    const cacheKey = `gpt_${prompt}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    try {
      const aiCoreResponse = await axios.post(
        'https://your-sap-ai-core-url',
        { prompt: prompt, model: 'gpt-4o' },
        {
          headers: {
            Authorization: `Bearer ${process.env.AICORE_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const responseText = aiCoreResponse.data.choices[0].text;
      cache.set(cacheKey, responseText);

      await cds.run(INSERT.into(PromptResponse).entries({
        ID: cds.utils.uuid(),
        prompt,
        response: responseText,
        createdAt: new Date().toISOString()
      }));

      return responseText;
    } catch (err) {
      console.error('Error fetching GPT-4o response:', err);
      return 'Error fetching GPT-4o response';
    }
  });
});