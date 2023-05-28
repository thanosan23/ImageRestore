# ImageRestoration
The AI may take up to 20 seconds to return a response.

Demoing:

API calls are limited to one per person. Thank you :)
## Inspiration

As the Team of **Restore AI**, we are driven by a shared mission to bring new life to cherished memories and restore the beauty of old photographs. Founded by Rohith, Thanosan, and Roshan, our inspiration stems from a profound realization: the power of a single image to encapsulate a lifetime of emotions, experiences, and stories.

We believe that every photograph has a tale to tell, and it is our duty to ensure that these narratives are not lost to time. Our journey began when we encountered old photos, once filled with clarity and vibrancy, now faded and blurry, their true essence obscured. This sight ignited a spark within us to harness the power of AI and web services to create something truly extraordinary.

Our mission is to integrate advanced AI technologies with a seamless web service, providing a platform for individuals to "denoise" and restore their precious images. We understand the sentimental value and the deep emotional connection people have with their photographs. Through our innovative approach, we aspire to go beyond mere denoising, to breathe new life into these treasured moments, and uncover the hidden stories within.

## What it does
Restore AI is an innovative web service that utilizes the power of artificial intelligence to enhance and restore the quality of old or damaged photographs. Our advanced algorithms and machine learning models are specifically designed to address common issues such as blurriness, noise, fading, and other forms of image degradation.

When you upload an image to Restore AI, our system analyzes it and applies a series of sophisticated AI-based techniques to denoise and restore the image's original clarity, sharpness, and color. By leveraging the power of deep learning and image processing algorithms, we can intelligently identify and correct imperfections, revealing the hidden details and restoring the image to its former glory.

Whether it's an old family photograph, a cherished memory, or an important historical document, Restore AI aims to preserve and enhance these images, allowing you to relive those moments with greater clarity and visual appeal. Our web service provides a user-friendly interface, making it easy for anyone, regardless of their technical expertise, to upload and restore their images effortlessly.

## How we built it

**Problem Identification:** The journey began with us (Rohith, Thanosan, and Roshan) recognizing the need to restore old and degraded photographs. We identified blurriness, noise, and fading as common issues to address.

**Algorithm Development:** After some research, we learned that GFPGAN solves our problems. We used the GFPGAN model, a pre-trained model, to restore images.

**Web Service Development:** We also worked on creating an intuitive and user-friendly web interface for the Restore AI service. The integration of the AI models with the web service allowed users to easily upload and restore their images. For this, we used Next.js, MongoDB and Stripe.

**Emailing:** Like any good service, when a user purchases a subscription or a user cancels a subscription, we automate the sending of emails to users using Email.js.

## Challenges we ran into

**Implementing the Stripe API and Database Integration:** Integrating payment processing functionality through the Stripe API and ensuring its seamless interaction with our database presented some initial challenges. We had to carefully study the API documentation, understand its functionalities, and design a robust integration strategy. Debugging and troubleshooting were essential in identifying and resolving issues that arose during the implementation process. Through perseverance, collaboration, and iterative testing, we were able to successfully integrate the Stripe API and ensure smooth transaction processing and database synchronization.

**Finding a Suitable AI Image Model:** Building and selecting an AI image model that could effectively restore and denoise images was a significant challenge. We encountered difficulties in finding a model that met our requirements in terms of accuracy, performance, and computational efficiency. We conducted extensive research, experimented with multiple pre-trained models, and fine-tuned them to suit our specific restoration objectives. This process involved training, evaluation, and comparison of various models to identify the most suitable one for our needs. It required a combination of domain expertise, thorough experimentation, and continuous optimization to find a model that delivered the desired restoration results.

**Overcoming Smaller Technical Issues:** As with any software development project, we faced smaller technical issues along the way. These could include debugging errors, optimizing code for performance, resolving compatibility issues between different software components, and ensuring the smooth interaction of various modules. We employed a systematic approach, leveraging debugging tools, collaborating effectively, and engaging in continuous testing and iteration to overcome these challenges.


## Accomplishments that we're proud of

**Successful Implementation of Login Page:** One of our notable accomplishments is the creation and implementation of a functional and aesthetically pleasing login page. It was our first time using Auth0, but Auth0 facilitated the process of creating a robust authentication system.

**Integration of Payment Processing with Stripe:** Another achievement we are proud of is the successful integration of the Stripe API for seamless payment processing. Enabling secure and convenient transactions was essential for providing a smooth user experience. 

**Automated Emailing:**It was our first time using a library (namely, Email.js) to automate emailing. We learned a lot about how emailing is automated and effectively templating emails.

## What we learned

Throughout the journey of developing Restore AI, our team members, Roshan, Thanosan, and Rohith, acquired valuable knowledge and skills. Here's a summary of what each team member learned:

**Roshan:**
Roshan delved into learning Next.js, a popular framework for building server-side rendered React applications. By mastering Next.js, Roshan gained a deep understanding of its capabilities. This knowledge enabled Roshan to contribute to the frontend development of Restore AI, ensuring optimal performance and a smooth user experience.

**Thanosan:**
Thanosan focused on learning the implementation of MongoDB, a NoSQL database widely used in web applications. By gaining expertise in MongoDB, Thanosan gained insights into its document-oriented structure and how to effectively store, retrieve, and manipulate data. This knowledge proved invaluable in designing and optimizing the database architecture for Restore AI, ensuring efficient and scalable data management. Thanosan also learned how to use the Stripe API and used the Stripe API and MongoDB database to create the subscription system for the website.

**Rohith:**
Rohith immersed himself in understanding the backend processes of Stripe, a popular payment processing platform. Through this endeavor, Rohith learned about handling payment transactions, integrating Stripe's APIs, and ensuring secure and reliable payment processing for Restore AI. This expertise empowered Rohith to implement and manage the payment functionality seamlessly within the web service.

## What's next for Restoration AI: Image Restore

The future of Restoration AI: Image Restore holds exciting possibilities. Here are some of our plans for what's next:

**Service Expansion:** We aim to expand the range of image restoration services offered by Restoration AI. In addition to denoising, we plan to introduce features that address other common image issues, such as color correction, image enhancement, and object removal. By diversifying our offerings, we can cater to a broader customer base and meet a variety of image restoration needs.

**Training Custom Models**: We plan on training our own models using PyTorch in order to further optimize the process of image restoration.

**Mobile Application Development:** In response to the growing demand for mobile accessibility, we have plans to develop a mobile application for Restoration AI using Flutter/Android Studio. This allows users to conveniently upload and restore images directly from their smartphones, making it even more accessible and user-friendly.