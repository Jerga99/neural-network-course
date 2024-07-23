## Introduction to Perceptron

The perceptron was developed by Frank Rosenblatt in 1958 as part of his research at the Cornell Aeronautical Laboratory.

It was designed as a computational model inspired by biological neurons, aiming to simulate the way the human brain processes information.

## Impact on AI and Machine Learning:

The perceptron marked a significant milestone in the field of artificial intelligence and machine learning, demonstrating that machines could be trained to recognize patterns.

Its development generated initial excitement in AI research, although its limitations later contributed to the "AI winter," a period of reduced funding and interest in AI.

Real-World Applications:

Early applications of the perceptron included simple pattern recognition tasks, such as identifying basic shapes or characters, which showed the potential for automated learning and classification.

Character Recognition:

    Handwritten Digits: Identifying handwritten numbers, such as recognizing digits from the MNIST dataset.
    Printed Text: Classifying individual characters or letters in printed text, such as recognizing alphanumeric characters from scanned documents.

Shape Recognition:

    Basic Geometric Shapes: Differentiating between simple shapes like circles, squares, triangles, etc.
    Patterned Arrangements: Recognizing specific patterns or arrangements of shapes.


# Overview of the Perceptron Model:

A perceptron is a type of artificial neuron used for binary classification. It
  1. processes inputs,
  2. applies weights,
  3. sums the results,
  4. and uses an activation function to produce an output.

Binary Classification is a type of classification task where the goal is to categorize data points into one of two distinct classes. In other words, the output is binary, meaning it can take on one of two possible values, often represented as 0 and 1, True and False, or any two distinct classes.

Consider an email spam filter as an example of a binary classification task. The goal is to classify emails into two categories: "Spam" and "Not Spam".

Biological Neuron:

1. Dendrites (dendrajts):
    Function: Receive signals from other neurons.
2. Cell Body (Soma):
    Function: Processes incoming signals and determines whether the neuron should fire an action potential.
3. Axon:
    Function: Transmits the output signal to other neurons.
4. Synapses:
    Function: Junctions between neurons where signals are transmitted



Videos to watch: https://www.youtube.com/watch?v=6qS83wD29PY

Videos to watch: https://www.youtube.com/watch?v=hGDvvUNU-cw

# Artificial Neuron (Perceptron)

Inputs:
  Function: Receive input data.
  Similarity: Like dendrites receiving signals from other neurons.

Weights:
  Function: Scale the input data; represent the strength of the connections.
  Similarity: Similar to synapses where the strength of the connection affects the signal transmission.

Summation Function:
  Function: Compute the weighted sum of inputs.
  Similarity: Analogous to the cell body that processes incoming signals to determine the overall signal strength.

Bias:
  Function: Adds an extra parameter to the summation to shift the activation function.
  Similarity: There is no direct equivalent in biological neurons, but it can be seen as a threshold adjustment similar to the baseline activity level in biological neurons.

Activation Function:
  Function: Produces the output based on the weighted sum; determines whether the neuron fires.
  Similarity: Comparable to the axon hillock in biological neurons where the decision to fire an action potential is made.

## Summary

Biological Neuron:

    Dendrites receive input signals.
    Cell Body (Soma) processes the signals and decides whether to fire.
    Axon transmits the signal to other neurons.
    Synapses determine the strength of signal transmission.

Artificial Neuron (Perceptron):

    Inputs receive data.
    Weights scale the inputs.
    Summation Function calculates the weighted sum of inputs.
    Bias adjusts the threshold.
    Activation Function determines the final output.
