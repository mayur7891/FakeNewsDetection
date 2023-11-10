


import React, { useState, useEffect } from 'react';
import dangerSound from './danger.mp3';
import safeSound from './safe.mp3';
function Product() {
  const [input, setInput] = useState('');
  const [predictedCategory, setPredictedCategory] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [audioSource, setAudioSource] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the Flask server
    const response = await fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    // Parse the response JSON
    const data = await response.json();

    // Update the predicted category state
    setPredictedCategory(data.realnews);

    // Update the background color and play sound based on the predicted category
    if (data.realnews === 'True') {
      setBackgroundColor('lightgreen');
      const audio = new Audio(safeSound);
      audio.play();
   
    } else {
      setBackgroundColor('lightcoral');
      const audio = new Audio(dangerSound);
      audio.play();
    }
    if (data.realnews === 'True') {
    
    } else {
    
   
    }

    // Reset the input field
    setInput('');
  };

  useEffect(() => {
    // Reset the background color and audio source after 1 second
    const timer = setTimeout(() => {
      setBackgroundColor('');
      setAudioSource('');
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on unmount or when the effect is re-triggered
  }, [backgroundColor, audioSource]);

  return (
    <div
      className="container-xxl py-5 mt-5"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">Test the News</h5>
          <h1 className="mb-5">Reality Check</h1>
        </div>
        <div className="row g-4">
          <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
            <p className="fw-bold text-center" style={{ fontSize: "24px" }}>"Fake news is like a virus, it spreads quickly and can be harmful. But with a critical mind and a discerning eye, we can inoculate ourselves against its effects."</p>
          </div>
          <div className="col-md-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "150px" }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      ></textarea>
                      <label htmlFor="message">Your News</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">Predict</button>
                    {predictedCategory && (
                      <div>
                        Prediction: {predictedCategory}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {audioSource && (
        <audio src={audioSource} autoPlay>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default Product;
