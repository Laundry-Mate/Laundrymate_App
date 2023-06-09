import { json } from '@sveltejs/kit';
import vision from '@google-cloud/vision';


export async function POST({ request }) {
  const {base64} = await request.json();
  // console.log("base64");

  const imageBuffer = Buffer.from(base64, 'base64');

  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./src/lib/key/capstoneocr.json",
  });

  // Performs label detection on the image file
  const [result] = await client.textDetection({
    "image": {
      "content": imageBuffer,
    },
  });
  const detections = result.textAnnotations;
  // console.log('Labels:');
  // detections.forEach(text => console.log(text.description));
  // console.log(typeof(detections))
  // console.log(detections[0].description);
  // console.log(typeof(detections[0].description));

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        // messages: [{ role: "user", content: `${textRecogResult} /  In this label of clothes, What are every materials used in clothes? Please answer only materials in english and divide by comma.`}],
        messages: [{ role: "user", content: `${detections[0].description} /  In this label of clothes, What is the most closest materials used in clothes? (Please make sure '면' is cotton.) ["Acrylic", "Cotton", "Denim", "Gimo", "Leather", "Linen", "Nylon", "Poly", "Rayon", "Wool"] Please choose the just one closest answer from these options as one word. If there is no closest, please return "Undefined". `}],
      }),
    })

  // console.log('onSend');
  const GPTresult = await response.json();
  // console.log(GPTresult);
  // console.log(GPTresult.choices);
  // console.log(JSON.stringify(GPTresult, null, 2));
  // console.log(JSON.stringify(GPTresult, null, 2).choices);
  // console.log(GPTresult.choices[0].message.content);
  // console.log(typeof(GPTresult.choices[0].message.content));

  return json({detections: GPTresult.choices[0].message.content})

}