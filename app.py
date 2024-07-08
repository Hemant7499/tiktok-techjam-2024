from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
from neo4j import GraphDatabase
import torch
from transformers import AutoModel, AutoTokenizer
import torch.nn.functional as F

# from IPython.display import HTML, clear_output
# import os
# import wget
# from IPython.display import HTML
# from base64 import b64encode
# from IPython.display import HTML, Audio
# from google.colab.output import eval_js
# from base64 import b64decode
# from ghc.l_ghc_cf import l_ghc_cf
# import numpy as np
# from scipy.io.wavfile import read as wav_read
# import io
# import ffmpeg
# import os
# from urllib import parse as urlparse

# from base64 import b64encode
# import os

# import openai
# import soundfile as sf
# import requests
# import json
# import librosa

def generate_modified_description(user_interactions, api_key):
  openai.api_key = api_key
  prompt = f"User interactions:\n"
  prompt += f"- Liked Posts: {', '.join(user_interactions['liked_posts'])}\n"
  prompt += f"- User's Posts: {', '.join(user_interactions['user_posts'])}\n"
  prompt += f"- Important Community Members: {', '.join(user_interactions['important_community_members'])}\n"
  prompt += f"- Liked Ads: {', '.join(user_interactions['liked_ads'])}\n"
  prompt += f"- Bought Products: {', '.join(user_interactions['bought_products'])}\n\n"
  prompt += "Based on these interactions, please enhance the product description to better match the user's preferences."
#   response = openai.ChatCompletion.create(
#       engine="gpt-3.5-turbo"
#       messages=[
#           {
#               "role": "user",
#               "content": prompt
#           }
#       ]
#   )
  response = ""
  return response.choices[0].message.content

def get_text(user_prompt):
  api_key = "sk-proj-X7whjOrq2UdO3NJqNKMDT3BlbkFJKzh0kcyfuqhsRwWHxGmF"
  modified_description = generate_modified_description(user_interactions, api_key)
  if modified_description:
    print("Modified Product Description:")
    print(modified_description)

d

# Commented out IPython magic to ensure Python compatibility.
def setup_pipeline():
    os.remove("./sample_data")

    os.chdir("./Wav2Lip")




    AUDIO_HTML = """
    <script>
    var my_div = document.createElement("DIV");
    var my_p = document.createElement("P");
    var my_btn = document.createElement("BUTTON");
    var t = document.createTextNode("Press to start recording");

    my_btn.appendChild(t);
    //my_p.appendChild(my_btn);
    my_div.appendChild(my_btn);
    document.body.appendChild(my_div);

    var base64data = 0;
    var reader;
    var recorder, gumStream;
    var recordButton = my_btn;

    var handleSuccess = function(stream) {
    gumStream = stream;
    var options = {
        //bitsPerSecond: 8000, //chrome seems to ignore, always 48k
        mimeType : 'audio/webm;codecs=opus'
        //mimeType : 'audio/webm;codecs=pcm'
    };
    //recorder = new MediaRecorder(stream, options);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = function(e) {
        var url = URL.createObjectURL(e.data);
        var preview = document.createElement('audio');
        preview.controls = true;
        preview.src = url;
        document.body.appendChild(preview);

        reader = new FileReader();
        reader.readAsDataURL(e.data);
        reader.onloadend = function() {
        base64data = reader.result;
        //console.log("Inside FileReader:" + base64data);
        }
    };
    recorder.start();
    };

    recordButton.innerText = "Recording... press to stop";

    navigator.mediaDevices.getUserMedia({audio: true}).then(handleSuccess);


    function toggleRecording() {
    if (recorder && recorder.state == "recording") {
        recorder.stop();
        gumStream.getAudioTracks()[0].stop();
        recordButton.innerText = "Saving the recording... pls wait!"
    }
    }

    // https://stackoverflow.com/a/951057
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    var data = new Promise(resolve=>{
    //recordButton.addEventListener("click", toggleRecording);
    recordButton.onclick = ()=>{
    toggleRecording()

    sleep(2000).then(() => {
    // wait 2000ms for the data to be available...
    // ideally this should use something like await...
    //console.log("Inside data:" + base64data)
    resolve(base64data.toString())

    });

    }
    });

    </script>
    """

#     %cd /
#     %cd content

    def get_audio():
        display(HTML(AUDIO_HTML))
        data = eval_js("data")
        binary = b64decode(data.split(',')[1])

        process = (ffmpeg
            .input('pipe:0')
            .output('pipe:1', format='wav')
            .run_async(pipe_stdin=True, pipe_stdout=True, pipe_stderr=True, quiet=True, overwrite_output=True)
        )
        output, err = process.communicate(input=binary)

        riff_chunk_size = len(output) - 8
        q = riff_chunk_size
        b = []
        for i in range(4):
            q, r = divmod(q, 256)
            b.append(r)

        riff = output[:4] + bytes(b) + output[8:]

        sr, audio = wav_read(io.BytesIO(riff))

        return audio, sr

    def showVideo(path):
        mp4 = open(str(path),'rb').read()
        data_url = "data:video/mp4;base64," + b64encode(mp4).decode()
        return HTML("""
        <video width=700 controls>
                <source src="%s" type="video/mp4">
        </video>
        """ % data_url)

        from IPython.display import clear_output

        clear_output()
        print("All set and ready!")

def set_video():
    mp4 = open('output_youtube.mp4','rb').read()
    data_url = "data:video/mp4;base64," + b64encode(mp4).decode()
    HTML(f"""<video width=600 controls><source src="{data_url}"></video>""")

def displayAudio():
  display(Audio('/./input_audio.wav'))

