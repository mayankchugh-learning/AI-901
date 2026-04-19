# Semantic language models

*4 minutes*

![Module overview: semantic language models, embeddings, and content format options](../assets/nlp-semantic-language-models-01-intro-embeddings.png)

**Choose your preferred content format**

- **Video** — video-based lesson
- **Text and images** — read on-screen text and figures (this option is highlighted in the module UI)

As natural language processing (NLP) has advanced, deep learning models encapsulate semantic relationships by encoding tokens as vectors (multi-valued arrays of numbers) known as **embeddings**.

This vector-based approach became common with techniques like **Word2Vec** and **GloVe**. The dimension values reflect semantic characteristics based on usage in training text. A recent advancement called **attention** considers each token in context to create **contextualized embeddings** (for example, in GPT models), forming the basis of modern generative AI.

## Representing text as vectors

Vectors represent points in multidimensional space. Semantically similar tokens should result in vectors with a similar orientation—they point in similar directions.

For example, consider the following three-dimensional embeddings for some common words:

| Word | Vector |
| :--- | :--- |
| `dog` | [0.8, 0.6, 0.1] |
| `puppy` | [0.9, 0.7, 0.4] |
| `cat` | [0.7, 0.5, 0.2] |
| `kitten` | [0.8, 0.6, 0.5] |
| `young` | [0.1, 0.1, 0.3] |
| `ball` | [0.3, 0.9, 0.1] |
| `tree` | [0.2, 0.1, 0.9] |

![Word embedding table (including `tree`) and 3D visualization of vectors from the origin](../assets/nlp-semantic-language-models-02-vectors-3d-viz.png)

We can visualize these vectors in three-dimensional space as shown here:

*Diagram of a 3D coordinate plot: animal-related words cluster; `ball` and `tree` point in distinct directions; `young` sits nearer the origin.*

The vectors for **"dog"** and **"cat"** are similar (both domestic animals), as are **"puppy"** and **"kitten"** (both young animals).

The words **"tree"**, **"young"**, and **"ball"** have distinctly different vector orientations, reflecting their different semantic meanings.

The semantic characteristic encoded in the vectors makes it possible to use vector-based operations that compare words and enable analytical comparisons.

## Finding related terms

Since the orientation of vectors is determined by their dimension values, words with similar semantic meanings tend to have similar orientations. You can use **cosine similarity** between vectors to make meaningful comparisons.

![Cosine similarity formula, worked examples for dog, cat, and tree, and 3D vector comparison](../assets/nlp-semantic-language-models-03-cosine-similarity.png)

For example, to determine the “odd one out” between `"dog"`, `"cat"`, and `"tree"`, you can calculate the cosine similarity between pairs of vectors. The cosine similarity is calculated as:

`cosine_similarity(A, B) = (A · B) / (||A|| * ||B||)`

Where `A · B` is the **dot product** and `||A||` is the **magnitude** of vector **A**.

**dog** `[0.8, 0.6, 0.1]` and **cat** `[0.7, 0.5, 0.2]`:

- Dot product: `(0.8 × 0.7) + (0.6 × 0.5) + (0.1 × 0.2) = 0.56 + 0.30 + 0.02 = 0.88`
- Magnitude of dog: `√(0.8² + 0.6² + 0.1²) = √(0.64 + 0.36 + 0.01) = √1.01 ≈ 1.005`
- Magnitude of cat: `√(0.7² + 0.5² + 0.2²) = √(0.49 + 0.25 + 0.04) = √0.78 ≈ 0.883`
- Cosine similarity: `0.88 / (1.005 × 0.883) ≈ 0.992` (**high similarity**)

**dog** `[0.8, 0.6, 0.1]` and **tree** `[0.2, 0.1, 0.9]`:

- Dot product: `(0.8 × 0.2) + (0.6 × 0.1) + (0.1 × 0.9) = 0.16 + 0.06 + 0.09 = 0.31`
- Magnitude of tree: `√(0.2² + 0.1² + 0.9²) = √(0.04 + 0.01 + 0.81) = √0.86 ≈ 0.927`
- Cosine similarity: `0.31 / (1.005 × 0.927) ≈ 0.333` (**low similarity**)

