// from node_modules

// from my code
import { Transport } from '../src/models/transport.model.js';
import { AudioContext } from '../mockClasses/AudioContext.js';

let context;
let transport;

jest.useFakeTimers();

beforeEach(() => {
    // transport.stop();
    context = new AudioContext();
    transport = new Transport(context);
});

afterEach(() => {
    transport.stop();
});

test('transport class has the mock audio context class', () => {
    expect(transport.Context).toBeDefined();
});

test('transport.play sets isPlaying to true', () => {
    transport.play();
    expect(transport.isPlaying === true);
});

test('transport.play moves playback position', () => {
    transport.play();
    jest.advanceTimersByTime(1000);
    
    expect(transport.StartPosition).toBe(0);
    expect(transport.Context.currentTime).toBeGreaterThan(0);
    expect(transport.PlaybackPosition).toBeGreaterThan(0);
    expect(transport.StartPosition).toBeLessThan(transport.PlaybackPosition);
});

test('transport.stop stops sets isPlaying to false', () => {
    transport.play();
    jest.advanceTimersByTime(1000);
    transport.stop();
    
    expect(transport.isPlaying).toBe(false);
});

// jest.advanceTimersByTime(1000);