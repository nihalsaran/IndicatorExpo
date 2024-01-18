// MachineLearningModel.js

import * as tf from '@tensorflow/tfjs';

// Define and compile a simple sequential model
const createModel = () => {
  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [/* input shape */] }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 2, activation: 'softmax' })); // Two classes: 'left' and 'right'

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
};

// Train the model with labeled data
const trainModel = (data, labels) => {
  const model = createModel();

  const xs = tf.tensor2d(data); // Input data (features)
  const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), 2); // Output labels (one-hot encoded)

  // Train the model
  model.fit(xs, ys, { epochs: 10 }).then((info) => {
    console.log('Model training complete:', info);
  });

  // Dispose of tensors to free up memory
  tf.dispose([xs, ys]);

  return model;
};

// Make predictions using the trained model
const makePrediction = (model, data) => {
  const input = tf.tensor2d([data]); // Input data (features)
  const prediction = model.predict(input);

  // Convert prediction to class label
  const predictedClass = tf.argMax(prediction, 1).dataSync()[0];

  // Dispose of tensors to free up memory
  tf.dispose([input, prediction]);

  // Map class label to 'left' or 'right'
  return predictedClass === 0 ? 'left' : 'right';
};

export { createModel, trainModel, makePrediction };
