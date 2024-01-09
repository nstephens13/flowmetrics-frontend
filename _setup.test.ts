import { createCanvas } from 'canvas';

// Mock HTMLCanvasElement
(global as any).HTMLCanvasElement.prototype.getContext = function createCanvasFunction() {
  return createCanvas(1, 1).getContext('2d');
};
