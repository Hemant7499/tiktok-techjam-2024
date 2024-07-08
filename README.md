# Tiktok-techjam-2024
<iframe width="560" height="315" src="https://www.youtube.com/embed/y_lUgQu1OBg?si=XP-C9hVNg9B5JBpF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Inspiration
Most social-media platforms support product endorsement by displaying advertisements on behalf of certified sellers. These advertisements lack target-audience knowledge and have limited area of creativity for the sellers. Such generic ads have a low probability of reaching the right audience.

*TLDR*; there are two main areas in tailored discovery to improve ad success:

- Recommend specifc products to users based on user data
- Allowing seller to choose an influencer for advertisement.
***
### What it does
Our tailored discovery system is a two part AI service, where 
1. **Knowledge Graphs** helps sellers by endorsing their product in the form of a personalized advertizement, specifically to a users who are more likely to buy their products based on their activity/interactions on Tiktok.
2. **GenAI** helps sellers to choose an influencer whose digital footprints are utilized to generate a personalized ad video, in a controlled manner.
***

### AppWrite Schema
Checkout *[this](Appwrite_Schema.pdf)* schema diagram.
Database Name: tiktok-clone

### App Setup 


git clone https://github.com/Hemant7499/tiktok-techjam-2024


1. Setup an Appwrite account
2. rename .env.example to .env
3. Fill out credentials from Appwrite

### Running the react front-end
Run the following commands.
    

npm i
npm run dev


### Running neo4j 

Download desktop app for neo4j via [this link](https://neo4j.com/download/?utm_source=Google&utm_medium=PaidSearch&utm_campaign=Evergreen&utm_content=AMS-Search-SEMBrand-Evergreen-None-SEM-SEM-NonABM&utm_term=download%20neo4j&utm_adgroup=download&gad_source=1&gclid=Cj0KCQjw-ai0BhDPARIsAB6hmP6mZCwOuX6P7R-yJ8wVkIEVMTVHvrniUkLzSS1_WBHvJlYlPqZXe7YaAtldEALw_wcB)
Setup your neo4j knowledge graph by reading the [documentation](https://neo4j.com/docs/getting-started/get-started-with-neo4j/)

### Following libraries are required to run for generating ad deepfake
* scipy
* ffmpeg
* openai
* soundfile
* liberosa
* torch
* transformers

*Credits for base project to* [John-Weeks-Dev](https://github.com/John-Weeks-Dev/tiktok-clone-nextjs)
