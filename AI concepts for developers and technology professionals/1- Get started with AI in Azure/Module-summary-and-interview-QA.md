# Get started with AI in Azure (Concepts)

## Quick summary

This module introduces core AI terms, relationship between AI and ML, and how Azure and Microsoft Foundry support AI app development.

## Key takeaways

- AI is the broad goal; ML is a data-driven method used within AI.
- Foundry runs on Azure resources and uses Azure security, identity, and networking.
- Client apps call deployed model endpoints using HTTPS APIs.
- Keys/secrets and endpoints serve different roles: identity vs location.
- Playgrounds help validate prompts before coding SDK-based clients.

## Predictive interview Q&A

### Q1. What is the difference between AI and ML?

**Answer:** AI is the broad field; ML is a technique where systems learn patterns from data to perform AI tasks.

### Q2. Why do teams use Foundry before writing production code?

**Answer:** To compare models, test prompts, and capture working settings that reduce implementation risk.

### Q3. Why should secrets not be hardcoded?

**Answer:** Hardcoded secrets can leak through source control and expose paid or sensitive resources.

### Q4. What is a client application in this context?

**Answer:** A user-facing app (web/mobile/desktop) that sends requests to model/service endpoints and displays results.

### Q5. What does an endpoint represent?

**Answer:** The network URL entry point where your app calls an AI service or deployment.

### Q6. How do keys and endpoints work together?

**Answer:** The endpoint is where you call; the key or token proves your app is authorized.

## How to use this page

- Review the key takeaways before practice tests.
- Answer the interview questions aloud without looking first.
- Link gaps to the module exercises and your Q&A simulator weak-topic mode.
