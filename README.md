Spec:

Limitations of vectorizer
https://huggingface.co/Supabase/gte-small#javascript
This model exclusively caters to English texts, and any lengthy texts will be truncated to a maximum of 512 tokens.

Could Cache the embeddings in the DB so we can speed up search on terms we hit alot.
Only make embeddings once.