def audio_setup():
    PATH_TO_YOUR_AUDIO = '/./test.wav'
    audio, sr = librosa.load(PATH_TO_YOUR_AUDIO, sr=None)
    sf.write('/./input_audio.wav', audio, sr, format='wav')
    clear_output()
    displayAudio()

def combine_audio_video(audio_path, video_path):
    # os.chdir(/./Wav2Lip)

    output_file_path = '/content/Wav2Lip/results/result_voice.mp4'

    if os.path.exists(output_file_path):
        os.remove(output_file_path)

    pad_top =  0
    pad_bottom =  10
    pad_left =  0
    pad_right =  0
    rescaleFactor =  1
    nosmooth = True

    use_hd_model = False
    checkpoint_path = 'checkpoints/wav2lip.pth' if not use_hd_model else 'checkpoints/wav2lip_gan.pth'


    

    if os.path.exists(output_file_path):
        clear_output()
        print("Final Video Preview")
        print("Download this video from", output_file_path)
        showVideo(output_file_path)
    else:
        print("Processing failed. Output video not found.")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origin": "http://localhost:3000"}})

# Neo4j connection details
uri = "bolt://localhost:7687"
username = ""
password = ""

# Create a Neo4j driver instance
driver = GraphDatabase.driver(uri, auth=(username, password))

def run_cypher_query(query, userId):
    with driver.session() as session:
        result = session.run(query, userId=userId)
        return [record.data() for record in result]

@app.route('/')
@cross_origin(supports_credentials=True)
def home():
    return "Welcome to the Flask API with Neo4j!"


# @app.route('/query', methods=['GET', 'POST', 'OPTIONS'])
# def query():
#     if request.method == 'OPTIONS':
#         response = app.make_default_options_response()
#         response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#         return response
    
#     # Handle GET and POST requests here
#     return 'Query endpoint'


@app.route('/query', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def query():
    data = request.json
    userId = data.get('userId')
    print(userId)
    cypher_query = '''MATCH (u:User {user_id: $userId}) RETURN u.bio AS Description UNION 
                      MATCH (u)-[:LIKES]->(likedPosts:Post) RETURN DISTINCT likedPosts.desc AS Description UNION 
                      MATCH (postedPosts:Post {user_id: $userId}) RETURN DISTINCT postedPosts.desc AS Description'''

    if not cypher_query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        result = run_cypher_query(cypher_query,userId)
        tags = []
        for i in result:
            tags.append(i['Description'])

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
    # Load pre-trained BERT model and tokenizer
    model_name = 'bert-base-uncased'
    model = AutoModel.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    # Define source text and array of target texts
    source_text = " ".join([str(item) for item in tags[:5]])
    cypher_query = """MATCH (givenUser:User {user_id: $userId})-[:LIKES]->(post:Post)<-[:LIKES]-(otherUser:User)-[:BOUGHT]->(product:Product) 
                      WHERE NOT (givenUser)-[:FOLLOWS]->(otherUser) 
                      RETURN DISTINCT product.title AS desc,product.product_id AS p_id"""
    result = run_cypher_query(cypher_query,userId)

    target_texts = [i['desc'] for i in result]
    p_ids = [i['p_id'] for i in result]
    print(userId,target_texts)


    if len(target_texts) == 0:
        res = {'id' : '668b1d660022953c4dcc',
           'user_id': '',
           'video_url':'668b1a9d000d87c9619a',
           'text':'Unleash your potential on the cricket field with the SS Kashmir Willow Leather Ball Cricket Bat. Crafted from high-quality Kashmir willow, this bat offers excellent durability and performance. The traditional design ensures a balanced pick-up and powerful strokes, making it ideal for both beginners ',
           'created_at':"",
           'profile':{
                'user_id' : "",
                'name' : "",
                'image' : ""
           },
           'is_ad' : True,
           'product_id':5}
        return jsonify(res), 200

    

    # Tokenize source text and target texts
    source_tokens = tokenizer(source_text, return_tensors="pt")
    target_tokens = tokenizer(target_texts, return_tensors="pt", padding=True, truncation=True, max_length=128)

    # Generate BERT embeddings for source and target texts
    with torch.no_grad():
        source_outputs = model(**source_tokens)
        target_outputs = model(**target_tokens)

    # Extract embeddings (using [CLS] token)
    source_embedding = source_outputs.last_hidden_state[:, 0, :]
    target_embeddings = target_outputs.last_hidden_state[:, 0, :]

    # Compute cosine similarity between source embedding and each target embedding
    cos_similarities = F.cosine_similarity(source_embedding, target_embeddings, dim=1)

    # Find the index of the target text with the highest cosine similarity
    best_index = cos_similarities.argmax().item()

    # Print results
    # print(f"Source Text: {source_text}")
    # print("Target Texts:")
    # for i, target_text in enumerate(target_texts):
    #     print(f"{i}: {target_text}")
    # print(f"Index of best matching text: {best_index}")
    # print(f"Cosine Similarity: {cos_similarities[best_index].item()}")

    cypher_query = """MATCH (a:Ad {product_id: $userId}) 
    RETURN a.ad_id as ad_id, a.product_id as product_id, a.video_url as video_url, a.text as text"""
    result = run_cypher_query(cypher_query,p_ids[best_index])[0]

    res = {'id' : result['ad_id'],
           'user_id': '',
           'video_url':result['video_url'],
           'text':result['text'],
           'created_at':"",
           'profile':{
                'user_id' : "",
                'name' : "",
                'image' : ""
           },
           'is_ad' : True,
           'product_id':p_ids[best_index]}
    return jsonify(res), 200
if __name__ == '__main__':
    app.run(debug=True)