**cat** `[0.7, 0.5, 0.2]` and **tree** `[0.2, 0.1, 0.9]`:

- Dot product: `(0.7 × 0.2) + (0.5 × 0.1) + (0.2 × 0.9) = 0.14 + 0.05 + 0.18 = 0.37`
- Cosine similarity: `0.37 / (0.883 × 0.927) ≈ 0.452` (**low similarity**)

![3D plot: dog and cat vectors nearly aligned; tree points away; arcs labeled 0.992, 0.333, and 0.452](../assets/nlp-semantic-language-models-04-cosine-vector-translation.png)

The results show that `"dog"` and `"cat"` are highly similar (0.992), while `"tree"` has lower similarity to both `"dog"` (0.333) and `"cat"` (0.452). Therefore, **tree** is clearly the odd one out.

## Vector translation through addition and subtraction

You can add or subtract vectors to produce new vector-based results, which can then be mapped to tokens with matching vectors. This technique enables arithmetic-based logic for linguistic relationships.

For example, using the vectors from earlier:

`dog + young = [0.8, 0.6, 0.1] + [0.1, 0.1, 0.3] = [0.9, 0.7, 0.4] = puppy`

`cat + young = [0.7, 0.5, 0.2] + [0.1, 0.1, 0.3] = [0.8, 0.6, 0.5] = kitten`

![3D plot: `young` added to `dog` and `cat` to reach `puppy` and `kitten`; note on nearest-neighbor matching](../assets/nlp-semantic-language-models-05-vector-arithmetic.png)

These operations work because the vector for `"young"` encodes the semantic transformation from an adult animal to its young counterpart.

> **Note**
>
> In practice, vector arithmetic rarely produces exact matches; instead, you would search for the word whose vector is **closest** (most similar) to the result.

The arithmetic works in reverse as well:

`puppy - young = [0.9, 0.7, 0.4] - [0.1, 0.1, 0.3] = [0.8, 0.6, 0.1] = dog`

`kitten - young = [0.8, 0.6, 0.5] - [0.1, 0.1, 0.3] = [0.7, 0.5, 0.2] = cat`

## Analogical reasoning

Vector arithmetic can also answer analogy questions like "`puppy` is to `dog` as `kitten` is to ?"

To solve this, calculate: `kitten - puppy + dog`

`[0.8, 0.6, 0.5] - [0.9, 0.7, 0.4] + [0.8, 0.6, 0.1]`

`= [-0.1, -0.1, 0.1] + [0.8, 0.6, 0.1]`

`= [0.7, 0.5, 0.2]`

`= cat`

![3D visualization: vector path from kitten via −puppy and +dog to the cat vector](../assets/nlp-semantic-language-models-06-analogy-applications.png)

These examples demonstrate how vector operations can capture linguistic relationships and enable reasoning about semantic patterns.

## Using semantic models for text analysis

![Overview: text summarization, keyword extraction, NER, and text classification](../assets/nlp-semantic-language-models-07-text-analysis-tasks.png)

Vector-based semantic models provide powerful capabilities for many common text analysis tasks.

### Text summarization

Semantic embeddings enable *extractive* summarization by identifying sentences with vectors that are most representative of the overall document. By encoding each sentence as a vector (often by averaging or pooling the embeddings of its constituent words), you can calculate which sentences are most central to the document's meaning. These central sentences can be extracted to form a summary that captures the key themes.

### Keyword extraction

Vector similarity can identify the most important terms in a document by comparing each word's embedding to the document's overall semantic representation. Words whose vectors are most similar to the document vector, or most central when considering all word vectors in the document, are likely to be key terms that represent the main topics.

### Named entity recognition

Semantic models can be fine-tuned to recognize named entities (people, organizations, locations, etc.) by learning vector representations that cluster similar entity types together. During inference, the model examines each token's embedding and its context to determine whether it represents a named entity and, if so, what type.

### Text classification

For tasks like sentiment analysis or topic categorization, documents can be represented as aggregate vectors (such as the mean of all word embeddings in the document). These document vectors can then be used as features for machine learning classifiers, or compared directly to class prototype vectors to assign categories. Because semantically similar documents have similar vector orientations, this approach effectively groups related content and distinguishes different categories.
