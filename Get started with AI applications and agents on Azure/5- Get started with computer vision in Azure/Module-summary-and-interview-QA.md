# Get started with computer vision in Azure

## Quick summary

Applied computer-vision module including multimodal reasoning, image generation API usage, and async video generation behavior.

## Key takeaways

- Multimodal models can combine image and text understanding.
- Image generation is available programmatically via API/SDK calls.
- Requests should target deployment names configured in Foundry.
- Video generation can be asynchronous due to higher compute cost.
- Model selection must fit task modality and performance needs.

## Predictive interview Q&A

### Q1. What is multimodal in interview terms?

**Answer:** A model that can reason across multiple input/output types like text and images.

### Q2. Why async for video generation?

**Answer:** Long-running jobs are queued/polled because rendering is resource intensive.

### Q3. What value is passed as model in many SDK calls?

**Answer:** The deployment name you configured in your resource.

### Q4. How would you productionize image generation?

**Answer:** Use endpoint auth, moderation/safety checks, retries, logging, and async handling where required.

## How to use this page

- Review the key takeaways before practice tests.
- Answer the interview questions aloud without looking first.
- Link gaps to the module exercises and your Q&A simulator weak-topic mode.
