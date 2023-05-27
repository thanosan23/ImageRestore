export default async function handler(req, res) {
  const url = req.body.url;

  const token = process.env.REPLICATE_API_KEY;

  let response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({
      version: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
      input: { img : url }
    }),
  });

  let jsonResponse = await response.json();
  console.log(jsonResponse);
  let restoredImage = jsonResponse.urls.get;

  let image = null;

  while(image == null) {
    let output = await fetch(restoredImage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let finalResponse = await output.json();
    console.log(finalResponse.status)
    if (finalResponse.status == "succeeded") {
      image =  finalResponse.output;
      console.log(finalResponse.output)
    } else if (finalResponse.status == "failed") {
      break;
    } else {

      // image loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  res.status(200).json({ url : image });
}